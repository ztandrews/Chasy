import axios from 'axios'
import React, { Component } from 'react'
import NavbarComp from './NavbarComp'

export default class Account extends Component {

    state = {
        userData: [],
        newFreeTime: '',
        alertMessage: '',
        fontColor: ''
    }

    componentDidMount(){
        const user = localStorage.getItem('user_id')
        axios.get(`http://localhost:8000/users/${user}`).then(res =>{
            const currentUser = res.data.data[0];
            this.setState({userData: currentUser});
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        console.log(e.target.value);
    }

    handleSubmit = event => {
        console.log(this.state.newFreeTime)
        const user = localStorage.getItem('user_id')
        if (this.state.newFreeTime === ''){
            this.setState({fontColor: '#dc3545'})
            this.setState({alertMessage: "Failed to update free time. Please fill out the field."})
        }else{
            axios.put(`http://localhost:8000/users/${user}/${this.state.newFreeTime}`).then(res =>{
                if (res.data.status == "ok"){
                    this.setState({fontColor:'#5aa864'})
                    this.setState({alertMessage: "Free time successfully updated!"});
                }
                else{
                    this.setState({fontColor:'#dc3545'})
                    this.setState({alertMessage: "Failed to update free time."});
                }
            })
        }
    }

  render() {
    return (
            <div>
            <NavbarComp/>
            <div className = "container">
                <br></br>
                <div className='white-body'>
                    <h1 className='page-header'>Hello, {this.state.userData.first_name}</h1>
                    <center>
                        <h4>Current free time: {this.state.userData.free_time} Hours</h4>
                        <br></br>
                        <h4>Update free time</h4>
                        <input name="newFreeTime" placeholder='New free time' value={this.state.newFreeTime} onChange={this.handleChange}></input>
                        <br></br>
                        <br></br>
                        <button className='btn btn-primary' onClick={() => this.handleSubmit()}>Submit</button>
                        <br></br>
                        <br></br>
                        <h4 style={{color: this.state.fontColor}}>{this.state.alertMessage}</h4>
                    </center>
                </div>
            </div>
        </div>
    )
  }
}
