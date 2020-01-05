import React, { useState, useEffect, useReducer } from 'react'
import './App.css'
import Head from './components/Head'
import Movie from './components/Movie'
import Search from './components/Search'
const apiKey = 'apikey=4a3b711b'
const MOVIE_API_URL = 'https://www.omdbapi.com/'

const initState = {
  loading: true,
  movies: [],
  errorMessage: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIE_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default: return state
  }
}

function App () {
  // const [loading, setLoading] = useState(true)
  // const [movies, setMovies] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)

  const [state, dispatch] = useReducer(reducer, initState)

  const search = (value = 'man') => {
    fetch(`${MOVIE_API_URL}?s=${value}&${apiKey}`).then(res => res.json())
      .then(json => {
        if (json.Response === 'True') {
          // setMovies(json.Search)
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: json.Search
          })
        } else {
          // setErrorMessage(json.Error)
          dispatch({
            type: 'SEARCH_MOVIES_FAILURE',
            payload: json.Error
          })
        }
        // setLoading(false)
      })
  }

  const initMovies = () => {
    search()
  }

  useEffect(() => {
    initMovies()
  }, [])

  const searchMovies = (searchValue) => {
    dispatch({
      type: 'SEARCH_MOVIE_REQUEST'
    })
    // setLoading(true)
    // setErrorMessage(null)
    search(searchValue)
  }

  const { loading, movies, errorMessage } = state
  return (
    <div className='App'>
      <Head text='HOOKED' />
      <Search search={searchMovies} />
      <p className='App-Intro'>分享个人最喜爱的电影</p>
      <div className='movies'>
        {
          loading && !errorMessage ? (<span>loading...</span>) : errorMessage ? (
            <div className='errorMessage'>{errorMessage}</div>
          ) : (
            movies.map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))
          )
        }
      </div>

    </div>
  )
}

export default App
