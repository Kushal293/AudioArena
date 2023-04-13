import React from 'react'
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
  const nevigate = useNavigate();

  const handleClick = () => {
    nevigate('authenticate');
  };
  
  const signInLinkStyle = {
    color: '#0077FF',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px'
  };

  return (
    <div className={ styles.cardWrapper }>
     <Card title='Welcome to AudioArena' icon='logo'>
       <p className={styles.text}>
         We're working very hard to get AudioArena ready for everyone! While
         we wrap up the finishing touches, we're adding people gradually
         to make sure nothing breaks :)
        </p>
        <div>
          <Button onClick={handleClick} text="Let's Go" />
        </div>
       <div className={styles.signinWrapper}>
         <span className={styles.hasInvite}>Have an invite text?</span>
         <Link style={signInLinkStyle} to='/login'>Sign in</Link>
       </div>
     </Card>
    </div>
  )
}

export default Home