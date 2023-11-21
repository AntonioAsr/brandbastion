import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface Comment {
  id: number
  postId: number
  body: string
}

interface Tag {
  id: number
  name: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    getComments: builder.query<Comment[], number>({
      query: (postId) => `posts/${postId}/comments`,
    }),
    addReply: builder.mutation<void, Comment>({
      query: (comment) => ({
        url: "comments",
        method: "POST",
        body: comment,
      }),
    }),
  }),
})

export const { useGetPostsQuery, useGetCommentsQuery, useAddReplyMutation } =
  api
