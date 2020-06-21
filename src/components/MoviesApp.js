import React, { useState, useEffect } from 'react'
import MovieAPI from '../movie-api'
import MoviesList from './MoviesList'
import AddMovieModal from './AddMovieModal'
import DeleteMovieModal from './DeleteMovieModal'
import 'bootstrap'

function MoviesApp() {
  const [ displayMovies, setDisplaysMovies ] = useState(null)
  const [ movies, setMovies ] = useState(null)
  const [ deleteMovieId, setDeleteMovieId ] = useState(0)
  const [ newMovie, setNewMovie ] = useState()
  const [ confirmDelete, setConfirmDelete ] = useState(false)

  useEffect(() => {
    MovieAPI.getMovies().then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
    })
  }, [])

  useEffect(() => {
    confirmDelete && MovieAPI.deleteMovie(deleteMovieId).then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
      setConfirmDelete(false)
    })
  }, [confirmDelete])

  useEffect(() => {
    newMovie && MovieAPI.addMovie(newMovie).then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
    })
  }, [newMovie])

  function confirmDeleteMovie() {
    setConfirmDelete(true)
  }

  function deleteMovie(id) {
    setDeleteMovieId(id)
  }

  function addMovie(title, rating) {
    console.log(title, rating)
    title && rating && setNewMovie({title, rating})
  }

  return (
    <div id="wrapper">
      
      <AddMovieModal addMovie={addMovie} />
      <DeleteMovieModal confirmDeleteMovie={confirmDeleteMovie} />

      <main className="container-fluid mt-3">
        <header className="jumbotron bg-dark text-light">
          <h1 className="text-center m-0">Movies</h1>
        </header>
        {displayMovies && <MoviesList movies={displayMovies} deleteMovie={deleteMovie} />}
        <button className="btn btn-block btn-light add-movie-btn mt-3" data-toggle="modal" data-target="#add-movie-modal"><i className="fas fa-plus"></i></button>
      </main>
    </div>
  )
}

export default MoviesApp