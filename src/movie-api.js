const apiUrl = 'http://localhost:1313/movies';
const headers = {
    'Content-Type': 'application/json'
};

function buildOptions(method = 'GET', data) {
  const options = {
    headers,
    method: method,
    body: JSON.stringify(data)
  }
  if (method === 'GET' || method === 'DELETE') {
    delete options.body;
  }
  return options;
}

async function addMovie(movie) {
  const movies = await fetch(apiUrl, buildOptions('POST', movie)).then(getMovies);
  return movies;
}

async function getMovies() {
  const movies = await fetch(apiUrl, buildOptions()).then(res => res.json());
  return movies;
}

async function getMovie(id) {
  const movie = await fetch(`${apiUrl}/${id}`, buildOptions()).then(res => res.json()).catch(console.log);
  return movie;
}

async function updateMovie({id, title, rating}) {
  const movies = await fetch(`${apiUrl}/${id}`, buildOptions('PUT', {title, rating})).then(getMovies);
  return movies;
} 

async function deleteMovie(id) {
  const movies = await fetch(`${apiUrl}/${id}`, buildOptions('DELETE')).then(getMovies).catch(console.log);
  return movies;
}

export default {addMovie, getMovies, getMovie, updateMovie, deleteMovie};