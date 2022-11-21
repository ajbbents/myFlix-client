import React from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text as='div'>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
    // <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
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
  onMovieClick: PropTypes.func.isRequired
};
