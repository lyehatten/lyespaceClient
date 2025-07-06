import { Button } from '@material-ui/core';
import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditPost from './EditPost';

const styles = {
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px',
  },
};

interface Props extends WithStyles<typeof styles> {
  post: {
    id: string,
    post: string,
    createdAt: string
  },
  refresh: Function,
  userId: string | null,
}

type States = {
  editToggle: boolean
};

class ViewPost extends React.Component <Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editToggle: false,
    };
  }

  toggleEdit() {
    this.setState({
      editToggle: !this.state.editToggle,
    });
  }

  deletePost = (postId: string) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/delete/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => window.location.reload())
      .catch((error) => console.log(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <Box
        bgcolor="background.paper"
        borderColor="text.secondary"
        border={1}
        className={classes.posts}
      >
        {
          this.state.editToggle
            ? (
              <EditPost
                userId={this.props.userId}
                toggleEdit={this.toggleEdit}
                post={this.props.post}
                refresh={this.props.refresh}
              />
            ) : (
              <div key={this.props.post.id}>
                <Typography variant="body1" paragraph>
                  {this.props.post.post}
                </Typography>
                <Typography variant="overline">
                  DATE:
                  {' '}
                  { this.props.post.createdAt.slice(0, 10)}
                </Typography>
              </div>
            )
}
        <Button
          color="secondary"
          variant="contained"
          onClick={() => this.toggleEdit()}
        >
          {
        this.state.editToggle
          ? <>Cancel</> : <>Edit</>
}
        </Button>
        <Button
          color="primary"
          onClick={() => this.deletePost(this.props.post.id)}
        >
          Delete
        </Button>
      </Box>
    );
  }
}

export default withStyles(styles)(ViewPost);
