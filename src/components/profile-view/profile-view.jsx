import React from "react";
import PropTypes from 'prop-types';
import { Card, Button, Col, Row, Container, Form, Figure } from "react-bootstrap";

import { Link, Route } from "react-router-dom";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      UserName: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const UserName = localStorage.getItem("user");
    axios
      .get(`https://pickles2001.herokuapp.com/users/${UserName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          UserName: response.data.UserName,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRemoveFavorite = (movie) => {
    const UserName = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie)
    axios
      .delete(
        `https://pickles2001.herokuapp.com/users/${UserName}/movies/${movie}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favorites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  editUser = (e) => {
    e.preventDefault();
    const UserName = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(`https://pickles2001.herokuapp.com/users/${UserName}`,
        {
          UserName: this.state.UserName,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response)
        this.setState({
          UserName: response.data.UserName,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.UserName);
        const data = response.data;
        console.log(data);
        console.log(this.state.UserName);
        alert("Profile has been updated.");
        window.open(`/users/&{UserName}`, "_self");
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  onDeleteUser() {
    const UserName = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://pickles2001.herokuapp.com/users/${UserName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      UserName: value,
    });
    this.UserName = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }

  test() {
    alert("works")
  }

  render() {
    const { movies, user } = this.props;
    const { FavoriteMovies, UserName, Password, Email, Birthday } = this.state;

    const myFavoriteMovies = FavoriteMovies.map((movieId) =>
      movie.find((movie) => movie._id === movieId)
    );
    // const myFavoriteMovies = [];
    // for (let index = 0; index < movies.length; index++) {
    //   const movie = movies[index];
    //   if (FavoriteMovies.includes(movie._id)) {
    //     myFavoriteMovies.push(movie);
    //   }
    // }

    return (
      <Container>
        <Row>
          <Col>
            <Card className="user-profile">
              <Card.Header>User Profile</Card.Header>
              <Card.Body>
                <>
                  <p>Name: {UserName}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="update-inputs">
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.UserName,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        placeholder="New Username"
                        onChange={(e) => this.setUserName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="New Email"
                        onChange={(e) => this.setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="Birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={(e) => this.editUser(e)}
                      >Update User</Button>
                      <Button
                        className="delete-button"
                        variant="danger"
                        onClick={() => this.onDeleteUser()}>Delete User
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="favmov-inputs">
          <Card.Body>
            <Row>
              <Col xs={12}>
                <h2>Favorite Movies</h2>
              </Col>
            </Row>
            <Row>
              {myFavoriteMovies.map((movie) => (
                <Col key={movie._id} className="fav-movie">
                  <Figure>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image src={movie.ImagePath} alt={movie.Title} />
                      <Figure.Caption>{movie.Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button
                    className="remove"
                    variant="secondary"
                    onClick={() => { this.onRemoveFavorite(movie._id) }}
                  >Remove from the list.</Button>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}