import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Form, Card, Navbar, Nav, Button } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

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
    props.onRegistration(username);
  };

  return (

    <Container fluid className="registration-view">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">BingeableFilms</Navbar.Brand>
          <Nav className="navLinks">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#users">Users</Nav.Link>
            <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Card style={{ width: "62rem", padding: '5rem' }}>
        <Card.Body>
          <Card.Title>Register</Card.Title>
          <Card.Text>

            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" required placeholder="Create a username" onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" required placeholder="Password must be 8 characters" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address:</Form.Label>
                <Form.Control type="email" required placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text.muted">We'll never share your email with anyone. Pinky promise.</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="Birthday" required placeholder="MM/DD/YYYY" onChange={e => setBirthday(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
            </Form>


          </Card.Text>
        </Card.Body>

      </Card>

    </Container>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};