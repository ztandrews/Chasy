import React, {useState} from "react"
//route = switch in react 7
import { useNavigate } from "react-router-dom";
//navigate = history in react 7

function LoginForm({Login,error}) {
  
    const guy = localStorage.getItem('user_id');
    console.log(guy);
    let nav = useNavigate();
//local detailes   
    const [details, setDetails]=useState({username: "",password: ""});
//handles submitions
    const submitHandler = e => {
        e.preventDefault();
        //Login(details);
        Login2();
    }

    const Login2 = () =>{
        const d = new Date();
        let day = d.getDay();
        const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
        let currentDay = weekdays[day];
        localStorage.setItem('user_id','6245a8ef771854deae0a3c37')
        nav("/"+currentDay)
    }
    return (
        <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Chasy Login</h2>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <br></br>
                        <input type="text" name="username" id="username" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                    </div>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <br></br>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <br></br>
                    <input type="submit" value="Login" />
                    <br></br>
                    <br></br>
                    <button onClick={() => {
                        nav("/register");
                    }
                
                }
                    >Register</button>
                </div>
            </form>
        );
    }
 export default LoginForm;