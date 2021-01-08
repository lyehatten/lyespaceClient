import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type propTypes = {
  updateToken: Function,
  updateUserId: Function,
  updateRole: Function
}

type authStates = {
  updateToken: Function,
  updateUserId: Function,
  updateRole: Function,
  login: boolean,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  message: string
}

class Auth extends React.Component<propTypes, authStates>{
  constructor(props: authStates){
    super(props);
    this.state = {
      login: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: '',
      updateRole: this.props.updateRole,
      updateToken: this.props.updateToken,
      updateUserId: this.props.updateUserId
    }
  }

  title = () => {
    return this.state.login ? 'Login' : 'Sign Up';    
  }

  loginToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.setState({
      login: !this.state.login,
      firstName: '',
      lastName: '',
      email: "",
      password: "",
      message: ""
    })
  }
  
  HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
        
    const url = this.state.login ? `https://lyespace-server.herokuapp.com/user/login` : `https://lyespace-server.herokuapp.com/user/register`;  
    const bodyObj = this.state.login ? { email: this.state.email, password: this.state.password} : { email: this.state.email, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, userType: "musician"}
        
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res.json())
    .then(data => {
      if(data.sessionToken){
      this.props.updateToken(data.sessionToken) 
      this.props.updateUserId(data.user.id)
      this.props.updateRole(data.user.userType)
      this.setState({message: data.message})
    } else {
      if (this.state.login) { 
        this.setState({message: data.error}) 
    } else {
        this.setState({message: "Email already in use!"}) 
    }
    }})
    .then(data => window.location.reload(true))
    .catch( error => this.setState({message: `Error with connection. Please try again later!`}) )
  }   
    
  render(){
  return (   
    <div>
      <h1 id="header"> {this.title()} </h1> 
      <form onSubmit={this.HandleSubmit}>    
        {this.state.login ? undefined :  <>
          <TextField required 
            label="First Name:"
            id="firstName" 
            value={this.state.firstName} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({firstName: event.target.value});  
            }}
          /> <br/> <br/>
          <TextField required 
            label="Last Name:"
            id="lastName" 
            value={this.state.lastName} 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({lastName: event.target.value});  
            }}
          />
          <br/> <br/>
        </>
        }
        <TextField required 
            type="email" 
            label="Email:"
            id="email" 
            value={this.state.email} 
            placeholder="email@email.com" 
            variant="outlined"
            onChange={(event) => {                 
            this.setState({email: event.target.value});  
            }} 
        /> 
        <br/>
        <br/>   
        <TextField required
            label="Password:"
            variant="outlined"
            type="password" 
            id="password" 
            value={this.state.password} 
            onChange={(event) => {
            this.setState({password: event.target.value});
            }} 
        /> 
        <div className="buttons">
        <p>{this.state.message}</p> 
        { this.state.login ? <Button variant="outlined" color="inherit" id="Submit" type="submit">Login!</Button> : this.state.password.length < 5 ? <p>Password must be minimum 5 characters in length</p> : <Button variant="outlined" color="inherit" type="submit" id="Submit">Sign Up!</Button> }
        { this.state.login ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
        <Button id="Login" onClick={this.loginToggle} variant="outlined" color="inherit">  { this.state.login ? "Switch to Sign Up" : "Switch to Login"}  </Button>
        </div>
      </form>
    </div>
  )}
}


export default Auth;