import React, { useState, useEffect } from 'react'
import MovieAPI from '../movie-api'
import MoviesList from './MoviesList'
import 'bootstrap'

function MoviesApp() {
  const [ displayMovies, setDisplaysMovies ] = useState(null)
  const [ movies, setMovies ] = useState(null)
  const [ deleteMovieId, setDeleteMovieId ] = useState(0)
  const [ title, setTitle ] = useState('')
  const [ rating, setRating ] = useState('default')
  const [ newMovie, setNewMovie ] = useState()

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

  useEffect(() => {
    newMovie && MovieAPI.addMovie({title, rating}).then(movies => {
      setMovies(movies)
      setDisplaysMovies(movies)
      setTitle('')
      setRating('default')
    })
  }, [newMovie])

  function deleteMovie(id) {
    setDeleteMovieId(id)
  }

  function addMovie() {
    console.log(title, rating)
    title && rating && setNewMovie({title, rating})
  }

  return (
    <div id="wrapper">
      
      {/* ADD MOVIE MODAL */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Movie</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input className="form-control" type="text" id="title" placeholder="Enter movie title" value={title} onChange={e => {
                    console.log(e.target.value)
                    setTitle(e.target.value)
                  }} />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <select className="form-control" name="rating" type="text" id="rating" value={rating} placeholder="Enter movie rating" onChange={e => {
                    console.log(e.target.value)
                    setRating(e.target.value)
                  }}>
                    <option value="default"disabled>Select a Star Rating</option>
                    <option value="5">Five Stars</option>
                    <option value="4">Four Stars</option>
                    <option value="3">Three Stars</option>
                    <option value="2">Two Stars</option>
                    <option value="1">One Star</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addMovie} disabled={!(title && rating !== 'default' && rating)}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* END OF ADD MOVIE MODAL */}

      <main className="container-fluid mt-3">
        <header className="jumbotron bg-dark text-light">
          <h1 className="text-center m-0">Movies</h1>
        </header>
        {displayMovies && <MoviesList movies={displayMovies} deleteMovie={deleteMovie} />}
        <button className="btn btn-block btn-light add-movie-btn mt-3" data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
      </main>
    </div>
  )
}

export default MoviesApp