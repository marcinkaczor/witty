/* global IntersectionObserver */
import React, { useState, useRef, useCallback } from 'react'
import useFetcher from '../Fetcher'
import * as API from '../../constants/api'

import './App.css'

function App () {
  const [page, setPage] = useState(1)
  const { data, loading, error, hasMore } = useFetcher({ url: API.LIST, page })

  const observer = useRef<IntersectionObserver>()
  const lastDataItemRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page => page + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  return (
    <div className='container'>
      <div className='logo'>
        <span className='logo__text'>WITTY</span>
      </div>
      <div className='header' />
      <div className='sidebar' />
      <div className='main'>
        {data.map(({ id, author }, i, { length }) => (
          <div key={id} className='meme' ref={i + 1 === length ? lastDataItemRef : null}>
            <h1 className='meme__title'>{author}</h1>
            <img className='meme__img' src={`${API.ROOT}/id/${id}/600/400`} alt={id} />
          </div>
        ))}
        {loading && 'Loading ...'}
        {error && 'Error'}
      </div>
    </div>
  )
}

export default App
