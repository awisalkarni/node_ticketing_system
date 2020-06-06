import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class TicketDetails extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);

        this.state = {
            ticket: [],
            token: ""
        }
    }

    componentDidMount() {

        this.state.token = localStorage.getItem('token');
        const id = this.props.match.params.id;

        axios.get('http://localhost:8080/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                console.log(res.data.priority.name)
                this.setState({
                    ticket: res.data
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

    onSubmitReply(e){
        e.preventDefault();
    }



    render() {



        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Ticket Detail ({this.state.ticket.title})</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Status: {this.state.ticket.status}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Created on: {this.state.ticket.status}</h6>

                        <p className="card-text">{this.state.ticket.description}</p>
                        <a href="#" className="card-link">Update</a>
                        <a href="#" className="card-link">Delete</a>
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">Add reply</div>

                    <div className="panel-body">
                        <div className="comment-form">

                            <form onSubmit={this.onSubmitReply} className="form">


                                <input type="hidden" name="ticket_id" />

                                <div className="form-group">
                                    <textarea rows="10" id="comment" className="form-control" name="comment"></textarea>


                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}