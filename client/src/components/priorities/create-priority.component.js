import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePriority extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            color: "",
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        this.setState({
            color: "#FFF"
        })
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeColor(e) {
        this.setState({
            color: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const priority = {

            name: this.state.name,
            color: this.state.color

        }

        axios.post('/api/priority/add', priority, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => {
                window.location = '/ticket/add';
            })
            .catch((err) => console.log(err));
        
        

        
    }

    render() {
        return (
            <div>
                <h3>Create New Priority</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <select className="form-control" onChange={this.onChangeColor} value={this.state.color}>
                            <option value="#FFF">White</option>
                            <option value="#000">Black</option>
                            <option value="#FF0000">Red</option>
                            <option value="#28B463">Green</option>
                            <option value="#2E86C1">Blue</option>
                            <option value="#D35400">Orange</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Priority" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}