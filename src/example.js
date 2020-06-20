import React, {useState, useEffect} from 'react';
import '../styles/App.css';
import MovieAPI from '../movie-api';

function App() {
 
  const [ movies, setMovies ] = useState([]);
  const [ deet, setDeet ] = useState(null);
  const [ id, setId ] = useState(0);
  const [ editMovie, setEditMovie ] = useState(null);
  const [ deleteId, setDeleteId ] = useState(0);

  useEffect(() => {
    deleteId && MovieAPI.deleteMovie(deleteId).then(setMovies);
  }, [deleteId]);

  useEffect(() => {
    id && MovieAPI.getMovie(id).then(setDeet);
  }, [id]);
  
  useEffect(() => {
    MovieAPI.getMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  useEffect(() => {
    editMovie && MovieAPI.updateMovie(editMovie).then(movies => {
      setMovies(movies);
    })
  }, [editMovie]);

  function changeMovie() {
    if (editMovie === null) {
      return {
        id: 1,
        title: movies[0].title + 'e',
        rating: movies[0].rating
      }
    } else {
      return {
        id: 1,
        title: editMovie.title + 'e',
        rating: editMovie.rating
      } 
    }
  }

  return (
    <div>
      <h1 className="">Test</h1>
      {console.log(movies)}
      <ul>
        {movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
      <button className="btn btn-primary" onClick={() => setDeleteId(1)}>Display Movie 1 Details</button>
      {
        deet 
        && 
        <article id="movieDeets">
          <h3>{deet.title}</h3>
          <h3>{deet.rating}</h3>
        </article>
      }
    </div>
  );
}

export default App;
