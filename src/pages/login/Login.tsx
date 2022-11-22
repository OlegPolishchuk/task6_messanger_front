import React, {FormEvent, useEffect, useState} from 'react';
import {Button, Form, Spinner} from "react-bootstrap";
import {useAppDispatch} from "hooks/useAppDispatch";
import {loginUser} from "store/reducer/actions/actions";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "hooks/useAppSelector";
import {selectError, selectIsLoading} from "store/selectors";
import socket from "socket";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.stopPropagation();
    }
    else {
      socket.auth = {username}
      dispatch(loginUser(username));

      navigate('/')
    }
    setValidated(true);
  };

  useEffect(() => {
    if (error) setUsername('')
  }, [error])

  return (
    <div className={'d-flex justify-content-center align-items-center min-vh-100'}>

      <Form className={'col-12 col-md-6 col-lg-4'} noValidate validated={validated} onSubmit={handleSubmit}>

        <h3 className={'h-4 mb-5 text-center text-secondary'}>Enter to postman</h3>

        <Form.Group className="mb-5">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => setUsername(e.target.value.trim())}
          />

          <Form.Control.Feedback type="invalid">
            {error
              ? error
              : 'Please provide a valid username'
            }
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={'d-flex justify-content-center'}>
          <Button variant="outline-secondary btn-lg" type="submit">
            {isLoading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Enter
          </Button>
        </Form.Group>

      </Form>

    </div>
  );
};