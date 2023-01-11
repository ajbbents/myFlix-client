import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Button, Card, Row } from 'react-bootstrap';

import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, handleFavorite } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Footer class="card-footer">
            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
              <Button variant="primary">Open</Button>
            </Link>
          </Card.Footer>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
    }).isRequired
  }).isRequired,
};
