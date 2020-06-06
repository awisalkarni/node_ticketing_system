import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",

            users: [],
            selectedUser: "",
            priorities: [],
            selectedPriorities: "",
            devices: [],
            selectedDevices: "",
            token: ""
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    componentDidMount() {
        this.state.token = localStorage.getItem('token');

        //get 
        axios.get('http://localhost:8080/ticket/add/prepare', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                console.log(res.data)

                this.setState({
                    users: res.data.users,
                    selectedUser: res.data.users[0]._id,

                    priorities: res.data.priorities,
                    selectedPriorities: res.data.priorities[0]._id,

                    devices: res.data.devices,
                    selectedDevices: res.data.devices[0]._id
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

        console.log(this.state.selectedPriorities);
    }

    onSubmit(e) {
        e.preventDefault();

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            priority: this.state.selectedPriorities,
            user: this.state.selectedUser,
            device: this.state.selectedDevices
        }

        console.log(ticket);

        axios.post('http://localhost:8080/ticket/add', ticket)
            .then(res => console.log(ticket));

        // console.log(tickets);

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create new Ticket</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(user => {
                                    return <option
                                        key={user._id}
                                        value={user._id}>
                                        {user.username}
                                    </option>
                                })
                            }
                        </select>
                    </div>
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
                        <label>Devices: </label>
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
                        <label>Priority: </label>
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