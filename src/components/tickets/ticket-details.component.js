import React, { Component } from 'react';
import axios from 'axios';


export default class TicketDetails extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.onChangeReply = this.onChangeReply.bind(this);
        this.onSubmitReply = this.onSubmitReply.bind(this);

        this.state = {
            ticket: [],
            token: "",
            reply: "",
            comments: []
        }
        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {


        const id = this.props.match.params.id;

        axios.get('http://localhost:8080/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                console.log(res.data.priority.name)
                this.setState({
                    ticket: res.data,
                    comments: res.data.comments
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

    onChangeReply(e) {
        this.setState({
            reply: e.target.value
        });
        console.log(this.state.reply)
    }

    onSubmitReply(e) {
        e.preventDefault();

        const userId = localStorage.getItem('user_id');

        const comment = {
            contents: this.state.reply,
            user: userId
        }

        console.log(comment);

        axios.post(`http://localhost:8080/ticket/${this.state.ticket._id}/comment`, comment, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location.reload();
            });


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

                <div className="comments">
                    <ul>
                        {this.state.comments.map((comment) => {
                            return <li>{comment.contents} by {comment.user.username}</li>
                        })}
                    </ul>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">Add reply</div>

                    <div className="panel-body">
                        <div className="comment-form">

                            <form onSubmit={this.onSubmitReply} className="form">


                                <input type="hidden" name="ticket_id" />

                                <div className="form-group">
                                    <textarea onChange={this.onChangeReply} rows="10" id="comment" className="form-control" name="comment"></textarea>


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