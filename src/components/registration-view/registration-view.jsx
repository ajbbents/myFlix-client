import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Row, Col, Form, Card, Navbar, Nav, Button } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username is required.");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long.");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password is required.");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long.");
      isReq = false;
    }
    if (!email) {
      setEmailErr("Email is required.");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Email is invalid.");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /*send a request to the server for authentication
    then call props.onRegistration(username)*/
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://pickles2001.herokuapp.com/users", {
          UserName: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful! Please sign-in.");
          window.open("/", "_self");
        })
        .catch(err => {
          console.log(err.response.data);
          alert("unable to register you freaking fool");
        });
    }
  };

  return (

    <Container fluid className="registration-view">
      <Row className="justify-content-md-center mt-5">
        <Col md={5}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text" placeholder="Create a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password" placeholder="Password must be 6 characters"
                minLength="6" value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email" placeholder="Enter Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {emailErr && <p>{emailErr}</p>}
              <Form.Text className="text.muted">We'll never share your email with anyone. Pinky promise.</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="Birthday" placeholder="MM/DD/YYYY"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
};