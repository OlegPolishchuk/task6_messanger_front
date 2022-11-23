import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {Navbar} from "components";
import socket from "socket";
import {useAppSelector} from "hooks/useAppSelector";
import {selectUsername} from "store/selectors";
import {useAppDispatch} from "hooks/useAppDispatch";
import {
  setExistedUsers,
  setMessages,
  setSingleMessage,
  setSocketId
} from "store/reducer/appReducer";


function App() {
  const dispatch = useAppDispatch();

  const username = useAppSelector(selectUsername);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      socket.emit('connected', {username})
    })

    socket.on('disconnect', () => {

    })

    socket.on('load-start-data', (startData) => {
      console.log(startData)
      dispatch(setMessages(startData.startMessages))
      dispatch(setExistedUsers(startData.usersList))
      dispatch(setSocketId(startData.socketId))
    })

    socket.on('refresh-messages', (messages) => {
      dispatch(setSingleMessage(messages))
    })

    socket.on('new-user', (usersList) => {
      dispatch(setExistedUsers(usersList));
    })

    socket.on('refresh-users-list', (usersList) => {
      dispatch(setExistedUsers(usersList))
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    }
  }, [])


  return (
    <div className="App container py-5">

      <h1 className={'fs-4 text-center text-secondary mb-5'}>
        Welcome {username}
      </h1>

      <div className={'d-flex'}>
        <Navbar />

        <div className={'col-10'}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
