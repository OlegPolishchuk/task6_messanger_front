import React from 'react';
import {Route, Routes } from 'react-router-dom';
import {Login} from "pages";
import App from "App";
import {useAppSelector} from "hooks/useAppSelector";
import {selectIsEntered} from "store/selectors";
import {Messages, SendMessageForm} from "components";

export const Router = () => {
  const isUserEntered = useAppSelector(selectIsEntered);

  return (
    <Routes>
      <Route path={'/'} element={isUserEntered ? <App /> : <Login />}>
        <Route path={'/'} element={<SendMessageForm />}/>
        <Route path={'/messages'} element={<Messages/>} />
      </Route>
      <Route path={'/login'} element={<Login />} />
      <Route path={'/*'} element={<div>Not found</div>} />
    </Routes>
  );
};