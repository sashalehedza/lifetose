import axios from 'axios'

const devEnv = process.env.NODE_ENV !== 'production'

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const createPost = (postData) => API.post('/post', postData)
export const getPosts = () => API.get(`/post`)
export const getPost = (id) => API.get(`/post/${id}`)
export const deletePost = (id) => API.delete(`/post/${id}`)
export const updatePost = (updatedPostData, id) =>
  API.patch(`/post/${id}`, updatedPostData)
export const getPostsByUser = (userId) => API.get(`/post/userPosts/${userId}`)

export const getPostsBySearch = (searchQuery) =>
  API.get(`/post/search?searchQuery=${searchQuery}`)

export const getTagPosts = (tag) => API.get(`/post/tag/${tag}`)
export const getRelatedPosts = (tags) => API.post(`/post/relatedPosts`, tags)
export const likePost = (id) => API.patch(`/post/like/${id}`)
