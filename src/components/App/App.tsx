import React from 'react'
import photos from '../../content'
import './App.css'

function App () {
  return (
    <div className='container'>
      <div className='logo'>
        <span className='logo__text'>WITTY</span>
      </div>
      <div className='header' />
      <div className='sidebar' />
      <div className='main'>
        {photos.map(({ id, desc, src }) => (
          <div key={id} className='meme'>
            <h1 className='meme__title'>{desc}</h1>
            <img className='meme__img' src={src} alt={id.toString()} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
