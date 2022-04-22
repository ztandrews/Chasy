import axios from 'axios'
import React, { Component } from 'react'
import NavbarComp from './NavbarComp'

export default class Account extends Component {

    state = {
        userData: []
    }

    componentDidMount(){
        const user = localStorage.getItem('user_id')
        axios.get(`http://localhost:8000/users/${user}`).then(res =>{
            const currentUser = res.data.data[0];
            this.setState({userData: currentUser});
        })
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
                        <input placeholder='New free time'></input>
                        <br></br>
                        <br></br>
                        <button className='btn btn-primary'>Submit</button>
                        <br></br>
                        <br></br>
                    </center>
                </div>
            </div>
        </div>
    )
  }
}
