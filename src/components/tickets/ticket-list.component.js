import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Ticket = props => (
    <tr>
        <td>
            {props.tickets.title}
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
            <Link to={"/ticket/edit/" + props.tickets._id}>Edit</Link> | <button className="btn btn-default" onClick={() => props.deleteTicket(props.exercise._id)}>Delete</button> 
        </td>
    </tr>
)

export default class TicketsList extends Component {

    constructor(props){
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);

        this.state = {tickets: []}
    }

    componentDidMount(){

        axios.get('http://localhost:8080/ticket/')
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

    deleteTicket(id){
        axios.delete('http://localhost:8080/ticket/'+id)
            .then(res => console.log(res.data));

        this.setState({
            tickets: this.state.tickets.filter(el => el._id !== id)
        })
    }

    ticketList(){
        return this.state.tickets.map(currentTicket => {
            return <Ticket tickets={currentTicket} deleteTicket={this.deleteTicket} key={currentTicket._id} />
        })
    }

    render(){
        return (
            <div>
                <h3>tickets</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Reported by</th>
                            <th>Device</th>
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