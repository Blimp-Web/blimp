import '../App.css';
import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    const navStyle = {
        color: "white"
    }

  return (
    <nav>
        <ul>
            <Link style={navStyle} to='/'>
            <li className="nav-links">Home</li>
            </Link>
            <Link style={navStyle} to='/about'>
            <li className="nav-links">about us</li>
            </Link>
            <Link style={navStyle} to='/SignUp'>
            <li className="nav-links">sign up</li>
            </Link>
            <Link style={navStyle} to='/SignIn'>
            <li className="nav-links">sign in</li>
            </Link>
            <Link style={navStyle} to='/feed'>
            <li className="nav-links">Feed</li>
            </Link>
            <Link style={navStyle} to='/dashboard'>
            <li className="nav-links">DashBoard</li>
            </Link>
        </ul>
    </nav>

  );
}

export default Nav;