import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Zone = props => {

  return (
    <tr>
      <td>{props.zone._id}</td>
      <td>{props.zone.name}</td>
      <td>{props.zone.company.name}</td>
      <td><button className="btn btn-danger" onClick={() => props.showConfirmDeleteDialog(props.zone._id)}>Delete</button></td>
    </tr>
  )

}

class ZoneList extends Component {

  constructor(props) {
    super(props);

    this.deleteZone = this.deleteZone.bind(this);
    this.showConfirmDeleteDialog = this.showConfirmDeleteDialog.bind(this);

    this.state = {
      zones: [],
      token: ""
    }

    this.state.token = localStorage.getItem("token");
    console.log(this.state.token);
  }

  componentWillMount() {


    axios.get('/api/zone', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {
        this.setState({
          zones: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  showConfirmDeleteDialog(id) {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deleteZone(id)
          }
        },
        {
          label: 'No',
          onClick: () => { }
        }
      ]
    });
  }

  deleteZone(id) {

    axios.delete('/api/zone/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then(res => {
        console.log(res)
        this.setState({
          zones: this.state.zones.filter(el => el._id !== id)
        })
      });



  }

  zoneList() {

    return this.state.zones.map((zone) => {

      return <Zone zone={zone} key={zone._id} showConfirmDeleteDialog={this.showConfirmDeleteDialog} />;

    });

  }


  render() {
    return <div>
      <h1>Zones <Link className="btn btn-primary btn-sm" to="/zone/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Company <Link className="btn btn-success btn-sm" to="/company">Manage</Link></td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {this.zoneList()}
        </tbody>
      </table>
    </div>;
  }
}



export default ZoneList;