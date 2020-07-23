import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './device.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Device = props => {

  return (
    <tr>
      <td>{props.device._id}</td>
      <td>{props.device.name}</td>
      <td>{props.device.comments}</td>
      <td>{props.device.location.name}</td>
      <td>
        <Link to={`/device/edit/${props.device._id}`} className="btn btn-primary">Edit</Link>
        <button className="btn btn-danger" onClick={ () => props.deleteDevice(props.device._id) }>Delete</button>
      </td>
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

  showConfirmDeleteDialog(id) {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deleteDevice(id)
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
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

      return <Device device={device} key={device._id} deleteDevice={this.componentWillMount} />;

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
          <td>Location <Link className="btn btn-success btn-sm" to="location">Manage</Link></td>
          <td>Action</td>
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