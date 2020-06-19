import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ticket = props => (
    <tr>
        <td>
            <Link to={"/ticket/detail/" + props.tickets._id} >{props.tickets.title}</Link>
        </td>
        <td>
            {props.tickets.description}
        </td>
        <td>
            {props.tickets.priority.name}
        </td>
        <td>
            {props.tickets.user.username}
        </td>
        <td>
            {props.tickets.device.name}
        </td>
        <td>
            {props.tickets.status}
        </td>
        <td>
            <Link to={"/ticket/edit/" + props.tickets._id}>Edit</Link> | <button className="btn btn-default" onClick={() => props.deleteTicket(props.tickets._id)}>Delete</button>
        </td>
    </tr>
)

export default class TicketsList extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);

        this.state = {
            tickets: [],
            token: ""
        }

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        

        axios.get('http://localhost:8080/ticket/', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
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
        axios.delete('http://localhost:8080/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => console.log(res.data));

        this.setState({
            tickets: this.state.tickets.filter(el => el._id !== id)
        })
    }

    ticketList() {
        return this.state.tickets.map(currentTicket => {
            return <Ticket tickets={currentTicket} deleteTicket={this.deleteTicket} key={currentTicket._id} />
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