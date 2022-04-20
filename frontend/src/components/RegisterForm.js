import React from 'react';
import {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import { Navbar, Nav,  Container, Button } from 'react-bootstrap'
import {
    Link, useNavigate
} from "react-router-dom";

function RegisterForm  (){

    const [fNameReg, setFNameReg] = useState('');
    const [lNameReg, setLNAmeReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [freeTimeReg, setFreeTimeReg] = useState('');

    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')

    const register = (e) => {
        if (fNameReg ==''|| lNameReg == '' || emailReg == '' || usernameReg =='' || passwordReg ==''){
            setAlert("Invalid registration. Please fill out every field.");
            setFontColor('#dc3545')
        }
        else{
        axios.post("http://localhost:8000/register", {
            first_name: fNameReg,
            last_name: lNameReg,
            email: emailReg,
            username: usernameReg, 
            password: passwordReg,
            free_time: freeTimeReg
        }).then((response) => {
            console.log(response.status);
            const resp = response.status;
            if (resp == 200){
                setAlert("Account created successfully!");
                setFontColor("#5aa864");
            }
            else{
                setAlert("Error registering user.");
                setFontColor('#dc3545')
            }
        });
    }
    };

  return (
      <div>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
              <Container>
                            <Navbar.Brand><h3>Chasy</h3></Navbar.Brand>
                </Container>
          </Navbar>
      
      <div className='container'>
          <br></br>
          <div className='white-body'>
          <h1 className='page-header'>Register</h1>
          <div className='login'>
              <br></br>
              <input type="text" name="fname" placeholder='First Name' 
              onChange={(e) => {
                  setFNameReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
                  <input type="text" name="lname" placeholder='Last Name' 
              onChange={(e) => {
                setLNAmeReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
              <input type="text" name="email" placeholder='Email'
              onChange={(e) => {
                  setEmailReg(e.target.value);
              }}>
              </input>
                  <br></br>
                  <br></br>
                  <input type="text" name="username" placeholder="Username" 
                  onChange={(e) => {
                  setUsernameReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPasswordReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="text" name="freetime" placeholder='Free Time'
                  onChange={(e) => {
                  setFreeTimeReg(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <button className='btn btn-primary' onClick={register}>Register</button>
                  <br></br>
                  
                  <Nav.Link as={Link} to={"/"}>Back to Login</Nav.Link>
                  <h5 style={{color: fontColor}}>{alert}</h5>
                  

          </div>
          </div>
      </div>
      </div>
  )
}

export default RegisterForm