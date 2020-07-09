import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class EditTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            selectedPriorities: "",
            devices: [],
            selectedDevices: "",
            selectedStatus: "",
            token: "",
            id: "",
            status: "",
        }

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onChangeDevices = this.onChangeDevices.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state.token = localStorage.getItem('token');
        this.state.id = props.match.params.id;
        
    }

    componentDidMount() {
        axios.get('/api/ticket/' + this.state.id,  { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                this.setState({
                    title: res.data.title,
                    description: res.data.description,
                    selectedDevices: res.data.device._id,
                    status: res.data.status
                })

            })
            .catch(err => console.log(err));
        

        //get 
        axios.get('/api/ticket/add/prepare', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {

                this.setState({
                    selectedPriorities: res.data.priority,
                    selectedStatus: res.data.status,
                    devices: res.data.devices,
                    selectedDevices: res.data.devices.length === 0 ? "" : res.data.devices[0]._id
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

    onChangeStatus(e){

        this.setState({
            selectedStatus: e.target.value
        })

    }

    onSubmit(e) {
        e.preventDefault();

        const ticket = {
            title: this.state.title,
            description: this.state.description,
            priority: this.state.selectedPriorities,
            device: this.state.selectedDevices,
            status: this.state.status
        }

        axios.post('/api/ticket/update/' + this.state.id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => window.location = '/ticket/detail/' + this.state.id)
            .catch(err => console.log(err));
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
                        <label>Status</label>
                        <select 
                        required
                        className="form-control"
                        value={this.state.selectedStatus}
                        onChange={this.onChangeStatus}>

                            <option value="open">Open</option>
                            <option value="on_hold">On Hold</option>
                            <option value="in_progress">In Progress</option>
                            <option value="in_review">In Review</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Priority: </label> <Link to="/priority/add">Add</Link>
                        <select
                            required
                            className="form-control"
                            
                            value={this.state.selectedPriorities}
                            onChange={this.onChangePriority}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}