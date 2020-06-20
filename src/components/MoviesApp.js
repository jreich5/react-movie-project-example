import React, { useState, useEffect } from 'react'
import MovieAPI from '../movie-api'
import MoviesList from './MoviesList'

function MoviesApp() {
  const [ displayMovies, setDisplaysMovies ] = useState(null)
  const [ movies, setMovies ] = useState(null)
  const [ deleteMovieId, setDeleteMovieId ] = useState(0)

  useEffect(() => {
    MovieAPI.getMovies().then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
    })
  }, [])

  useEffect(() => {
    MovieAPI.deleteMovie(deleteMovieId).then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
    })
  }, [deleteMovieId])

  function deleteMovie(id) {
    setDeleteMovieId(id)
  }

  return (
    <main className="container-fluid mt-3">
      <header className="jumbotron bg-dark text-light">
        <h1 className="text-center m-0">Movies</h1>
      </header>
      {displayMovies && <MoviesList movies={displayMovies} deleteMovie={deleteMovie} />}
      <button className="btn btn-block btn-light add-movie-btn mt-5"><i className="fas fa-plus"></i></button>
    </main>
  )
}

export default MoviesApp