import React, { Component } from 'react';
import axios from 'axios';

class CreateLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            zone: "",
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeZone = this.onChangeZone.bind(this);
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

    onChangeZone(e) {
        this.setState({
            zone: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const priority = {

            name: this.state.name,
            zone: this.state.zone

        }

        axios.post('http://localhost:8080/priority/add', priority, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        
        window.location = '/ticket/add';

        
    }

    render() {
        return (
            <div>
                <h3>Create New Location</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label for="name">Zone</label>
                        <select className="form-control" onChange={this.onChangeZone} value={this.state.zone}>
                            <option value="">Select zone</option>
                            <option value="#FFF">White</option>
                            <option value="#000">Black</option>
                            <option value="#FF0000">Red</option>
                            <option value="#28B463">Green</option>
                            <option value="#2E86C1">Blue</option>
                            <option value="#D35400">Orange</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Priority" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateLocation;