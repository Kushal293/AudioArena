import React, { useEffect, useState } from 'react'
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css'
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';

const StepOtp = ({onNext}) => {
  const [ otp, setOtp ] = useState('');
  const [ sentotp, setSentOtp ] = useState("");
  const { phone, hash, otp:send } = useSelector(state => state.auth.otp);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(send);
    setSentOtp(send);
  }, []);
  
  async function submit () {
    if (!phone || !otp || !hash) return; 
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
      onNext();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className={ styles.cardWrapper }>
        <Card title='Enter the code we just texted you' icon='lock-emoji'>
          <TextInput value={ otp } onChange={ (e) => setOtp(e.target.value) } />
          <div>
            <p className={ styles.bottomParagraph }>
            Didn’t receive? Tap to resend
            </p>
            <p style={ { marginTop: "30px", marginLeft: "40px" } }>Your OTP is: {sentotp}</p>
          <div className={styles.actionButton}>
            <Button onClick={submit} text='Next' />
          </div>
          </div>
        </Card>
      </div>
    </div>  
  )
}

export default StepOtp