import React, { Component } from 'react'
import NavbarComp from './NavbarComp';

export default class AllTasks extends Component {
    render() {
        return (
            <div>
                <NavbarComp/>
            <div className = "container">
                <h1>All Tasks</h1>      
            </div>
            </div>
        )
    }
}
