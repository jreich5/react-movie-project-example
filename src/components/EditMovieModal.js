import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

EditMovieModal.propTypes = {
  editMovie: PropTypes.func,
  movieToUpdate: PropTypes.object
}

function EditMovieModal({editMovie, movieToUpdate}) {

  // state

  const [ editMovieValue, setEditMovieValue ] = useState(movieToUpdate)


  // effects

  useEffect(() => {
    setEditMovieValue(movieToUpdate)
  }, [movieToUpdate])


  // render

  return (
    <div className="modal fade" id="edit-movie-modal" tabIndex="-1" role="dialog" aria-labelledby="edit-movie-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">  
          <div className="modal-header">
            <h5 className="modal-title" id="edit-movie-modal-label">Edit Movie</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" id="title" placeholder="Enter movie title" value={editMovieValue.title} onChange={e => {
                  console.log(e.target.value)
                  setEditMovieValue({...editMovieValue, title: e.target.value})
                }} />
              </div>
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select className="form-control" name="rating" type="text" id="rating" value={editMovieValue.rating} placeholder="Enter movie rating" onChange={e => {
                  console.log(e.target.value)
                  setEditMovieValue({...editMovieValue, rating: e.target.value})
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
            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => editMovie(editMovieValue)} disabled={!(editMovieValue.title && editMovieValue.rating !== 'default' && editMovieValue.rating)}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EditMovieModal