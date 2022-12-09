import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './main-view.scss';

import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
// import { ProfileView } from "../profile-view/profile-view";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
      register: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://pickles2001.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register, authData } = this.state;

    // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />)

    return (
      <Router>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
          }}
        />

        <Row className="main-view justify-content-md-center">

          <Route exact path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView movies={movies} onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MovieView movies={movies} />
              // return movies.map(m => (
              //   <Col md={3} key={m._id}>
              //     <MovieCard movie={m} />
              //   </Col>
              // ));
            }}
          />

          <Route path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          /> */}

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={3} key={m._id}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={3} key={m._id}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                    onBackClick={() => history.goBack()} />
                </Col>
              );
            }}
          />

          <Route path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

export default MainView;


{/* <div className="main-view">
            <Navbar bg="light" expand="lg">
              <Container fluid>
                <Navbar.Brand href="#home">BingeableFilms</Navbar.Brand>
                <Nav className="navLinks">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#movies">Movies</Nav.Link>
                  <Nav.Link href="#users">Users</Nav.Link>
                  <button onClick={() => { this.onLoggedOut() }}>Logout</button>
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
          </div> */}