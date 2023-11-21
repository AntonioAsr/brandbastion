import React from "react"
import { Card, CardContent, Typography } from "@material-ui/core"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Props {
  post: Post
  handlePostClick: (postId: number) => void
  setReplyText: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>
}

const PostCard: React.FC<Props> = ({ post, handlePostClick, setReplyText }) => {
  return (
    <Card
      key={post.id}
      onClick={() => {
        handlePostClick(post.id)
        setReplyText({})
      }}
    >
      <CardContent>
        <Typography variant="h5">{post.title}</Typography>
        <Typography variant="body2">{post.body}</Typography>
        <Typography variant="caption">User ID: {post.userId}</Typography>
      </CardContent>
    </Card>
  )
}

export default PostCard
