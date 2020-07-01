import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('/api/user/login', credentials)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user._id);
                window.location = '/'
            })
            .catch((err) => console.log(err));

        

    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" onChange={this.onChangeUsername} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.onChangePassword} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    <Link to="/register">Sign Up</Link>
                </p>
            </form>
        );
    }
}