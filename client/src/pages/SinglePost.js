import React, { useEffect } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
  MDBBtn,
} from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { getRelatedPosts, getPost } from '../redux/features/postSlice'
import RelatedPosts from '../components/RelatedPosts'
import DisqusThread from '../components/DisqusThread'
import Spinner from '../components/Spinner'
const SinglePost = () => {
  const dispatch = useDispatch()
  const { post, relatedPosts, loading } = useSelector((state) => ({
    ...state.post,
  }))
  const { id } = useParams()
  const navigate = useNavigate()
  const tags = post?.tags

  useEffect(() => {
    tags && dispatch(getRelatedPosts(tags))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
          <MDBCardImage
            position='top'
            style={{ width: '100%', maxHeight: '600px' }}
            src={post.imageFile}
            alt={post.title}
          />
          <MDBCardBody>
            <MDBBtn
              tag='a'
              color='none'
              style={{ float: 'left', color: '#000' }}
              onClick={() => navigate('/')}
            >
              <MDBIcon
                fas
                size='lg'
                icon='long-arrow-alt-left'
                style={{ float: 'left' }}
              />
            </MDBBtn>
            <h3>{post.title}</h3>
            <span>
              <p className='text-start postName'>Created By: {post.name}</p>
            </span>
            <div style={{ float: 'left' }}>
              <span className='text-start'>
                {post && post.tags && post.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className='text-start mt-2'>
              <MDBIcon
                style={{ float: 'left', margin: '5px' }}
                far
                icon='calendar-alt'
                size='lg'
              />
              <small className='text-muted'>
                {moment(post.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
              {post.description}
            </MDBCardText>
          </MDBCardBody>
          <RelatedPosts relatedPosts={relatedPosts} postId={id} />
        </MDBCard>
        <DisqusThread id={id} title={post.title} path={`/post/${id}`} />
      </MDBContainer>
    </>
  )
}

export default SinglePost
