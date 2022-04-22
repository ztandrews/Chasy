import React, { Component } from 'react'
import NavbarComp from './NavbarComp'

export default class About extends Component {
  render() {
    return (
      <div>
            <NavbarComp/>
            <div className = "container">
                <br></br>
                <div className='white-body'>
                    
                    <h1 className='page-header'>About</h1>
                    <div className='container'>
                    <h4>Hey, Welcome to Chasy!</h4>
                    <h6>Chasy is a simple and smart time managment application that
                        is built to plan out each day of your week.<br></br>
                        
                        Chasy was built with the student in mind. A common problem for
                        college students is lacking the ability to manage time, which
                        proves to be detremental in a fast place setting like university.
                    </h6>
                    <h4>How to Use</h4>
                    <h6><b>Input Free Time</b> Enter the amount of free time you have on average for each day of the week.</h6>
                    <h6><b>Add a Task</b> Add a new task in the new task page. You will be prompted to enter 
                        some basic information about the task.
                    </h6>
                    <h6><b>View All tasks</b> View all tasks planned to see everything you need to complete
                    for the week.</h6>
                    <h6><b>View Day Plan</b> View the computer generated plan for the current day. Tasks
                    that are due soon have a higher priority</h6>
                    <br></br>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}
