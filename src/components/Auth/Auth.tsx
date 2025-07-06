import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: '10px',
  },
  title: {
    marginTop: '20px',
  },
  inputs: {
    width: '70%',
    marginLeft: '15%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  half: {
    width: '49%',
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
    margin: 'auto',
  },
};

interface PropTypes extends WithStyles<typeof styles> {
  updateToken: (newToken: string) => void,
  updateUserId: (newUserId: string) => void,
  updateRole: (newRole: string) => void
}

function Auth(props: PropTypes) {
  const {
    classes, updateToken, updateRole, updateUserId,
  } = props;

  const [login, setLogin] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  function title(): string {
    return login ? 'Login' : 'Sign Up';
  }

  function loginToggle(): void {
    setLogin(!login);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setMessage('');
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const url = login ? `${process.env.REACT_APP_API_URL}/user/login` : `${process.env.REACT_APP_API_URL}/user/register`;
    const bodyObj = login ? {
      email,
      password,
    }
      : {
        email,
        password,
        firstName,
        lastName,
        userType: 'musician',
      };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyObj),
      });
      const data = await res.json();
      if (data.sessionToken) {
        updateToken(data.sessionToken);
        updateUserId(data.user.id);
        updateRole(data.user.userType);
        setMessage(data.message);
        window.location.reload();
      } else if (login) {
        setMessage(data.error);
      } else {
        setMessage('Email already in use!');
      }
    } catch (error) {
      setMessage('Error with connection. Please try again later');
    }
  }

  return (
    <div className={classes.root}>
      <Typography
        variant="h2"
        align="center"
        id="header"
        className={classes.title}
      >
        {title()}
      </Typography>
      <form onSubmit={handleSubmit}>

        {
          login ? undefined
            : (
              <div className={classes.inputs}>
                <TextField
                  required
                  className={classes.half}
                  label="First Name:"
                  id="firstName"
                  value={firstName}
                  variant="outlined"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <TextField
                  required
                  className={classes.half}
                  label="Last Name:"
                  id="lastName"
                  value={lastName}
                  variant="outlined"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
              </div>
            )
        }
        <div className={classes.inputs}>
          <TextField
            required
            className={classes.half}
            type="email"
            label="Email:"
            id="email"
            value={email}
            placeholder="email@email.com"
            variant="outlined"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            required
            className={classes.half}
            label="Password:"
            variant="outlined"
            type="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div className={classes.msg}>
          <Typography variant="subtitle1">{message}</Typography>
        </div>
        <div className={classes.btns}>
          {!login && password.length < 5 && (
          <Typography variant="subtitle1" align="center">
            Password must be minimum 5 characters in length
          </Typography>
          )}

          <Button variant="contained" color="secondary" type="submit" id="Submit" disabled={!login && password.length < 5}>
            {login ? 'Login' : 'Sign Up'}
          </Button>

          {
          login
            ? (
              <Typography className={classes.title} variant="subtitle1" align="center">
                Don&lsquo;t have an account?
              </Typography>
            )
            : (
              <Typography className={classes.title} variant="subtitle1" align="center">
                Already have an account?
              </Typography>
            )
        }
          <Button
            id="Login"
            onClick={() => loginToggle()}
            variant="outlined"
            color="primary"
          >
            { login ? 'Switch to Sign Up' : 'Switch to Login'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default withStyles(styles)(Auth);
