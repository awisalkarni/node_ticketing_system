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

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Tickets
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/tickets/" className="dropdown-item">Open Tickets</Link>
                <div class="dropdown-divider"></div>
                <Link to="/tickets/create" className="dropdown-item">Create Tickets</Link>
              </div>
            </li>

            <li className="navbar-item">
              <Link to="/tickets/create" className="nav-link">Create Exercise Log</Link>
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