import React, {useEffect, useState} from 'react';
import {useAppSelector} from "hooks/useAppSelector";
import {selectMessages} from "store/selectors";
import {SingleMessage} from "components/message/SingleMessage";
import {Accordion} from 'react-bootstrap';

export const Messages = () => {
  const stateMessages = useAppSelector(selectMessages)

  const [messages, setMessages] = useState(stateMessages)


  useEffect(() => {
    setMessages(stateMessages);
  }, [stateMessages])

  console.log(messages)
  return (
    <div className={'p-3 shadow-sm rounded messages-box'}>
      <Accordion defaultActiveKey="0" flush>
        {messages.map(message => (
          <SingleMessage
            key={message._id}
            message={message}
          />
        ))}
      </Accordion>
    </div>
  );
};
