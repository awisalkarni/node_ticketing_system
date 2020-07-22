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
                onClick: () => {}
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

        console.log(`id: ${ticket._id}, status: ${status}`);

        ticket.status = status;

        axios.post('/api/ticket/update/' + ticket._id, ticket, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then(res => {
                window.location = '/ticket';
            })
            .catch(err => console.log(err));

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