import React from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
function App() {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 8b6605324d5c4a8ed28d4cd87fb264f11abbec5d'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(err => console.log(err))
  }, [] )

  const movieClicked = movie => {
    //console.log(movie.title)
    setSelectedMovie(movie);
  }

  const loadMovie= movie => {
    setSelectedMovie(movie);
  }

  return (
    <div className="App">
      <header className="App-header">
        Movie Rater
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={movieClicked} />
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />  
        </div>
    </div>
  );
}

export default App;
