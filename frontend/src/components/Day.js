import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default class Day extends Component {


    state={
        tasks:[]
    }

    componentDidMount(){
        const day = window.location.pathname;
        const day_name = day.substring(5);
        axios.get(`http://localhost:8000/tasks/6245a8ef771854deae0a3c37/${day_name}`).then(res => {
            const tasks = res.data.data;
            console.log(tasks);
            this.setState({tasks: tasks});
        })
    }

    render() {
        const day = window.location.pathname;
        const day_name = day.substring(5);



        return (
            <div className = "container">
                <h1 className='page-header'>Tasks for { day_name }</h1>
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
