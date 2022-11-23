import React, {FC} from 'react';
import {Message} from "store/reducer/types/Message";
import {Accordion} from "react-bootstrap";

interface Props{
  message: Message;
}

export const SingleMessage:FC<Props> = ({message}) => {
  const {message: msg , from, subject, date, _id, isRead} = message;

  const textColor = isRead ? 'text-secondary' : 'text-dark';


  return (
    <div className={'p-3 mb-3 shadow rounded'}>

        <Accordion.Item eventKey={_id} className={'text-secondary'}>
          <Accordion.Header>
            <div className={'w-100 d-flex justify-content-between ' + textColor}>
              <div>
                <span className={'me-4'}>from: {from}</span>
                <span>Subject: {subject}</span>
              </div>
              <span className={'me-5'}>{date}</span>
            </div>
        </Accordion.Header>
          <Accordion.Body
            className={'text-secondary border-top border-secondary'}
          >
            {msg}
          </Accordion.Body>
        </Accordion.Item>

    </div>
  );
};
