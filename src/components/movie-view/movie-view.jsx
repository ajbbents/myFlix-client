import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, Button, Col } from "react-bootstrap";

import { Link, Route } from "react-router-dom";
import './movie-view.scss';

export class MovieView extends React.Component {

  // keypressCallback(event) {
  //   console.log(event.key);
  // }

  // componentDidMount() {
  //   document.addEventListener('keypress', this.keypressCallback);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keypress', this.keypressCallback);
  // }

  render() {
    const { movie, onClick, onBackClick, handleFavorite } = this.props;

    return (

      <Card style={{ width: '22rem' }}>
        <Card.Body as='div'>

          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
            {/* <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} /> */}
            <Button
              // className="favorite-button mt-2"
              variant="primary"
              onClick={() => { handleFavorite(movie._id, "add"); }} >Add to favorite movies
            </Button>
            <Button variant="secondary" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>

        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  // handleFavorite: PropTypes.func.isRequired,
};