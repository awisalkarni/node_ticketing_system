import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class TicketDetails extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.onChangeReply = this.onChangeReply.bind(this);
        this.onSubmitReply = this.onSubmitReply.bind(this);

        // init counter
        this.count = 0

        this.state = {
            ticket: [],
            token: "",
            reply: "",
            comments: [],
            edit: false,
        }
        this.state.token = localStorage.getItem('token');
    }

    handleClick(e) {
        // cancel previous callback
        if (this.timeout) clearTimeout(this.timeout)

        // increment count
        this.count++

        // schedule new callback  [timeBetweenClicks] ms after last click
        this.timeout = setTimeout(() => {
            // listen for double clicks
            if (this.count === 2) {
                // turn on edit mode
                this.setState({
                    edit: true,
                })
            }

            // reset count
            this.count = 0
        }, 250) // 250 ms
    }

    handleBlur(e) {
        // handle saving here

        // close edit mode
        this.setState({
            edit: false,
        })
    }

    componentWillUnmount() {
        // cancel click callback
        if (this.timeout) clearTimeout(this.timeout)
    }

    componentDidMount() {


        const id = this.props.match.params.id;

        axios.get('/api/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
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
        axios.delete('/api/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
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

        axios.post(`/api/ticket/${this.state.ticket._id}/comment`, comment, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location.reload();
            });


    }



    render() {

        const { children, ...rest } = this.props
        const { edit } = this.state

        
            // view mode
            return (
                <div onClick={this.handleClick.bind(this)}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><label>Title: </label>
                                <br />
                                {this.state.ticket.title}<br />
                            </h5>
                            <h6 className="card-subtitle mb-2 text-muted">Status: <br/> {this.state.ticket.status}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Created on: {this.state.ticket.createdAt}</h6>

                            <p className="card-text">Description: <br/> {this.state.ticket.description}</p>

                            <Link className="card-link" to={`/ticket/edit/${this.state.ticket._id}`}>Update</Link>
                        </div>
                    </div>

                    <div className="comments">
                        <ul>
                            {this.state.comments.map((comment) => {
                                return <li>{comment.contents} by {comment.user.username} on {comment.createdAt}</li>
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