import React, { useState } from 'react'
import PropTypes from 'prop-types'

AddMovieModal.propTypes = {
  addMovie: PropTypes.func
}

function AddMovieModal({ addMovie }) {

  // state

  const [ title, setTitle ] = useState('')
  const [ rating, setRating ] = useState('default')

  // functions

  function handleAddMovie() {
    addMovie(title, rating)
    setTitle('')
    setRating('default')
  }

  // render

  return (
    <div className="modal fade" id="add-movie-modal" tabIndex="-1" role="dialog" aria-labelledby="add-movie-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="add-movie-modal-label">Add Movie</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" placeholder="Enter movie title" value={title} onChange={e => {
                  setTitle(e.target.value)
                }} />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select className="form-control" name="rating" type="text" id="rating" value={rating} placeholder="Enter movie rating" onChange={e => {
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
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleAddMovie} disabled={!(title && rating !== 'default' && rating)}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AddMovieModal