import React from 'react'

const Navbar = () => {
  return (
    <div className=' bg-white my-4 navbar rounded mx-auto' >
  <div className="container d-flex flex-row align-items-center justify-content-center " >
    <a className="navbar-brand" href="#">
        <img src="/logos_firebase.svg" className='pb-1' alt="logo" />
    </a>
    <h1 className='fs-3 fw-bold'>Firebase Contact</h1>
  </div>

    </div>
  )
}

export default Navbar