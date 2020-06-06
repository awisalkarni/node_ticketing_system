import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            company: "",
            password: "",
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            company: this.state.company

        }

        axios.post('http://localhost:8080/user/register', data)
            .then((res) => {
                console.log(res)
                // window.location = '/login'
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" className="form-control" placeholder="Company" onChange={this.onChangeCompany} />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" onChange={this.onChangeUsername}  />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.onChangeEmail}  />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangePassword}  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <Link to="/login">Login</Link>
                </p>
            </form>
        );
    }
}