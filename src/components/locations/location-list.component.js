import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Location = props => {

  return (
    <tr>
      <td>{props.location._id}</td>
      <td>{props.location.name}</td>
      <td>{props.location.zone.name} <Link to="/zone">Manage Zone</Link></td>
    </tr>
  )

}

class LocationList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      token: ""
    }

    this.state.token = localStorage.getItem("token");
  }

  componentWillMount() {
    

    axios.get('http://localhost:8080/location', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          locations: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  locationList() {

    return this.state.locations.map((location) => {

      return <Location location={location} key={location._id} deleteLocation={this.deleteLocation}/>;

    });

  }

  deleteLocation(id) {

    axios.delete('http://localhost:8080/location/' + id, {headers: {'Authorization': `Bearer ${this.state.token}`}})
    .then((res) => {
      console.log(res.data);
      this.setState({
        locations: this.state.locations.filter((el) => el._id !== id)
      })
    })
    .catch(err => console.log(err));

  }


  render() {
    return <div>
      <h1>Locations <Link className="btn btn-primary btn-sm" to="/location/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>ID</td>
          <td>Name</td>
          <td>Zone</td>
          </tr>
        </thead>
        <tbody>
          {this.locationList()}
        </tbody>
      </table>
    </div>;
  }
}



export default LocationList;