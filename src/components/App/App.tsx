import React, { useState } from 'react'
import useFetcher from '../Fetcher'
import * as API from '../../constants/api'

import './App.css'

function App () {
  const [page] = useState(1)
  const { data } = useFetcher({ url: API.LIST, page })

  return (
    <div className='container'>
      <div className='logo'>
        <span className='logo__text'>WITTY</span>
      </div>
      <div className='header' />
      <div className='sidebar' />
      <div className='main'>
        {data.map(({ id, author }) => (
          <div key={id} className='meme'>
            <h1 className='meme__title'>{author}</h1>
            <img className='meme__img' src={`${API.ROOT}/id/${id}/600/400`} alt={id} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
