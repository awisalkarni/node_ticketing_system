import React, { Component } from 'react';
import axios from 'axios';

class CreateZone extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            company: "",
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
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
                            <option value="">Select company</option>
                            <option value="#FFF">White</option>
                            <option value="#000">Black</option>
                            <option value="#FF0000">Red</option>
                            <option value="#28B463">Green</option>
                            <option value="#2E86C1">Blue</option>
                            <option value="#D35400">Orange</option>
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