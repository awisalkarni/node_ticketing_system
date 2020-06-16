import React, { Component } from 'react';
import axios from 'axios';

class CreateZone extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            company: "",
            companies: [],
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {
        axios.get('http://localhost:8080/company',{ headers: { 'Authorization': `Bearer ${this.state.token}` } })
        .then((res) => {
            this.setState({
                companies: res.data
            })
        })
        .catch((err) => console.log(err))
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const zone = {

            name: this.state.name,
            company: this.state.company

        }

        axios.post('http://localhost:8080/zone/add', zone, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        
        window.location = '/ticket/add';

        
    }

    render() {
        return (
            <div>
                <h3>Create New Zone</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <select className="form-control" onChange={this.onChangeCompany} value={this.state.company}>
                            { this.state.companies.map((company) => {
                                return <option key={company._id} value={ company._id }>{ company.name }</option>
                            }) }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Zone" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateZone;