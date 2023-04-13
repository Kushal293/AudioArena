import React from 'react'
import Button from '../../components/shared/Button/Button';
import Card from '../../components/shared/Card/Card';
import styles from './Login.module.css'
import { useState } from 'react';
import StepPhoneEmail from '../steps/StepPhoneEmail/StepPhoneEmail';
import StepOtp from '../steps/StepOtp/StepOtp';
import Rooms from '../Rooms/Rooms';

const steps = {
    1: StepPhoneEmail,
    2: StepOtp,
    3: Rooms,
};

const Login = () => {
    const [ step, setStep ] = useState(1);
    const Step = steps[ step ];

    const onNext = () => {
        setStep(step + 1);
    }
  return (
     <Step onNext={onNext} />
             
  )
}

export default Login