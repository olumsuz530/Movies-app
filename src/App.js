import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('')
  const [movie, setMovie] = useState('')
  const [detail, setDetail] = useState(false)

  function changeTitle(e) {
    setTitle(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios({
      method: 'get',
      url: 'https://www.omdbapi.com/',
      params: {
        apikey: '6fd9f364',
        t: title,
      }
    }).then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }

  function showDescription() {
    if (detail) {
      setDetail(false)
    }
    else {
      setDetail(true)
    }
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={handleSubmit}>
        <input placeholder="Search for a movie..." id="search_title" type="text" onChange={changeTitle}></input>
        <button onClick={handleSubmit}><i className="fas fa-search"></i></button>
      </form>
      {movie ? (<div onClick={showDescription} className="movie-card" style={{ backgroundImage: `url(${movie.Poster})` }}>
        <div className="movie-background">
          <h1 className="movie-title">{movie.Title} <span className="movie-year">({movie.Year})</span></h1>
          <div className="rating">{movie.imdbRating} <i className="fas fa-star "></i></div>
          <div className="movie-director">{movie.Director}</div>
          <div className="movie-actor"><span>{movie.Actors}</span></div>
          <div className="movie-runtime">{movie.Runtime}</div>
        </div>
      </div>) : ('')}
      {detail ? (<div className="detail">
        <p><span className="detail-headers">Title:</span> {movie.Title}</p>
        <p><span className="detail-headers">Year:</span> {movie.Year}</p>
        <p><span className="detail-headers">Release Date:</span> {movie.Released}</p>
        <p><span className="detail-headers">Runtime:</span> {movie.Runtime}</p>
        <p><span className="detail-headers">Genre:</span> {movie.Genre}</p>
        <p><span className="detail-headers">Director:</span> {movie.Director}</p>
        <p><span className="detail-headers">Writer:</span> {movie.Writer}</p>
        <p><span className="detail-headers">Actors:</span> {movie.Actors}</p>
        <p><span className="detail-headers">Plot: </span> {movie.Plot}</p>
        <p><span className="detail-headers">Language:</span> {movie.Language}</p>
        <p><span className="detail-headers">Country:</span> {movie.Country}</p>
        <p><span className="detail-headers">Imdb Rating:</span> {movie.imdbRating}</p>
        <p><span className="detail-headers">Imdb Votes:</span> {movie.imdbVotes}</p>
        <p><span className="detail-headers">Type:</span> {movie.Type}</p>
        <p><span className="detail-headers">Production:</span> {movie.Production}</p>
      </div>
      ) : ('')}


    </div>
  );
}

export default App;
