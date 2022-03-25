import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand"><span style={{fontFamily:" 'IBM Plex Sans KR', sans-serif",fontWeight:"bold",fontStyle:"italic"}}>Neo</span><span style={{fontFamily:" 'IBM Plex Sans KR', sans-serif",fontWeight:"bold",fontStyle:"italic"}} className="text-danger">STORE</span>&nbsp;<span className="">v2</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link " aria-current="page" ><Link to="/" className='link'>Add Categories</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/admin/displaycat" className='link'>Display Categories</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/admin/addproducts" className='link'>Add Products</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/admin/displayproducts" className='link'>Display Products</Link></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
