import React from 'react'
import PropTypes from 'prop-types'

DeleteMovieModal.propTypes = {
  confirmDeleteMovie: PropTypes.func
}

function DeleteMovieModal({ confirmDeleteMovie }) {

  return (
    <div className="modal fade" id="delete-movie-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-movie-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="delete-movie-modal-label">Delete Movie Confirmation</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={confirmDeleteMovie}>Delete Movie</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default DeleteMovieModal