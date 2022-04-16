import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import { Modal, Button, Card, CardGroup, ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';
import NavbarComp from '../NavbarComp';
import * as Icon from 'react-bootstrap-icons';
import {SiGoogleclassroom} from "react-icons/si";
import {FiTarget} from 'react-icons/fi';
import { MdPriorityHigh } from "react-icons/md";
import {CgNotes} from "react-icons/cg";

export default class Saturday extends Component {


    state={
        tasks:[],
        show: false,
        setShow: false,
        currentTaskId: '',
        currentTaskTitle: '',
        currentTaskTimeNeeded: '',
        currentTaskClassFor: '',
        currentTaskCompleted: false,
        currentTaskPrioirty: '',
        currentTaskTargetDate: '',
        currentTaskDay: '',
        currentTaskNotes: '',
        showChange: false,
        alert: '',
        new_day: '',
        color: 'black'
    }

    componentDidMount(){
        const user = localStorage.getItem('user_id')
        console.log(user)
        axios.get(`http://localhost:8000/tasks/${user}/saturday`).then(res => {
            const tasks = res.data.data;
            console.log(tasks);
            this.setState({tasks: tasks});
        })
    }
    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value);
    }

    render() {
        
        const handleClose = () =>{
            this.setState({show: false});
        }
        const handleClose2 = () =>{
            this.setState({show2: false});
            window.location.reload();
        }

        const openModal = (_id, task_title, task_class, task_time_needed, task_completed, task_priority, task_notes, task_day, task_target_date) =>{
            this.setState({currentTaskId: _id});
            this.setState({currentTaskTitle: task_title});
            this.setState({currentTaskClassFor: task_class});
            this.setState({currentTaskTimeNeeded: task_time_needed});
            this.setState({currentTaskCompleted: task_completed});
            this.setState({currentTaskPrioirty: task_priority});
            this.setState({currentTaskNotes: task_notes});
            this.setState({currentTaskDay: task_day});
            this.setState({currentTaskTargetDate: task_target_date});
            this.setState({show: true});
        }

        const completeTask = (_id) => {
            axios.put(`http://127.0.0.1:8000/tasks/${_id}/true`).then(res =>{
                console.log(res);
                this.setState({show: false});
                window.location.reload();
            })
        }

        const deleteTask = (_id) => {
            axios.delete(`http://127.0.0.1:8000/tasks/${_id}`).then(res => {
                this.setState({show: false});
                window.location.reload();
            })
        }

        const moveTask = (_id, newDay) => {
            axios.put(`http://127.0.0.1:8000/change/${_id}/${newDay}`).then(res => {
                console.log(res.data.data);
                if (res.data.status === "ok"){
                    this.setState({alert: "Task moved successfully!"});
                    this.setState({color: "#5aa864"});
                }
                else{
                    this.setState({alert: "Unable to move task. Not enough free time on selected day."});
                    this.setState({color: '#dc3545'});
                }
            })
        } 

        const openChangeModal = () =>{
            this.setState({show: false});
            this.setState({show2: true});
        }
        return (
            <div>
                <NavbarComp/>
            <div className = "container">
                <h1 className='page-header'>Tasks for Saturday</h1>
                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.currentTaskTitle}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='row'>
                            <div className='col'>
                                <div className='info'>
                                    <h1><SiGoogleclassroom/></h1>
                                    <h4>Class For</h4>
                                    <h6>{this.state.currentTaskClassFor}</h6>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='info'>
                                    <h1><Icon.AlarmFill/></h1>
                                    <h4>Time Needed</h4>
                                    <h6>{this.state.currentTaskTimeNeeded} Hours</h6>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='info'>
                                    <h1><Icon.CalendarFill/></h1>
                                    <h4>Day</h4>
                                    <h6>{this.state.currentTaskDay}</h6>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='info'>
                                    <h1><FiTarget/></h1>
                                    <h4>Target Day</h4>
                                    <h6>{this.state.currentTaskTargetDate}</h6>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <div className='info'>
                                    <h1><MdPriorityHigh/></h1>
                                    <h4>Priority</h4>
                                    <h6>{this.state.currentTaskPrioirty}/10</h6>
                                </div>
                            </div>
                            <div className='col'>
                                <div className='info'>
                                    <h1><CgNotes/></h1>
                                    <h4>Notes</h4>
                                    <h6>{this.state.currentTaskNotes}</h6>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                        <Button className='btn btn-success' onClick ={() => completeTask(this.state.currentTaskId)}>Complete Task</Button>
                     </div>
                     <br></br>
                      <div className='row'>
                        <Button className='btn btn-warning' onClick ={() => openChangeModal()}>Move Task to Another Day</Button>
                 </div> 
                 <br></br>
                 <div className='row'>
                        <Button className='btn btn-danger' onClick = {() => deleteTask(this.state.currentTaskId)}>Delete Task</Button>
                     </div>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Move Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <h6>Current Day: {this.state.currentTaskDay}</h6>
                            <h6>Choose a New Day:</h6>
                            <select name = "new_day" value={this.state.new_day} onChange={this.handleChange}>
                                <option value={"sunday"}>Sunday</option>
                                <option value={"monday"}>Monday</option>
                                <option value={"tuesday"}>Tuesday</option>
                                <option value={"wednesday"}>Wednesday</option>
                                <option value={"thursday"}>Thursday</option>
                                <option value={"friday"}>Friday</option>
                                <option value={"saturday"}>Saturday</option>
                            </select>
                            <br></br>
                            <br></br>
                            <Button className='btn btn-success' onClick={() => moveTask(this.state.currentTaskId, this.state.new_day)}>Move Task</Button>
                            <br></br>
                            <br></br>
                            <h6 style={{color: this.state.color}}>{this.state.alert}</h6>  
                        </div>
                    </Modal.Body>
                </Modal>
                {
                    this.state.tasks.map(task => {
                        return(
                            <div>
                            <div className='task' key={task.id}>
                                <div className='col'>
                                <h2>{task.title}</h2>
                                <h6>{task.class_for}</h6>
                                <h6>{task.time_needed} Hours</h6>
                                </div>
                                <Button className='icon' variant="btn bg-transparent" onClick={() => openModal(task.id, task.title, task.class_for, task.time_needed, task.completed.toString(), task.priority, task.notes, task.day, task.target_date)}>
                                    <Icon.Eye size="3x"/>
                                </Button>
                            </div>
                            <br></br>
                            </div>
                
                        );
                    })
                }
              
            </div>
            </div>
        )
    }
}
