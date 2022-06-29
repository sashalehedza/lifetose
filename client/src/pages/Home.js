import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../redux/features/postSlice'
import CardPost from '../components/CardPost'
import Spinner from '../components/Spinner'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const { posts, loading } = useSelector((state) => ({
    ...state.post,
  }))
  const dispatch = useDispatch()
  const query = useQuery()
  const searchQuery = query.get('searchQuery')
  const location = useLocation()

  useEffect(() => {
    dispatch(getPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner />
  }
  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '1000px',
        alignContent: 'center',
      }}
    >
      <MDBRow className='mt-5'>
        {posts.length === 0 && location.pathname === '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Posts Found
          </MDBTypography>
        )}

        {posts.length === 0 && location.pathname !== '/' && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            We couldn't find any matches for "{searchQuery}"
          </MDBTypography>
        )}

        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {posts &&
                posts.map((item) => <CardPost key={item._id} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Home
