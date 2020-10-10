import React from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [editedMovie, setEditedMovie] = React.useState(null);


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

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const udpatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }


  const newMovie = () => {
    setEditedMovie({title:'', description:''});
    setSelectedMovie(null);

  }


  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies)

  }

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }


  return (
    <div className="App">
      <header className="App-header">
        Movie Rater
      </header>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked} 

          />
          <button onClick={newMovie} >New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />  

        { editedMovie ? 
          <MovieForm movie={editedMovie} udpatedMovie={udpatedMovie} movieCreate={movieCreated}  removeClicked={removeClicked} />
        :  null}

      </div>

    </div>
  );
}

export default App;
