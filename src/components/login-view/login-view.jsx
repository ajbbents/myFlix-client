import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { RegistrationView } from "../registration-view/registration-view";
import { Card, Form, Button } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    // send a request to the server for authentication
    axios.post('https://pickles2001.herokuapp.com/login', {
      UserName: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    // then call props.onLoggedIn(username)
    // props.onLoggedIn(username);
  };

  return (
    <Container className="login-view">
      <Card className="text-center" style={{ width: '25rem', padding: '2rem' }}>
        <Card.Body>
          <Card.Title>Login</Card.Title>
          <Card.Text>

            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="secondary" type="button" onClick={RegistrationView}>
                Not registered yet?
              </Button>
            </Form>

          </Card.Text>
        </Card.Body>

      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
