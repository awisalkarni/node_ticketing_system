import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Ticket System</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Exercises</Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tickets
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/ticket/" className="dropdown-item">Tickets</Link>
                <div className="dropdown-divider"></div>
                <Link to="/ticket/add" className="dropdown-item">Create Tickets</Link>
              </div>
            </li>

            <li className="navbar-item">
              <Link to="/ticket/create" className="nav-link">Create Exercise Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/users/create" className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}