import React, { useState } from "react"
import {
  useGetPostsQuery,
  useGetCommentsQuery,
  useAddReplyMutation,
} from "./app/brandbastion"
import Comment from "./app/Components/Comment"
import PostCard from "./app/Components/PostCard"
import { Grid, TextField, InputAdornment } from "@material-ui/core"

const App: React.FC = () => {
  const { data: posts } = useGetPostsQuery()
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const { data: comments } = useGetCommentsQuery(selectedPostId || 0)
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({})
  const [addReplyMutation] = useAddReplyMutation()
  const [filterText, setFilterText] = useState("")

  const postTitle =
    selectedPostId !== null ? posts?.[selectedPostId]?.title : ""

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId)
  }

  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000)
  }

  const handleReply = async (commentId: number) => {
    if (selectedPostId) {
      await addReplyMutation({
        id: generateUniqueId(),
        postId: selectedPostId,
        body: replyText[commentId],
      }).then(() => {
        // nice to have: toast with notification, clear message
      })
    }
  }

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(filterText.toLowerCase()) ||
      post.userId === Number(filterText) ||
      post.body.toLowerCase().includes(filterText.toLowerCase()),
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Filter Posts"
          variant="outlined"
          fullWidth
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"></InputAdornment>,
          }}
          style={{ marginTop: "20px", padding: "20px", width: "250px" }}
        />
      </Grid>
      <Grid item xs={6}>
        {filteredPosts?.map((post) => (
          <React.Fragment key={post.id}>
            <PostCard
              post={post}
              handlePostClick={handlePostClick}
              setReplyText={setReplyText}
            />
          </React.Fragment>
        ))}
      </Grid>
      <Comment
        comments={comments ?? undefined}
        setReplyText={setReplyText}
        selectedPostId={selectedPostId || null}
        postTitle={postTitle}
        handleReply={handleReply}
        replyText={replyText}
      />
    </Grid>
  )
}

export default App
