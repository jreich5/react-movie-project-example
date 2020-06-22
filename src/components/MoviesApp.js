import React, { useState, useEffect } from 'react'
import MovieAPI from '../movie-api'
import MoviesList from './MoviesList'
import AddMovieModal from './AddMovieModal'
import DeleteMovieModal from './DeleteMovieModal'
import EditMovieModal from './EditMovieModal'
import 'bootstrap'

function MoviesApp() {

  // state

  const [ movies, setMovies ] = useState(null)
  const [ deleteMovieId, setDeleteMovieId ] = useState(0)
  const [ newMovie, setNewMovie ] = useState()
  const [ confirmDelete, setConfirmDelete ] = useState(false)
  const [ movieToUpdate, setMovieToUpdate ] = useState(null)

  // effects

  useEffect(() => {
    MovieAPI.getMovies().then(movies => {
      setMovies(movies)
    })
  }, [])

  useEffect(() => {
    confirmDelete && MovieAPI.deleteMovie(deleteMovieId).then(movies => {
      setMovies(movies)
      setConfirmDelete(false)
    })
  }, [confirmDelete, deleteMovieId])

  useEffect(() => {
    newMovie && MovieAPI.addMovie(newMovie).then(movies => {
      setMovies(movies)
    })
  }, [newMovie])

  useEffect(() => {
    document.querySelector("#edit-movie-modal-btn").click()
  }, [movieToUpdate])

  // inner functions

  function confirmDeleteMovie() {
    setConfirmDelete(true)
  }

  function deleteMovie(id) {
    setDeleteMovieId(id)
  }

  function addMovie(title, rating) {
    title && rating && setNewMovie({title, rating})
  }

  function editMovie(editMovie) {
    MovieAPI.updateMovie(editMovie).then(movies => {
      setMovies(movies)
    })
  }

  function setEditMovie(movie) {
    setMovieToUpdate(movie)
  }

  // JSX render

  return (
    <div id="wrapper">

      <AddMovieModal addMovie={addMovie} />

      <DeleteMovieModal confirmDeleteMovie={confirmDeleteMovie} />
      
      {
        movieToUpdate // must be movie to update set to render edit movie modal
        &&
        <EditMovieModal movieToUpdate={movieToUpdate} editMovie={editMovie} />
      }

      <main className="container-fluid mt-3">
      
        <header className="jumbotron bg-dark text-light">
          <h1 className="text-center m-0">Movies</h1>
        </header>
      
        { movies // must be movies to render list of movies
          && 
          <MoviesList movies={movies} deleteMovie={deleteMovie} setEditMovie={setEditMovie} />
        }
      
        <button className="btn btn-block btn-light add-movie-btn mt-3" data-toggle="modal" data-target="#add-movie-modal"><i className="fas fa-plus"></i></button>
      
        {/* used to trigger the opening of the edit movie modal */}
        <button className="d-none" id="edit-movie-modal-btn" data-toggle="modal" data-target="#edit-movie-modal">Open Edit Movie Modal</button>

      </main>
      
    </div>
  )
}

export default MoviesApp