import React, { Component } from 'react';
import axios from 'axios';

class EditLocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            zone: "",
            zones: [],
            id: ""
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeZone = this.onChangeZone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state.token = localStorage.getItem('token');
        this.state.id = props.match.params.id;
    }

    componentDidMount() {

        axios.get('/api/location/' + this.state.id, { headers: { 'Authorization': `Bearer ${this.state.token}` }})
            .then(res => {
                this.setState({
                    name: res.data.name,
                    zone: res.data.zone
                })
            })
            .catch(err => {

                console.log(err)

            })

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

        axios.post('/api/location/update/' + this.state.id, priority, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
            .then((res) => window.location = '/location')
            .catch((err) => console.log(err));
        
        

        
    }

    render() {
        return (
            <div>
                <h3>Edit Location</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={this.onChangeName} value={this.state.name} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Zone</label>
                        <select className="form-control" onChange={this.onChangeZone} value={this.state.zone}>
                            { this.state.zones.map((zone) => {
                                return <option key={zone._id} value={zone._id} >{ zone.name }</option>
                            }) }
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>

                </form>
            </div>
        )
    }
}

export default EditLocation;