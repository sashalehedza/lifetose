import React, { useState, useEffect } from 'react'
import { MDBCard, MDBCardBody, MDBValidation, MDBBtn } from 'mdb-react-ui-kit'
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../redux/features/postSlice'

const initialState = {
  title: '',
  description: '',
  tags: [],
}

const AddEditPost = () => {
  const [postData, setPostData] = useState(initialState)
  const [tagErrMsg, setTagErrMsg] = useState(null)
  const { error, userPosts } = useSelector((state) => ({
    ...state.post,
  }))
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { title, description, tags } = postData
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const singlePost = userPosts.find((post) => post._id === id)
      console.log(singlePost)
      setPostData({ ...singlePost })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    error && toast.error(error)
  }, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!tags.length) {
      setTagErrMsg('Please provide some tags')
    }
    if (title && description && tags) {
      const updatedPostData = { ...postData, name: user?.result?.name }

      if (!id) {
        dispatch(createPost({ updatedPostData, navigate, toast }))
      } else {
        dispatch(updatePost({ id, updatedPostData, toast, navigate }))
      }
      handleClear()
    }
  }
  const onInputChange = (e) => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
  }
  const handleAddTag = (tag) => {
    setTagErrMsg(null)
    setPostData({ ...postData, tags: [...postData.tags, tag] })
  }
  const handleDeleteTag = (deleteTag) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== deleteTag),
    })
  }
  const handleClear = () => {
    setPostData({ title: '', description: '', tags: [] })
  }
  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
      className='container'
    >
      <MDBCard alignment='center'>
        <h5>{id ? 'Update Post' : 'Add Post'}</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
            <div className='col-md-12'>
              <input
                placeholder='Enter Title'
                type='text'
                value={title || ''}
                name='title'
                onChange={onInputChange}
                className='form-control'
                required
                invalid
                validation='Please provide title'
              />
            </div>
            <div className='col-md-12'>
              <textarea
                placeholder='Enter Description'
                type='text'
                value={description}
                name='description'
                onChange={onInputChange}
                className='form-control'
                required
                invalid
                textarea
                rows={4}
                validation='Please provide description'
              />
            </div>
            <div className='col-md-12'>
              <ChipInput
                name='tags'
                variant='outlined'
                placeholder='Enter Tag'
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
              {tagErrMsg && <div className='tagErrMsg'>{tagErrMsg}</div>}
            </div>
            <div className='d-flex justify-content-start'>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, imageFile: base64 })
                }
              />
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: '100%' }}>
                {id ? 'Update' : 'Submit'}
              </MDBBtn>
              <MDBBtn
                style={{ width: '100%' }}
                className='mt-2'
                color='danger'
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default AddEditPost
