import axios from 'axios';
import React from 'react';
import {useRef, useState, useEffect} from 'react';


import { Navbar, Nav,  Container, Button } from 'react-bootstrap'

import {
    Link, useNavigate
} from "react-router-dom";

function LoginForm  (){

    const navigate = useNavigate();
    const [username1, setUsername] = useState('')
    const [password1, setPassword] = useState('')
        
    const [loginStatus, setLoginStatus] = useState('')

    const [alert, setAlert] = useState('');
    const [fontColor, setFontColor] = useState('black')

    const login = () =>{
        const username = username1;
        const password = password1;
        if (username == '' || password == ''){
            setAlert("Invalid login credentials.")
            setFontColor('#dc3545')
        }
        else{
        axios.post(`http://localhost:8000/login?username=${username}&password=${password}`, {
        }).then((response) => {
            const status = (response.data.status);
            if (status != "ok"){
                setAlert("Invalid username or password.")
                setFontColor('#dc3545')
            }
            else{
            //console.log(response.data.data[0].id);
            setLoginStatus(response.data.data[0].id);
            localStorage.setItem('user_id', response.data.data[0].id);
            console.log(localStorage.getItem('user_id'));
            const d = new Date();
            let day = d.getDay();
            const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
            let currentDay = weekdays[day];
            navigate("/"+currentDay);
            }
        })
        }
    }



  return (
      <div>
          <Navbar collapseOnSelect expand="lg" variant="light" bg="light">
              <Container>
                            <Navbar.Brand><h3>Chasy</h3></Navbar.Brand>
                </Container>
          </Navbar>

      <div className='container'>
          <h1 className='page-header'>Login</h1>
          <div className='login'>
              <br></br>
                  <input type="text" name="username" placeholder="Username"
                  onChange={(e) => {
                  setUsername(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <input type="password" name="password" placeholder='Password'
                  onChange={(e) => {
                  setPassword(e.target.value);
              }}
                  ></input>
                  <br></br>
                  <br></br>
                  <button className='btn btn-primary' onClick={login}>Login</button>
                  <br></br>
                  <br></br>
                  <p>Don't hace an account?
                  <Nav.Link as={Link} to={"/register"}>Register</Nav.Link>
                  <h5 style={{color: fontColor}}>{alert}</h5>
                  </p>

          </div>
          
      </div>
      </div>
  )
}

export default LoginForm