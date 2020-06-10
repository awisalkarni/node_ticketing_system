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
      <td>{props.device.location}</td>
    </tr>
  )

}

class DeviceList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      devices: [],
      token: ""
    }
  }

  componentWillMount() {
    this.state.token = localStorage.getItem("token");

    axios.get('http://localhost:8080/device', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          devices: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  deviceList() {

    return this.state.devices.map((device) => {

      return <Device device={device} key={device._id} />;

    });

  }


  render() {
    return <div>
      <h1>devices</h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>id</td>
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