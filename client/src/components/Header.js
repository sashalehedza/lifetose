import React, { useState } from 'react'
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
} from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/features/authSlice'
import { searchPosts } from '../redux/features/postSlice'
import { Link, useNavigate } from 'react-router-dom'
import decode from 'jwt-decode'

import './header.css'

const Header = () => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const { user } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = user?.token

  if (token) {
    const decodedToken = decode(token)
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout())
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search) {
      dispatch(searchPosts(search))
      navigate(`/posts/search?searchQuery=${search}`)
      setSearch('')
    } else {
      dispatch(searchPosts(''))
      navigate('/')
    }
  }

  const handleLogout = () => {
    dispatch(setLogout())
  }

  return (
    <MDBNavbar fixed='top' expand='lg' className='Header'>
      <MDBContainer>
        <Link
          to='/'
          style={{ color: 'white', fontWeight: '600', fontSize: '22px' }}
        >
          LIFETOSE
        </Link>
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toogle navigation'
          onClick={() => setShow(!show)}
          style={{ color: 'white' }}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {user?.result?._id && (
              <MDBNavbarItem
                style={{
                  paddingRight: '30px',
                }}
              >
                <p
                  className='header-text'
                  style={{
                    color: 'white',
                  }}
                >
                  Logged in as: {user?.result?.name}
                </p>
              </MDBNavbarItem>
            )}
            <MDBNavbarItem
              style={{
                paddingRight: '30px',
              }}
            >
              <Link to='/'>
                <p
                  className='header-text'
                  style={{
                    color: 'white',
                  }}
                >
                  Home
                </p>
              </Link>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem
                  style={{
                    paddingRight: '30px',
                  }}
                >
                  <Link to='/addPost'>
                    <p
                      className='header-text'
                      style={{
                        color: 'white',
                      }}
                    >
                      Add Post
                    </p>
                  </Link>
                </MDBNavbarItem>
                <MDBNavbarItem
                  style={{
                    paddingRight: '30px',
                  }}
                >
                  <Link to='/dashboard'>
                    <p
                      className='header-text'
                      style={{
                        color: 'white',
                      }}
                    >
                      Dashboard
                    </p>
                  </Link>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem
                style={{
                  paddingRight: '30px',
                }}
              >
                <Link to='/login'>
                  <p
                    className='header-text'
                    style={{
                      color: 'white',
                    }}
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </p>
                </Link>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem
                style={{
                  paddingRight: '30px',
                }}
              >
                <Link to='/login'>
                  <p
                    className='header-text'
                    style={{
                      color: 'white',
                    }}
                  >
                    Login
                  </p>
                </Link>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input
              type='text'
              className='form-control'
              placeholder='Search Post'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ marginTop: '5px', marginLeft: '5px' }}>
              <MDBIcon
                fas
                icon='search'
                style={{
                  color: 'white',
                }}
              />
            </div>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Header
