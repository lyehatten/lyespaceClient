import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    margin: '10px'
  },
  title: {
    marginTop: '20px'
  },
  inputs: {
    width: '70%',
    marginLeft: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px'
  },
  half: {
    width: "49%"
  },
  msg: {
    height: '20px',
    margin: '5px',
    display: 'flex',
    justifyContent: 'center',
  },
  btns: {
    display: 'flex',
    width: '30%',
    flexFlow: 'column',
    justifyContent: 'center',
    margin: 'auto'
  }
}

interface propTypes extends WithStyles<typeof styles> {
  updateToken: (newToken: string) => void,
  updateUserId: (newUserId: string) => void,
  updateRole: (newRole: string) => void
}

type authStates = {
  login: boolean,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  message: string
}

class Auth extends React.Component<propTypes, authStates>{
  constructor(props: propTypes){
    super(props);
    this.state = {
      login: true,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: ''
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
    const bodyObj = this.state.login ? { 
      email: this.state.email, 
      password: this.state.password} : 
      { email: this.state.email, 
        password: this.state.password, 
        firstName: this.state.firstName, 
        lastName: this.state.lastName, 
        userType: "musician"}
        
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
      window.location.reload(true)
    } else {
      if (this.state.login) { 
        this.setState({message: data.error}) 
    } else {
        this.setState({message: "Email already in use!"}) 
    }
    }})
    .catch( error => this.setState({message: `Error with connection. Please try again later!`}) )
  }   
    
  render(){
    const {classes} = this.props
  return (
    <div className={classes.root}>
      <Typography variant="h2" align='center' 
      id="header" className={classes.title} > 
      {this.title()} 
      </Typography> 
      <form onSubmit={this.HandleSubmit}>    
      
        {
          this.state.login ? undefined :  
          <div className={classes.inputs}>
            <TextField required 
              className={classes.half}
              label="First Name:"
              id="firstName" 
              value={this.state.firstName} 
              variant="outlined"
              onChange={(event) => {                 
              this.setState({firstName: event.target.value});  
              }}
            /> 
            <TextField required 
              className={classes.half}
              label="Last Name:"
              id="lastName" 
              value={this.state.lastName} 
              variant="outlined"
              onChange={(event) => {                 
              this.setState({lastName: event.target.value});  
              }}
            />
          </div>
        }
        <div className={classes.inputs}>
          <TextField required 
              className={classes.half}
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
              className={classes.half}
              label="Password:"
              variant="outlined"
              type="password" 
              id="password" 
              value={this.state.password} 
              onChange={(event) => {
              this.setState({password: event.target.value});
              }} 
          /> 
        </div>
        <div className={classes.msg}>
          <Typography variant="subtitle1">{this.state.message}</Typography> 
        </div>
        <div className={classes.btns} > 
        { 
          this.state.login ? 
          <Button variant="contained" color="secondary" id="Submit" type="submit">
            Login!
          </Button> : this.state.password.length < 5 ? 
          <Typography variant="subtitle1" align="center">
            Password must be minimum 5 characters in length
          </Typography> : 
          <Button variant="contained" color="secondary" type="submit" id="Submit">
            Sign Up!
          </Button> 
        }
        { 
          this.state.login ? 
          <Typography className={classes.title} variant="subtitle1" align="center">
            Don't have an account?
          </Typography> : 
          <Typography className={classes.title} variant="subtitle1" align="center">
            Already have an account?
          </Typography>
        }
        <Button id="Login" 
        onClick={this.loginToggle} variant="outlined" color="primary">
          { this.state.login ? "Switch to Sign Up" : "Switch to Login"}  
        </Button>
        </div>
      </form>
    </div>
  )}
}


export default withStyles(styles)(Auth);