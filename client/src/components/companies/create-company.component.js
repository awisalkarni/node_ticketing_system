import React, { Component } from 'react';
import axios from 'axios';

class CreateCompany extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const company = {

            name: this.state.name,

        }

        axios.post('/api/company/add', company, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        window.location = '/company';
        
    }

    render() {
        return (
            <div>
                <h3>Create New Company</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Company" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateCompany;