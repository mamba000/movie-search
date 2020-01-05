import React from 'react'
const DEFAULT_POSTER =
  'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg'
function Movie ({ movie }) {
  const poster = movie.Poster === 'N/A' ? DEFAULT_POSTER : movie.Poster
  return (<div className='movie'>
    <h2>{movie.Title}</h2>
    <div>
      <img src={poster} alt={movie.Title} />
    </div>
    <p>({movie.Year})</p>
  </div>)
}

export default Movie
