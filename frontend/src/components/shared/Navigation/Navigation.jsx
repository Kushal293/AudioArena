import React from 'react'
import styles from './Navigation.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../http';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';

const Navigation = () => {
  const brandStyle = {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '22px',
    fontWeight: 'bold'
      }
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.auth);
  async function logoutUser () {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <nav className= {`${styles.navbar} container`}>
      <Link style={brandStyle} to='/'>
        <img src="/images/logo.png" alt="logo" />
        <span>AudioArena</span>
      </Link>
      { isAuth &&
        <div className={ styles.navRight }>
          <h3>{ user?.name }</h3>
          <Link to="/">
            <img src={ user.avatar ? user.avatar : '/images/monkey-avatar.png' } className={ styles.avatar } alt="avatar" />
          </Link>
          <button className={ `${ styles.logoutBtn }` } onClick={ logoutUser }>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      }
    </nav>
  )
}

export default Navigation