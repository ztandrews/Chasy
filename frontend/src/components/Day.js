import React, { Component } from 'react'

export default class Day extends Component {
    render() {
        return (
            <div className = "container">
                <h1 className='page-header'>Tasks for Monday</h1>
                <div className='task'>
                    <h1>Study for Exam</h1>
                    <h3>Time Needed: 3 Hours</h3>
                    <h3>Priority: 10</h3>
                    <h3>Target Date: Wednesday</h3>
                    <h3>Status: Not Completed</h3>
                    <button className='btn btn-success'>Update Status</button>
                </div>
                <br></br>
                <div className='task'>
                    <h1>Work on Senior Project</h1>
                    <h3>Time Needed: 1 Hour</h3>
                    <h3>Priority: 7</h3>
                    <h3>Target Date: Friday</h3>
                    <h3>Status: Not Completed</h3>
                    <button className='btn btn-success'>Update Status</button>
                </div>
                <br></br>
                <div className='task'>
                    <h1>Finish Algorithms HW</h1>
                    <h3>Time Needed: 2 Hours</h3>
                    <h3>Priority: 5</h3>
                    <h3>Target Date: Saturday</h3>
                    <h3>Status: Not Completed</h3>
                    <button className='btn btn-success'>Update Status</button>
                </div>
            </div>
        )
    }
}
