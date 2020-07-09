import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ticket.css';

const Ticket = props => (
    <tr>
        <td>
            <Link to={"/ticket/detail/" + props.tickets._id} >{props.tickets.title}</Link>
        </td>
        <td>
            {props.tickets.description}
        </td>
        <td>
            {props.tickets.priority}
        </td>
        <td>
            {props.tickets.user.username}
        </td>
        <td>
            {(props.tickets.device) ? props.tickets.device.name : ""}
        </td>
        <td>
            {props.tickets.status}
        </td>
        <td>
            <div className="btn-group">
                <Link className="btn btn-primary btn-sm" to={`/ticket/edit/${props.tickets._id}`}>Edit</Link>
            </div>
            <div className="btn-group">
                <button className="btn btn-danger btn-sm" onClick={() => props.deleteTicket(props.tickets._id)}>Delete</button>
            </div>
            <div className="btn-group dropright">
                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Status ({props.tickets.status})
                </button>
                <div className="dropdown-menu">
                    <button className={`dropdown-item ${props.tickets.status === "open" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "open")}>Open</button>
                    <button className={`dropdown-item ${props.tickets.status === "on_hold" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "on_hold")}>On Hold</button>
                    <button className={`dropdown-item ${props.tickets.status === "in_progress" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "in_progress")}>In Progress</button>
                    <button className={`dropdown-item ${props.tickets.status === "in_review" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "in_review")}>In Review</button>
                    <button className={`dropdown-item ${props.tickets.status === "complete" ? "active" : ""}`} onClick={() => props.changeStatus(props.tickets, "complete")}>Complete</button>
                </div>
            </div>

            <div className="btn-group dropright">
                <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Priority ({props.tickets.priority})
                </button>
                <div className="dropdown-menu">
                    <button className={`dropdown-item ${props.tickets.priority === "high" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "high")}>High</button>
                    <button className={`dropdown-item ${props.tickets.priority === "medium" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "medium")}>Medium</button>
                    <button className={`dropdown-item ${props.tickets.priority === "low" ? "active" : ""}`} onClick={() => props.changePriority(props.tickets, "low")}>Low</button>
                </div>
            </div>

        </td>
    </tr>
)

export default class TicketsList extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changePriority = this.changePriority.bind(this);

        this.state = {
            tickets: [],
            token: ""
        }

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        

        axios.get('/api/ticket/', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                console.log(res.data)
                this.setState({
                    tickets: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteTicket(id) {
        axios.delete('/api/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location = '/ticket';
            });

        this.setState({
            tickets: this.state.tickets.filter(el => el._id !== id)
        })
    }

    changeStatus(ticket, status) {

        console.log(`id: ${ticket._id}, status: ${status}`);

        ticket.status = status;

        axios.post('/api/ticket/update/' + ticket._id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}`}})
            .then(res => {
                window.location = '/ticket';
            })
            .catch(err => console.log(err));

    }

    changePriority(ticket, priority) {
        console.log(`id: ${ticket._id}, status: ${priority}`);

        ticket.priority = priority;

        axios.post('/api/ticket/update/' + ticket._id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}`}})
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    ticketList() {
        return this.state.tickets.map(currentTicket => {
            return <Ticket tickets={currentTicket} deleteTicket={this.deleteTicket} key={currentTicket._id} changeStatus={this.changeStatus} changePriority={this.changePriority} />
        })
    }

    render() {
        return (
            <div>
                <h3>Tickets <Link className="btn btn-primary" to="/ticket/add">Add</Link></h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Reported by</th>
                            <th>Device</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ticketList()}
                    </tbody>
                </table>
            </div>
        );
    }
}