import React, { Component } from 'react';
import axios from 'axios';

class CreateLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            zone: "",
            zones: []
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeZone = this.onChangeZone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
    }

    componentDidMount() {

        axios.get('/api/zone', {headers: { 'Authorization': `Bearer ${this.state.token}` }})
        .then((res) => {
            this.setState({
                zones: res.data,
                zone: res.data.length > 0 ? res.data[0]._id : ""
            })
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeZone(e) {
        this.setState({
            zone: e.target.value
        })
    }

    

    onSubmit(e) {
        e.preventDefault();

        const priority = {

            name: this.state.name,
            zone: this.state.zone

        }

        axios.post('/api/location/add', priority, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        
        window.location = '/location';

        
    }

    render() {
        return (
            <div>
                <h3>Create New Location</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label for="name">Zone</label>
                        <select className="form-control" onChange={this.onChangeZone} value={this.state.zone}>
                            { this.state.zones.map((zone) => {
                                return <option key={zone._id} value={zone._id} >{ zone.name }</option>
                            }) }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Location" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default CreateLocation;