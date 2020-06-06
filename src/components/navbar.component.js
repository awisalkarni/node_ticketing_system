import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Navbar extends Component {


  render() {

    const storedJwt = localStorage.getItem('token');

    if (storedJwt == null) {
      return <Redirect to="/login" />
    }


    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Ticket System</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tickets
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                
                <div className="dropdown-divider"></div>
                <Link to="/ticket/add" className="dropdown-item">Create Tickets</Link>
              </div>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Users</Link>
            </li>

            <li className="navbar-item pull-right">
              <Link to="/logout" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}