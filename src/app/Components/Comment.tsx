import React, { useState, useRef } from "react"
import {
  Typography,
  Grid,
  TextField,
  Button,
  Container,
} from "@material-ui/core"
import { Autocomplete } from "@mui/material"

interface CommentProps {
  id: number
  body: string
}

interface Props {
  selectedPostId: number | null
  comments: CommentProps[] | undefined
  replyText: { [key: number]: string }
  setReplyText: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>
  handleReply: (commentId: number, tags: string[]) => void
  postTitle: string | undefined
}

const Comment: React.FC<Props> = ({
  selectedPostId,
  comments,
  replyText,
  setReplyText,
  handleReply,
  postTitle,
}) => {
  const replyStyle = { margin: "5px", padding: "5px" }

  const TAGS = ["#sports", "#science", "#nature"]
  const [tags, setTags] = useState<string[]>(TAGS)
  const [selectedTags, setSelectedTags] = useState<{ [key: number]: string[] }>(
    {},
  )

  const handleTagChange = (commentId: number, value: string[]) => {
    setSelectedTags((prev) => ({
      ...prev,
      [commentId]: value,
    }))
  }

  return (
    <Grid item xs={6} container>
      {selectedPostId && (
        <div>
          <Typography variant="h4">{postTitle}</Typography>
          {comments?.map((comment) => (
            <Container key={comment.id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                {selectedTags[comment.id]?.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "#fff",
                      padding: "5px",
                      borderRadius: "3px",
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <Typography variant="body2">{comment.body}</Typography>
              <Autocomplete
                multiple
                id={`tags-${comment.id}`}
                options={tags}
                freeSolo
                value={selectedTags[comment.id] || []}
                onChange={(_, value) => handleTagChange(comment.id, value)}
                renderInput={(params) => (
                  // @ts-ignore
                  <TextField
                    {...params}
                    style={{ display: "flex", height: "40px", ...replyStyle }}
                    label="Reply"
                    variant="outlined"
                    value={replyText[comment.id] || ""}
                    onChange={(e) =>
                      setReplyText((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                  />
                )}
              />
              <div
                style={{
                  display: "flex",
                  flexFlow: "row",
                  margin: "20px 0px 30px 6px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleReply(comment.id, selectedTags[comment.id] || [])
                  }
                  style={replyStyle}
                >
                  Add Reply
                </Button>
              </div>
            </Container>
          ))}
        </div>
      )}
    </Grid>
  )
}

export default Comment
