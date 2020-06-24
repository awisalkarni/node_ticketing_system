import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './device.css';

const Device = props => {

  return (
    <tr>
      <td>{props.device._id}</td>
      <td>{props.device.name}</td>
      <td>{props.device.comments}</td>
      <td>{props.device.location.name} <Link to="location">Manage Location</Link></td>
      <td><button className="btn btn-danger" onClick={ () => props.deleteDevice(props.device._id) }>Delete</button></td>
    </tr>
  )

}

class DeviceList extends Component {

  constructor(props) {
    super(props);

    this.deleteDevice = this.deleteDevice.bind(this);

    this.state = {
      devices: [],
      token: ""
    }

    this.state.token = localStorage.getItem("token");
  }

  componentWillMount() {
    

    axios.get('/api/device', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          devices: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  deleteDevice(id) {

    axios.delete('/api/device/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {
        console.log(res.data)
        this.setState({
          devices: this.state.devices.filter((el) => el._id !== id)
        });
      })
      .catch((err) => console.log(err));

    
  }

  deviceList() {

    return this.state.devices.map((device) => {

      return <Device device={device} key={device._id} deleteDevice={this.deleteDevice} />;

    });

  }


  render() {
    return <div>
      <h1>Devices <Link className="btn btn-primary btn-sm" to="/device/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Comments</td>
          <td>Location</td>
          </tr>
        </thead>
        <tbody>
          {this.deviceList()}
        </tbody>
      </table>
    </div>;
  }
}

export default DeviceList;