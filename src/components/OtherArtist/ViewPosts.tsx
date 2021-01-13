import { Button } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const styles = {
  root: {
    margin: '10px'
  },
  posts: {
    padding: '20px',
    margin: '10px',
    borderRadius: '2px'
  },
  admn: {
    marginLeft: '10px'
  }
}

interface Props extends WithStyles<typeof styles> {
  posts: Array<{id: number, post: string, createdAt: string}>,
  admin: string | null,
  adminRemovePost: (id: number) => void
}


const ViewPosts = (props: Props) => {
  const {classes} = props
  return(
    <div className={classes.root}>
      <br/>
      <Typography variant="h3">Posts: </Typography>
      {
        props.posts.map(post => {return(
          <Box bgcolor="background.paper" 
          borderColor='text.secondary' border={1} 
          key={post.id} className={classes.posts}>
            <Typography variant="body1" paragraph={true}>
              {post.post}
            </Typography>
            <Typography variant="overline">
              DATE: { post.createdAt.slice(0, 10)}
            </Typography>
            {
              props.admin === "bandmate" || props.admin === "big boss" ? 
              <Button color="primary" className={classes.admn}
              onClick={() => props.adminRemovePost(post.id) }>
                Remove Post
              </Button> : undefined
            }
          </Box>
        )})
      }
    </div>
  )

}

export default withStyles(styles)(ViewPosts);