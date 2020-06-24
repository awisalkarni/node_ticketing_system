import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './priority.css';

const Priority = props => {

  return (
    <tr>
      <td>{props.priority._id}</td>
      <td>{props.priority.name}</td>
      <td><div className="box" style={{ backgroundColor: `${props.priority.color}` }}></div></td>
    </tr>
  )

}

class PriorityList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      priorities: [],
      token: ""
    }
    this.state.token = localStorage.getItem("token");
  }

  componentWillMount() {
    

    axios.get('/api/priority', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          priorities: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  priorityList() {

    return this.state.priorities.map((priority) => {

      return <Priority priority={priority} key={priority._id} />;

    });

  }


  render() {
    return <div>
      <h1>Priorities <Link className="btn btn-primary btn-sm" to="/priority/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>id</td>
          <td>Name</td>
          <td>Color</td>
          </tr>
        </thead>
        <tbody>
          {this.priorityList()}
        </tbody>
      </table>
    </div>;
  }
}



export default PriorityList;