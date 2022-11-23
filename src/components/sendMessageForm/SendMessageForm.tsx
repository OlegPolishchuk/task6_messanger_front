import React, {FormEvent, useRef, useState} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import socket from "socket";
import {useAppSelector} from "hooks/useAppSelector";
import {selectExistedUsers} from "store/selectors";
import {AutoCompleteInput} from "components/autoCompleteInput/autoCompleteInput";
import {ExistedUsers} from "store/reducer/types/InitialState";

export const SendMessageForm = () => {
  const [validated, setValidated] = useState(false);
  const [autocompleteInputValue, setAutocompleteInputValue] = useState({
    userId: '',
    username: '',
  });

  const existedUsers = useAppSelector(selectExistedUsers);

  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeAutocomplete = (value: ExistedUsers) => {
    setAutocompleteInputValue(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();

      setValidated(true);
    }
    else {
      const messageData = {
        recipient: autocompleteInputValue,
        subject: subjectRef.current?.value || '',
        message: messageRef.current?.value || '' ,
      }

      socket.emit('message', messageData);

      form.reset();
      setValidated(false);
      setAutocompleteInputValue({userId: '', username: ''})
    }
  };

  return (
    <Form
      className={'p-3 shadow-sm rounded'}
      noValidate validated={validated}
      onSubmit={handleSubmit}
      autoComplete={'off'}
    >

      <AutoCompleteInput
        items={existedUsers}
        value={autocompleteInputValue}
        onChange={handleChangeAutocomplete}
      />

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <InputGroup >
          <InputGroup.Text id="inputGroupPrepend">Subject</InputGroup.Text>
          <Form.Control
            type="text"
            aria-describedby="inputGroupPrepend"
            ref={subjectRef}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          className={'message_box'}
          as="textarea"
          rows={5}
          placeholder={'Message'}
          required
          ref={messageRef}
        />

        <Form.Control.Feedback type="invalid">
          Please write a message
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className={'d-flex justify-content-end'}>
        <Button type={'submit'} variant={'outline-secondary'}>Send</Button>
      </Form.Group>

    </Form>
  );
};
