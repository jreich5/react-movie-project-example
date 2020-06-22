import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'

MoviesList.propTypes = {
  movies: PropTypes.array,
  deleteMovie: PropTypes.func,
  setEditMovie: PropTypes.func
}

function MoviesList({ movies, deleteMovie, setEditMovie }) {
  return(
    <section className="row">
      { movies.map(movie => <Movie key={movie.id} movie={movie} deleteMovie={deleteMovie} setEditMovie={setEditMovie} />) }
    </section>
  )
}

export default MoviesList