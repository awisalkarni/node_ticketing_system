import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CreateTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            priorities: [],
            selectedPriorities: "",
            devices: [],
            selectedDevices: "",
            token: ""
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeDevices = this.onChangeDevices.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    componentDidMount() {
        this.state.token = localStorage.getItem('token');

        //get 
        axios.get('http://localhost:8080/ticket/add/prepare', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {

                this.setState({

                    priorities: res.data.priorities,
                    selectedPriorities: res.data.priorities.length == 0 ? "" : res.data.priorities[0]._id,

                    devices: res.data.devices,
                    selectedDevices: res.data.devices.length == 0 ? "" : res.data.devices[0]._id
                })



            });
    }

    onChangeUsername(e) {
        this.setState({
            selectedUser: e.target.value
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    
    onChangeDevices(e) {
        this.setState({
            selectedDevices: e.target.value
        })
    }
    
    onChangePriority(e) {
        this.setState({
            selectedPriorities: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        
        const userId = localStorage.getItem('user_id');

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            priority: this.state.selectedPriorities,
            user: userId,
            device: this.state.selectedDevices
        }

        console.log(ticket);

        axios.post('http://localhost:8080/ticket/add', ticket, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => window.location = '/');

        
    }

    render() {
        return (
            <div>
                <h3>Create new Ticket</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            required
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="form-group">
                        <label>Devices: </label> <Link to="/device/add">Add</Link>
                        <select
                            required
                            className="form-control"
                            
                            value={this.state.selectedDevices}
                            onChange={this.onChangeDevices}>
                            {
                                this.state.devices.map(device => {
                                    return <option
                                        key={device._id}
                                        value={device._id}>
                                        {device.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Priority: </label> <Link to="/priority/add">Add</Link>
                        <select
                            required
                            className="form-control"
                            
                            value={this.state.selectedPriorities}
                            onChange={this.onChangePriority}>
                            {
                                this.state.priorities.map(priority => {
                                    return <option
                                        key={priority._id}
                                        value={priority._id}>
                                        {priority.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Ticket" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}