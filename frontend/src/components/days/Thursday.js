import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default class Thursday extends Component {


    state={
        tasks:[]
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/tasks/6245a8ef771854deae0a3c37/thursday`).then(res => {
            const tasks = res.data.data;
            console.log(tasks);
            this.setState({tasks: tasks});
        })
    }

    render() {
        return (
            <div className = "container">
                <h1 className='page-header'>Tasks for Thursday</h1>
                {
                    this.state.tasks.map(task => {
                        return(
                            <div className='task'>
                                <h1>{task.title}</h1>
                                <h2>Time Needed: {task.time_needed}</h2>
                                <h2>Class For: {task.class_for}</h2>
                                <h2>Priority: {task.priority}</h2>
                                <button className='btn btn-success'>Update Task</button>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
