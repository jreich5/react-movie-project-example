import React from 'react'
import PropTypes from 'prop-types'

Movie.propTypes = {
  movie: PropTypes.object,
  deleteMovie: PropTypes.func
}

function Movie({ movie, deleteMovie, setEditMovie }) {
  const starStyle = {
    width: `${movie.rating * 20}%`
  }
  function deleteBtn() {
    deleteMovie(movie.id)
  }

  return (
    <div className="col-lg-3 my-3">
      <article className="card border-light bg-dark text-light">
        <div className="d-flex justify-content-end mr-1 mt-1">
          <div className="btn-group">
            <button className="btn btn-primary d-flex p-1" onClick={() => setEditMovie({...movie})}><i className="text-light fas fa-pen-square m-auto"></i></button>
            <button id="delete-btn" onClick={deleteBtn} className="btn btn-danger d-flex p-1" data-toggle="modal" data-target="#delete-movie-modal"><i className="text-light fas fa-minus-circle m-auto"></i></button>
          </div>
        </div>
        <div className="card-body d-flex flex-column pt-2">
          <div className="card-title">
            <h5 className="text-center">{movie.title}</h5>
          </div>
          <div className="stars-outer mx-auto">
            <div className="stars-inner" style={starStyle}></div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Movie