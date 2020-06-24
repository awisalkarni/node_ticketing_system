import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Company = props => {

  return (
    <tr>
      <td>{props.company._id}</td>
      <td>{props.company.name}</td>
    </tr>
  )

}

class CompanyList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      token: ""
    }

    this.state.token = localStorage.getItem("token");
  }

  componentWillMount() {
    

    axios.get('/api/company', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
      .then((res) => {

        console.log(res.data)
        this.setState({
          companies: res.data
        });

      })
      .catch((err) => console.log(err))
  }

  companyList() {

    return this.state.companies.map((company) => {

      return <Company company={company} key={company._id} />;

    });

  }


  render() {
    return <div>
      <h1>Companies <Link className="btn btn-primary btn-sm" to="/company/add">Add</Link></h1>
      <table className="table">
        <thead className="thead-light">
          <tr>
          <td>ID</td>
          <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {this.companyList()}
        </tbody>
      </table>
    </div>;
  }
}



export default CompanyList;