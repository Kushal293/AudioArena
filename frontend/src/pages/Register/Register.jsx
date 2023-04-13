import React from 'react'
import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
import styles from './Register.module.css'
import { useState } from 'react';
import StepPhoneEmail from '../steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../steps/StepOtp/StepOtp';
import StepName from '../steps/StepName/StepName';
import StepAvatar from '../steps/StepAvatar/StepAvatar';
import StepUsername from '../steps/StepUsername/StepUsername';


const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: StepName,
    4: StepAvatar,
    5: StepUsername,
};

const Register = () => {
    const [ step, setStep ] = useState(1);
    const Step = steps[step];
    
    const onNext = () => {
        setStep(step + 1);
    }
    return (
      <div className={ styles.cardWrapper }>
          <Card title='Enter your phone number' icon='phone'>
              <Step />
              <Button onClick={onNext} text='Next' />
          </Card>
    </div>
  )
}

export default Register