import React from 'react'

export default function Banner() {
  return (
    <div className='section__banner'>
      <div className='section__banner-image'></div>
      <div className='section__banner-content'>
        <div className='banner-text'>
          <h2>We Cook Delicious</h2>
          <h3> You can call us on:</h3>
          <h4> 1234656789</h4>
          <h3>OR</h3>
          <br />
          <button className='btn btn-1'>Order Now</button>
        </div>
      </div>
    </div>
  )
}
