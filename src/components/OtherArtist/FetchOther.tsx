import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ViewPosts from './ViewPosts';
import ViewOther from './ViewOther';
import { Post, ProfileData } from '../../types';
import useQuery from '../../hooks';

const styles = {
  root: {
    marginTop: '30px',
  },
  btnTwo: {
    marginLeft: '15px',
  },
};

interface Props extends WithStyles<typeof styles> {
  artistView: string | null,
  userRole: string | null,
}

function FetchOther(props: Props) {
  const query = useQuery();
  const {
    classes, artistView, userRole,
  } = props;

  const [firstName, setFirstName] = useState<string>('Currently');
  const [lastName, setLastName] = useState<string>('Loading...');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [role, setRole] = useState<string>('');
  const [posts, setPosts] = useState<Post[] | null>(null);

  async function fetchUserInfo() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/userInfo/${query.get('id')}`);
      const data = await res.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setProfileData(data.profile);
      setRole(data.role);
      setPosts(data.posts);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  async function promoteUser() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/role/${query}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      if (res) {
        fetchUserInfo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function adminRemovePost(id: string) {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/adminRemove/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      if (res) {
        fetchUserInfo();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removeAdmin() {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/removeAdmin/${artistView}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      if (res) {
        fetchUserInfo();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={classes.root}>
      <Typography display="inline" variant="h2">
        {`${firstName} ${lastName}`}
      </Typography>
      {
        profileData
          ? <ViewOther profileData={profileData} />
          : <h4>User has no profile data!</h4>
      }
      {
        userRole === 'big boss' && (
        <div>
          <Typography variant="subtitle1">
            User Role:
            <br />
            {role}
          </Typography>
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => { promoteUser(); }}
          >
            Promote to Bandmate
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.btnTwo}
            onClick={() => { removeAdmin(); }}
          >
            Remove Profile
          </Button>
        </div>
        )
      }
      {
        userRole === 'bandmate' && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => { removeAdmin(); }}
            >
              Remove Profile
            </Button>
          </div>
        )
      }
      {
          posts && (
          <div>
            <br />
            <br />
            <Divider />
            <ViewPosts
              posts={posts}
              admin={userRole}
              adminRemovePost={() => adminRemovePost}
            />
          </div>
          )
        }
    </div>
  );
}

export default withStyles(styles)(FetchOther);
