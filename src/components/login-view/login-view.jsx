import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { RegistrationView } from "../registration-view/registration-view";
import { Row, Card, Form, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user inputs
  const validate = () => {
    let isReq = true;

    setUsernameErr("");
    setPasswordErr("");

    if (!username) {
      setUsernameErr('You have to have a username.');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('You have to have a password.');
      isReq = false;
    } else if (password.length < 6) {
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
      axios.post('https://pickles2001.herokuapp.com/login', {
        UserName: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
          // console.log('its working');
          window.open("/", "_self");
        })
        .catch(e => {
          console.log('no such user')
        });
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    console.log("clicked register")
    props.toRegister(false);
  };

  return (
    <Container className="login-view">
      <Row className="justify-content-center m-2">

        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            {/*code here to display validation error*/}
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            {/*code here to display validation error*/}
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
  // toRegister: PropTypes.func.isRequired,
};
