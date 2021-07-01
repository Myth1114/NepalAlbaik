import React from 'react'
import Button from '@material-ui/core/Button'

export default function About() {
  return (
    <div className='section__hero'>
      <div className='section__image'></div>
      <div className='section__text'>
        <p>
          <span className='text1'>
            HERE YOU CAN FIND CRISPY & FRIED CHICKEN
          </span>
          <br />
          <span className='text2'> Crispy & Fried</span>
          <br />
          <button className='btn'>Order Now</button>
        </p>
      </div>
    </div>
  )
}
