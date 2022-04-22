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
        notes: '',
        fontColor: 'black',
        alert: ''
    }

    handleSubmit = event => {
        const current_user = localStorage.getItem('user_id')
        if (this.state.time_needed === ''
        || this.state.class_for === '' || this.state.target_date === '' ||
        this.state.notes === '' || this.state.title === ''){
            this.setState({fontColor: '#dc3545'})
            this.setState({alert: "Failed to add task. Please fill out every field."})
        }
        else{
            axios.post('http://127.0.0.1:8000/tasks',{
            user: current_user,
            title: this.state.title,
            time_needed: this.state.time_needed,
            class_for: this.state.class_for,
            priority: 0,
            target_date: this.state.target_date,
            notes: this.state.notes,
            completed: false
        }).then(
            res=>{
                if (res.data.status == "ok"){
                    this.setState({fontColor:'#5aa864'})
                    this.setState({alert: "Task successfully added!"});
                }
                else{
                    this.setState({fontColor:'#dc3545'})
                    this.setState({alert: "Failed to add task. Not enoguh free time on selected day."});
                }
               
            }
        )
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value);
    }


    render() {
        const {title, time_needed, class_for, target_date, notes} = this.state
        return (
            <div>
                <NavbarComp/>
            <div className = "container">
                <br></br>
                <div className='white-body'>
                    <div className='login'>
                <h1 className='page-header'>Add Task</h1>
                    <h3>Title</h3>
                    <input type="text" name = "title" placeholder = "Title of the task" value={title} onChange={this.handleChange}></input>
                    <h3>Time Needed</h3>
                    <input type = "text" name = "time_needed" placeholder = "Time needed in hours" value={time_needed} onChange={this.handleChange}>
                    </input>
                    <h3>Class For</h3>
                    <input type = "text" name="class_for" placeholder = "Class the task is for" value={class_for} onChange={this.handleChange}>
                    </input>
                    <h3>Target Day</h3>
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
                    <button type = "submit" className='btn btn-primary'onClick={this.handleSubmit}> Add Task </button>
                    <br></br>
                    <br></br>
                    <h5 style={{color: this.state.fontColor}}>{this.state.alert}</h5>     
                    <br></br>
           </div>
           </div>
            </div>
            </div>
        )
    }
}