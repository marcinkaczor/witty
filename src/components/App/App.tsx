/* global IntersectionObserver */
import React, { useState, useRef, useCallback } from 'react'
import useFetcher from '../Fetcher'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import * as API from '../../constants/api'

import './App.css'

function App () {
  const [page, setPage] = useState(1)
  const [favs, setFavs] = useState<string[]>([])
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

  const handleClick = (id : string) => () => {
    if (favs.includes(id)) {
      setFavs(favs => favs.filter(fav => fav !== id))
    } else {
      setFavs(favs => [...favs, id])
    }
  }

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
            <div className='meme__footer'>
              <button className='meme__button' onClick={handleClick(id)}>
                <FontAwesomeIcon icon={favs.includes(id) ? faHeartSolid : faHeartRegular} />
              </button>
            </div>
          </div>
        ))}
        {loading && 'Loading ...'}
        {error && 'Error'}
      </div>
    </div>
  )
}

export default App
