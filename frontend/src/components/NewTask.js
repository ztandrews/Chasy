import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
export default class NewTask extends Component {
    render() {
        return (
            <div className = "container">
                <ho>Please fill the information below to add NewTask.</ho>
                <h1>Title</h1>
                <form>
                    <input placeholder = "Please Enter the title">
                    </input>
                    <h2>Time Needed</h2>
                    <input placeholder = "Please enter time needed">
                    </input>
                    <h3>Class For</h3>
                    <input placeholder = "Please enter class it is for">
                    </input>
                    <h4>Priority Level (0 being low and 10 being highest)</h4>
                    <Dropdown>
                        <Dropdown.Toggle>
                            Priority Level
                        </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey = "1">1</Dropdown.Item>
                                <Dropdown.Item eventKey = "2">2</Dropdown.Item>
                                <Dropdown.Item eventKey = "3">3</Dropdown.Item>
                                <Dropdown.Item eventKey = "4">4</Dropdown.Item>
                                <Dropdown.Item eventKey = "5">5</Dropdown.Item>
                                <Dropdown.Item eventKey = "6">6</Dropdown.Item>
                                <Dropdown.Item eventKey = "7">7</Dropdown.Item>
                                <Dropdown.Item eventKey = "8">8</Dropdown.Item>
                                <Dropdown.Item eventKey = "9">9</Dropdown.Item>
                                <Dropdown.Item eventKey = "10">10</Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown>
                    <h5>Target Date</h5>
                    <input placeholder = "Traget date to finish">
                    </input>
                    <br></br>
                    <br></br>
                    <button type = "submit" className='btn btn-primary'> Add </button>
                </form>    
            </div>
        )
    }
}