import React from 'react';
import axios from 'axios';
const { Component } = require("react");

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ticket_count: 0,
            device_count: 0,
            user_count: 0,
            token: ""
        }

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        axios.get('/api/dashboard', { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => {
                this.setState({
                    ticket_count: res.data.ticket_count,
                    device_count: res.data.device_count,
                    user_count: res.data.user_count
                });
            })

    }

    render() {
        return <div>

            <div className="row mb-3">

                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card bg-success text-white h-100">
                        <div className="card-body bg-success">
                            <div className="rotate">
                                <i className="fa fa-user fa-4x"></i>
                            </div>
                            <a href="/ticket" style={{color: 'white'}}>
                                <h6 className="text-uppercase">Tickets</h6>
                                <h1 className="display-4">{this.state.ticket_count}</h1>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-danger h-100">
                        <div className="card-body bg-danger">
                            <div className="rotate">
                                <i className="fa fa-list fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Device</h6>
                            <h1 className="display-4">{this.state.device_count}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-info h-100">
                        <div className="card-body bg-info">
                            <div className="rotate">
                                <i className="fa fa-twitter fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">User</h6>
                            <h1 className="display-4">{this.state.user_count}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 py-2">
                    <div className="card text-white bg-warning h-100">
                        <div className="card-body">
                            <div className="rotate">
                                <i className="fa fa-share fa-4x"></i>
                            </div>
                            <h6 className="text-uppercase">Shares</h6>
                            <h1 className="display-4">36</h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default Dashboard;