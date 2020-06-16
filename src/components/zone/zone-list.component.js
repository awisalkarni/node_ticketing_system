import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Zone = props => {

  return (
    <tr>
      <td>{props.zone._id}</td>
      <td>{props.zone.company} <Link>Manage Company</Link></td>
    </tr>
  )

}

class ZoneList extends Component {

  constructor(props) {
    super(props);

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

  zoneList() {

    return this.state.zones.map((zone) => {

      return <Zone zone={zone} key={zone._id} />;

    });

  }


  render() {
    return <div>
      <h1>Zones <Link className="btn btn-primary btn-sm" to="/zone/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>Name</td>
          <td>Company</td>
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