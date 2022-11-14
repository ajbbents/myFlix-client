import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import './main-view.scss';

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://pickles2001.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />)

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
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

        <Row className="justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
              </Col>
            ))
          }
        </Row>
      </div>
    );
  }
}

export default MainView;
