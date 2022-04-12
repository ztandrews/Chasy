import axios from 'axios'
import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import NavbarComp from './NavbarComp'


export default class NewTask extends Component {

    state = {
        title: '',
        day: '',
        time_needed: '',
        class_for: '',
        priority: 0,
        target_date: '',
        notes: ''
    }

    handleSubmit = event => {
        const current_user = localStorage.getItem('user_id')
        axios.post('http://127.0.0.1:8000/tasks',{
            user: current_user,
            title: this.state.title,
            day: this.state.day,
            time_needed: this.state.time_needed,
            class_for: this.state.class_for,
            priority: this.state.priority,
            target_date: this.state.target_date,
            notes: this.state.notes,
            completed: false
        }).then(
            res=>{
                console.log(res.response);
                console.log(res.data);
            }
        )
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value);
    }


    render() {
        const {title, day, time_needed, class_for, priority, target_date, notes} = this.state
        return (
            <div>
                <NavbarComp/>
            <div className = "container">
                <h2>Add Task</h2>
                <form onSubmit = {this.handleSubmit}>
                    <h3>Title</h3>
                    <input type="text" name = "title" placeholder = "Title of the task" value={title} onChange={this.handleChange}></input>
                    <h3>Time Needed</h3>
                    <input type = "text" name = "time_needed" placeholder = "Time needed in hours" value={time_needed} onChange={this.handleChange}>
                    </input>
                    <h3>Class For</h3>
                    <input type = "text" name="class_for" placeholder = "Class the task is for" value={class_for} onChange={this.handleChange}>
                    </input>
                    <h3>Priority Level (0 being low and 10 being highest)</h3>
                    <select name = "priority" value={priority} onChange={this.handleChange}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                    <h3>Day to do Task</h3>
                    <select name = "day" value={day} onChange={this.handleChange}>
                        <option value={"sunday"}>Sunday</option>
                        <option value={"monday"}>Monday</option>
                        <option value={"tuesday"}>Tuesday</option>
                        <option value={"wednesday"}>Wednesday</option>
                        <option value={"thursday"}>Thursday</option>
                        <option value={"friday"}>Friday</option>
                        <option value={"saturday"}>Saturday</option>
                    </select>
                    <h3>Target Day (Day to have task completed by)</h3>
                    <select name = "target_date" value={target_date} onChange={this.handleChange}>
                        <option value={"sunday"}>Sunday</option>
                        <option value={"monday"}>Monday</option>
                        <option value={"tuesday"}>Tuesday</option>
                        <option value={"wednesday"}>Wednesday</option>
                        <option value={"thursday"}>Thursday</option>
                        <option value={"friday"}>Friday</option>
                        <option value={"saturday"}>Saturday</option>
                    </select>
                    <h3>Notes</h3>
                    <input type = "text" name="notes" placeholder = "Additional notes" value={notes} onChange={this.handleChange}>
                    </input>
                    <br></br>
                    <br></br>
                    <button type = "submit" className='btn btn-primary'> Add Task </button>
                </form>    
            </div>
            </div>
        )
    }
}