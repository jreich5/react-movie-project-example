import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'

MoviesList.propTypes = {
  movies: PropTypes.array
}

function MoviesList({ movies, deleteMovie }) {
  return(
    <section className="row">
      { movies.map(movie => <Movie key={movie.id} movie={movie} deleteMovie={deleteMovie} />) }
    </section>
  )
}

export default MoviesList