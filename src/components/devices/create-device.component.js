import React, { Component } from 'react';
import axios from 'axios';

export default class CreateDevice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            comments: "",
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeComments = this.onChangeComments.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeComments(e) {
        this.setState({
            comments: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const device = {

            name: this.state.name,
            comments: this.state.Comments

        }

        axios.post('http://localhost:8080/device/add', device, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        window.location = '/ticket/add';
        
    }

    render() {
        return (
            <div>
                <h3>Create New Device</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label for="comments">Comments</label>
                        <input type="text" className="form-control" onChange={this.onChangeComments} value={this.state.comments} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Priority" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}