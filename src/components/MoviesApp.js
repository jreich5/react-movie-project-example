import React, { useState, useEffect } from 'react'
import MovieAPI from '../movie-api'
import MoviesList from './MoviesList'
import AddMovieModal from './AddMovieModal'
import DeleteMovieModal from './DeleteMovieModal'
import EditMovieModal from './EditMovieModal';
import 'bootstrap'

function MoviesApp() {
  const [ displayMovies, setDisplaysMovies ] = useState(null)
  const [ movies, setMovies ] = useState(null)
  const [ deleteMovieId, setDeleteMovieId ] = useState(0)
  const [ newMovie, setNewMovie ] = useState()
  const [ confirmDelete, setConfirmDelete ] = useState(false)
  const [ movieToUpdate, setMovieToUpdate ] = useState(null)

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

  useEffect(() => {

    document.querySelector("#edit-movie-modal-btn").click()

  }, [movieToUpdate])

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

  function editMovie(editMovie) {
    console.log(editMovie)
    MovieAPI.updateMovie(editMovie).then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
    })
  }

  function setEditMovie(movie) {
    setMovieToUpdate(movie)
  }

  return (
    <div id="wrapper">
      <AddMovieModal addMovie={addMovie} />
      <DeleteMovieModal confirmDeleteMovie={confirmDeleteMovie} />
      {
        movieToUpdate
        &&
        <EditMovieModal movieToUpdate={movieToUpdate} editMovie={editMovie} />
      }

      <main className="container-fluid mt-3">
        <header className="jumbotron bg-dark text-light">
          <h1 className="text-center m-0">Movies</h1>
        </header>
        {displayMovies && <MoviesList movies={displayMovies} deleteMovie={deleteMovie} setEditMovie={setEditMovie} />}
        <button className="btn btn-block btn-light add-movie-btn mt-3" data-toggle="modal" data-target="#add-movie-modal"><i className="fas fa-plus"></i></button>
        {/* used to trigger the opening of the edit movie modal */}
        <button className="d-none" id="edit-movie-modal-btn" data-toggle="modal" data-target="#edit-movie-modal">Open Edit Movie Modal</button>
      </main>
    </div>
  )
}

export default MoviesApp