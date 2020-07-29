import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ticket.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { Ticket } from './ticket.component'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class TicketsList extends Component {

    constructor(props) {
        super(props);

        this.deleteTicket = this.deleteTicket.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.handleDateSelect = this.handleDateSelect.bind(this);
        this.showConfirmDeleteDialog = this.showConfirmDeleteDialog.bind(this);

        this.state = {
            tickets: [],
            token: "",
            selectionRange: {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            },
            filteredStatus: "",
            filteredPriority: ""
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

    showConfirmDeleteDialog(id) {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        // console.log(this)
                        console.log(this.deleteTicket(id))
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    deleteTicket(id) {

        console.log(id)

        axios.delete('/api/ticket/' + id, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                // window.location = '/ticket';
            });

        this.setState({
            tickets: this.state.tickets.filter(el => el._id !== id)
        })
    }

    changeStatus(ticket, status) {

        ticket.status = status;

        axios.post('/api/ticket/update/' + ticket._id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location = '/ticket';
            })
            .catch(err => console.log(err));

    }

    filter({ status, priority }) {

        axios.get('/api/ticket/filter', {
            params: {
                status: status,
                priority: priority
            }
        }, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                this.setState({
                    tickets: res.data,
                    filteredStatus: status,
                    filteredPriority: priority
                })
            })
            .catch(err => console.log(err))

    }

    changePriority(ticket, priority) {
        console.log(`id: ${ticket._id}, status: ${priority}`);

        ticket.priority = priority;

        axios.post('/api/ticket/update/' + ticket._id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location = '/ticket';
            })
            .catch(err => console.log(err));
    }

    handleDateSelect(ranges) {
        console.log(ranges);
        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }

    ticketList() {
        return this.state.tickets.map(currentTicket => {
            return <Ticket tickets={currentTicket} deleteTicket={this.showConfirmDeleteDialog} key={currentTicket._id} changeStatus={this.changeStatus} changePriority={this.changePriority} />
        })
    }

    render() {


        return (
            <div>
                <h3>Tickets <Link className="btn btn-primary" to="/ticket/add">Add</Link></h3>


                <div className="row" style={ {marginBottom: 20 }}>
                    <div className="col-2">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Status {this.state.filteredStatus}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: "" }) }}>All</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: 'open' }) }}>Open</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: 'on_hold' }) }}>On Hold</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: 'in_progress' }) }}>In Progress</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: 'in_review' }) }}>In Review</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ status: 'complete' }) }}>Complete</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Priority {this.state.filteredPriority}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <button className={`dropdown-item`} onClick={() => { this.filter({ priority: '' }) }}>All</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ priority: 'low' }) }}>Low</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ priority: 'medium' }) }}>Medium</button>
                                <button className={`dropdown-item`} onClick={() => { this.filter({ priority: 'high' }) }}>High</button>
                            </div>
                        </div>
                    </div>
                </div>





                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Reported by</th>
                            <th>Device</th>
                            <th>Status</th>
                            <th>Date</th>
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