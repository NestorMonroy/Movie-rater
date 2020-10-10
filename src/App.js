import React from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';

function App() {

  const [movies, setMovies] = React.useState([]);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [editedMovie, setEditedMovie] = React.useState(null);
  const [token, setToken, deleteToken] = useCookies(['movie-token']);
  const [data, loading, error] = useFetch();

  React.useEffect(()=>{
    setMovies(data);
  }, [data])

  React.useEffect( () => {
    if(!token['movie-token']) window.location.href = '/';
  }, [token])

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
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }
  
  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }
  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const logoutUser = () => {
    deleteToken(['movie-token']);
}

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error loading movies</h1>
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm}/>
          <span>Movie rater</span>
       </h1>
       <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
          <div>
            <MovieList
              movies={movies}
              movieClicked={loadMovie}
              editClicked={editClicked}
              removeClicked={removeClicked}
            />
            <button onClick={newMovie}>New movie</button>
          </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
          { editedMovie ? 
          <MovieForm movie={editedMovie} udpatedMovie={udpatedMovie} movieCreated={movieCreated}/> 
          : null}
          
        </div>
    </div>
  );
}

export default App;