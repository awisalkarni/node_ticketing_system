import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Zone = props => {

  return (
    <tr>
      <td>{props.zone._id}</td>
      <td>{props.zone.name}</td>
      <td>{props.zone.company.name} <Link to="/company">Manage Company</Link></td>
      <td><button className="btn btn-danger" onClick={() => props.deleteZone(props.zone._id) }>Delete</button></td>
    </tr>
  )

}

class ZoneList extends Component {

  constructor(props) {
    super(props);

    this.deleteZone = this.deleteZone.bind(this);

    this.state = {
      zones: [],
      token: ""
    }

    this.state.token = localStorage.getItem("token");
  }

  componentWillMount() {


    axios.get('http://localhost:8080/zone', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          zones: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  deleteZone(id) {

    axios.delete('http://localhost:8080/zone/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then(res => {
        console.log(res)
        this.setState({
          zones: this.state.zones.filter(el => el._id !== id)
        })
      });

    

  }

  zoneList() {

    return this.state.zones.map((zone) => {

      return <Zone zone={zone} key={zone._id} deleteZone={this.deleteZone} />;

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
            <td>Company</td>
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