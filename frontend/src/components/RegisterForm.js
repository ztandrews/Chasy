import React, {Component} from 'react'

class RegisterForm extends Component {
//local detailes   
constructor(props) {
  super(props)

  this.state = {
     new_userName: '',
     new_password:''
  }
}
    render(){
      return  <form>
            <div>
            <h2>Welcome to Chasy Registration!</h2>
                <label>Please enter a username</label>
                <input type ='text' value={this.state.new_username}/>
                <br></br>
                <label>Please enter a password</label>
                <input type ='text' value ={this.state.new_password} />
            </div>
        </form>
    }
    }
 export default RegisterForm