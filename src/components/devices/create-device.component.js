import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDevice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            comments: "",
            locations: [],
            locationId: ""
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeComments = this.onChangeComments.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        axios.get('/api/location', {headers: {'Authorization': `Bearer ${this.state.token}` } })
        .then((res) => {
            this.setState({
                locations: res.data,
                locationId: (res.data.length > 0) ? res.data[0]._id : ""
            })
        })
        .catch((err) => console.log(err))
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeComments(e) {
        this.setState({
            comments: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            locationId: e.target.value
        });
    }
    

    onSubmit(e) {
        e.preventDefault();

        const device = {

            name: this.state.name,
            comments: this.state.comments,
            location: this.state.locationId

        }

        axios.post('/api/device/add', device, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        window.location = '/device';
        
    }

    render() {
        return (
            <div>
                <h3>Create New Device</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comments">Comments</label>
                        <input type="text" className="form-control" onChange={this.onChangeComments} value={this.state.comments} />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <select className="form-control" onChange={this.onChangeLocation} value={this.state.locationId}>
                            { this.state.locations.map((location) => {
                                return <option key={location._id} value={location._id}>{location.name}</option>
                            }) }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Device" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}