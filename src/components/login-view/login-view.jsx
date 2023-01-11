import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Row, Form, Button, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  //declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;

    // setUsernameErr("");
    // setPasswordErr("");

    if (!UserName) {
      setUsernameErr('You have to have a username.');
      isReq = false;
    } else if (UserName.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!Password) {
      setPasswordErr('You have to have a password.');
      isReq = false;
    } else if (Password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // send a request to the server for authentication
      axios.post(`https://pickles2001.herokuapp.com/login`, {
        UserName: UserName,
        Password: Password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
          window.open("/", "_self");
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  return (
    <Container className="login-view">
      <Row className="justify-content-center m-2">

        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={UserName} onChange={e => setUserName(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={Password} onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
          <Button variant="secondary" type="button" href={"/register"}>
            Not registered yet?
          </Button>
        </Form>

      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};