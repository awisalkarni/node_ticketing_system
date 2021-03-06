import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Navbar from "./components/navbar.component";
import CreateUser from "./components/users/create-user.component";
import CreateTicket from "./components/tickets/create-ticket.component";
import TicketsList from "./components/tickets/ticket-list.component";
import TicketDetails from "./components/tickets/ticket-details.component";
import LoginBox from './components/auth/login.component';
import RegisterBox from './components/auth/register.component';
import CreatePriority from './components/priorities/create-priority.component';
import CreateDevice from './components/devices/create-device.component';
import PriorityList from './components/priorities/priority-list.component';
import DeviceList from './components/devices/device-list.component';
import LocationList from './components/locations/location-list.component';
import CreateLocation from './components/locations/create-location.component';
import CreateZone from './components/zone/create-zone.component';
import ZoneList from './components/zone/zone-list.component';
import CompanyList from './components/companies/company-list.component';
import CreateCompany from './components/companies/create-company.component';
import EditTicket from './components/tickets/edit-ticket.component';
import EditDevice from './components/devices/edit-device.component';
import EditLocation from './components/locations/edit-location.component';
import Dashboard from './components/dashboard.component';


function App() {

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken;
      console.log(`csrf token: ${data.csrfToken}`);
     };
    getCsrfToken();
  });

  
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

            <Route path="/" exact component={Dashboard}/>
            <Route path="/ticket" exact component={TicketsList} />
            <Route path="/ticket/add" exact component={CreateTicket} />
            <Route path="/ticket/edit/:id" exact component={EditTicket} />
            <Route path="/ticket/detail/:id" exact component={TicketDetails} />
            
            
            <Route path="/user" exact component={CreateUser} />
            <Route path="/user/add" exact component={CreateUser} />
          
            <Route path="/priority" exact component={PriorityList} />
            <Route path="/priority/add" exact component={CreatePriority} />
            
            <Route path="/device" exact component={DeviceList} />
            <Route path="/device/edit/:id" exact component={EditDevice} />
            <Route path="/device/add" exact component={CreateDevice} />

            <Route path="/location/add" exact component={CreateLocation} />
            <Route path="/location/edit/:id" exact component={EditLocation} />
            <Route path="/location/" exact component={LocationList} />

            <Route path="/zone/add" exact component={CreateZone} />
            <Route path="/zone/" exact component={ZoneList} />

            <Route path="/company/" exact component={CompanyList} />
            <Route path="/company/add" exact component={CreateCompany} />
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
