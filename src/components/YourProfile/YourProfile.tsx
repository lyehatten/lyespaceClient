import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Posts from './Posts/Posts';
import InfoEdit from './InfoEdit';
import InfoDisplay from './InfoDisplay';
import InfoCreate from './InfoCreate';
import { Post, ProfileData } from '../../types';

const styles = {
  root: {
    marginTop: '30px',
  },
  btnTwo: {
    marginLeft: '15px',
  },
  createStuff: {
    display: 'flex',
    flexFlow: 'column wrap',
    alignContent: 'center',
  },
};

interface Props extends WithStyles<typeof styles> {
  userId: string | null,
  logout: Function
}

function YourProfile(props: Props) {
  const { classes, logout, userId } = props;

  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [editView, setEditView] = useState<boolean>(false);

  async function getUserInfo() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/userInfo/${userId}`);
      const data = await res.json();
      setFirstName(data.firstname);
      setLastName(data.lastName);
      setProfileData(data.profile);
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserInfo();
  });

  async function refresh(id: string) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/userInfo/${id}`);
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/removeSelf`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      if (data) {
        setDeleteState(false);
        logout();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <Typography display="inline" variant="h2">
        {firstName}
        {' '}
        {lastName}
      </Typography>

      {
        profileData && editView && (
        <InfoEdit editToggle={() => setEditView(!editView)} profileData={profileData} />
        )

      }
      {
        !profileData && !editView && (
        <div>
          <Divider />
          <div className={classes.createStuff}>
            <br />
            <Typography variant="h5">You have no profile data! Add some?</Typography>
            <br />
            <Button
              className={classes.btnTwo}
              variant="contained"
              color="secondary"
              onClick={() => setEditView(true)}
            >
              Create Profile
            </Button>
            <br />
            <br />
          </div>
        </div>
        )
      }

      {!profileData && editView && <InfoCreate editToggle={() => setEditView(!editView)} />}

      {
        profileData && !editView && (
        <InfoDisplay editToggle={() => setEditView(!editView)} profileData={profileData} />
        )
      }
      <Button
        variant="outlined"
        color="secondary"
        className={classes.btnTwo}
        onClick={() => setDeleteState(true)}
      >
        Delete Account
      </Button>
      <Dialog
        open={deleteState}
        onClose={() => setDeleteState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText align="center" id="alert-dialog-description">
            Are you sure you want to delete your account?
            <br />
            You will not be able to log back in and will need to sign up again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteState(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete} color="secondary" autoFocus>
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <br />
      <Divider />
      <Posts posts={posts} refresh={() => refresh} userId={userId} />
    </div>
  );
}

export default withStyles(styles)(YourProfile);
