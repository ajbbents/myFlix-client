import React from "react";
import axios from "axios";
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import './main-view.scss';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { NavBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      favoriteMovies: [],
      selectedMovie: null,
      UserName: null,
      registered: true,
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
      user: authData.user.UserName
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.UserName);

    this.getMovies(authData.token);
  }

  RegistrationView(registered) {
    this.setState({
      registered,
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // handleFavorite = (movieId, action) => {
  //   const { user, favoriteMovies, movies } = this.state;
  //   const accessToken = localStorage.getItem("token");
  //   const UserName = user;
  //   if (accessToken !== null && UserName !== null) {
  //     //add movieid to favorites
  //     if (action === "add") {
  //       this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
  //       axios
  //         .put(
  //           `https://pickles2001.herokuapp.com/users/${UserName}/movies/${movieId}`,
  //           {},
  //           {
  //             headers: { Authorization: `Bearer ${accessToken}` },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(`movie added to ${UserName}'s favorite movies.`);
  //           alert(`Movie added to ${UserName}'s favorite movies.`);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });

  //     } else if (action === "remove") {
  //       this.setState({
  //         favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
  //       });
  //       axios
  //         .delete(
  //           `https://pickles2001.herokuapp.com/users/${UserName}/favorites/${movieId}`,
  //           {
  //             headers: { Authorization: `Bearer ${accessToken}` },
  //           }
  //         )
  //         .then((res) => {
  //           console.log(`Movie removed from ${UserName}'s favorite movies.`);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
  // };

  render() {
    const { movies, selectedMovie, user, registered, authData, favoriteMovies, handleFavorite } = this.state;

    // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />)

    return (
      <Router>
        <NavBar
          user={user}
        />

        <Row className="main-view justify-content-md-center mt-3">

          <Route exact path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
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
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    goBack={history.goBack}
                    favoriteMovies={favoriteMovies || []}
                    handleFavorite={this.handleFavorite}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/user-update/:username`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col md={3}>
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

// export default MainView;