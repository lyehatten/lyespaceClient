import { Button } from "@material-ui/core";

type Props = {
  posts: Array<{id: number, post: string, createdAt: string}>,
  admin: string | null,
  adminRemovePost: (id: number) => void
}


const ViewPosts = (props: Props) => {

  return(
    <div>
      {
        props.posts.map(post => {return(
          <div key={post.id}>
            <p>{post.post}</p>
            { post.createdAt.slice(0, 10)}
            {props.admin === "bandmate" || props.admin === "big boss" ? <Button onClick={() => props.adminRemovePost(post.id) }>Remove Post</Button> : undefined}
          </div>
        )})
      }
    </div>
  )

}

export default ViewPosts;