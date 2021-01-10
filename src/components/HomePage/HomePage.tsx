import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const HomePage: React.FunctionComponent = () => {
  return(
    <div>
      <h1>Welcome to LyeSpace.</h1>
      <h2>I'm Levi.</h2>
      <h5>(or lye)</h5>
      <h4>Call me whatever.</h4>
      <h2>I'm always looking for folks to make music with.</h2>
      <h3>Interested in checking out my profile?</h3>
      <Link to="/artistview"> <Button>My Profile</Button> </Link>
      <h3>If you like what you see go ahead and Sign up and make a profile for yourself!</h3>
      <Link to="/login"><Button>Sign up</Button></Link>
      <h3>I look forward to checking out your stuff!</h3>
      <h3>Let's make music together!</h3>
    </div>
  )
}


export default HomePage;