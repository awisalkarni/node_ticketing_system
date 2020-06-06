import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import CreateUser from "./components/create-user.component";
import CreateTicket from "./components/tickets/create-ticket.component";
import TicketsList from "./components/tickets/ticket-list.component";
import LoginBox from './components/auth/login.component';
import RegisterBox from './components/auth/register.component';


function App() {

  
  return (
    <Router>
      <Navbar />
      <br/>
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-inner">
            
            <Route path="/login" exact component={LoginBox} />
            <Route path="/register" exact component={RegisterBox} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={TicketsList} />
            <Route path="/ticket/add" exact component={CreateTicket} />
            <Route path="/user" exact component={CreateUser} />
          </div>
        </div>
      </div>
    </Router>
  );
}

const Logout = (() => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");

  window.location = '/login';

});

export default App;
