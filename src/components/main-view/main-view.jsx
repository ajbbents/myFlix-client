import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Clueless', Description: 'A high schooler befriends a new student and gives her a makeover.', ImagePath: '...' },
        { _id: 2, Title: 'Drumline', Description: 'High school drumlines compete.', ImagePath: '...' },
        { _id: 3, Title: 'Gladiator', Description: 'Gladiators compete and get makeovers.', ImagePath: '...' },
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">This list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}
