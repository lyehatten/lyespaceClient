import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

const styles = {
  page: {
    margin: '10px'
  },
  title: {
    padding: '10%'
  },
  folks: {
    marginLeft: "50%"
  },
  links: {
    color: 'inherit',
    textDecoration: "none",
  },
  btnOne: {
    marginLeft: '17px'
  }
}

interface Props extends WithStyles<typeof styles> {

}

class HomePage extends React.Component<Props> {


  render(){
  const {classes} = this.props
  return(
    <div className={classes.page}>
      <Typography align='center' variant="h2" gutterBottom={true} className={classes.title}>Welcome to LyeSpace.</Typography>
      <hr/>
      <Typography variant="h3" gutterBottom={true} display="inline">I'm Levi </Typography>
      <Typography display="inline" gutterBottom={true} variant="subtitle2"> (or lye).</Typography>
      <Typography variant="h6" align="center" color="textSecondary" gutterBottom={true} >Call me whatever.</Typography>
      <Typography variant="h5" gutterBottom={true} align="right" >I'm always looking for 
        <br/>folks to make music with.
      </Typography>
      <Typography align="center" variant="h4" color="primary">I made LyeSpace to find pals to make some cool noise with! </Typography>
      <Typography>
        Here at LyeSpace you can make a profile with information about your music, 
        links to your social media, and embed examples of the stuff you have created!
      </Typography>
      <h3 >Interested in checking <br/><span className={classes.page}></span>out my profile?</h3>
      <Link  className={classes.links} to="/artistview"> <Button className={classes.btnOne} variant="contained" color="primary">My Profile</Button> </Link>
      <h3>If you like what you see go ahead and Sign up and make a profile for yourself!</h3>
      <Link className={classes.links} to="/login"><Button variant="contained" color="secondary">Sign up</Button></Link>
      <h3>I look forward to checking out your stuff!</h3>
      <h3>Let's make music together!</h3>
    </div>
  )}
}


export default withStyles(styles)(HomePage);