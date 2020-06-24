import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Exercise = props => (
    <tr>
        <td>
            {props.exercise.username}
        </td>
        <td>
            {props.exercise.description}
        </td>
        <td>
            {props.exercise.duration}
        </td>
        <td>
            {props.exercise.date.substring(0, 10)}
        </td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>Edit</Link> | <button className="btn btn-default" onClick={() => props.deleteExercise(props.exercise._id)}>Delete</button> 
        </td>
    </tr>
)

export default class ExerciseList extends Component {

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    componentDidMount(){

        axios.get('/api/exercises/')
            .then(res => {
                this.setState({
                    exercises: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteExercise(id){
        axios.delete('/api/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />
        })
    }

    render(){
        return (
            <div>
                <h3>Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}