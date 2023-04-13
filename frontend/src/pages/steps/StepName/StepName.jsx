import React, { useState } from 'react';
import Button from '../../../components/shared/Button/Button';
import Card from '../../../components/shared/Card/Card';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepName.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';

const StepName = ({ onNext }) => {
  const { name } = useSelector(state => state.activate);
  const [ fullname, setFullname ] = useState(name);
  const dispatch = useDispatch();
  const nextStep = () => {
    if (!fullname) {
      return
    };
    dispatch(setName(fullname));
    onNext();
  }
  return (
    <div className={ styles.cardWrapper }>
        <Card title="What's your full name?" icon='happy-face'>
          <TextInput value={ fullname } onChange={ (e) => setFullname(e.target.value) } />
          <div>
            <p className={ styles.paragraph }>
            People use real names at codershouse :)
          </p>
          <div>
            <Button onClick={nextStep} text='Next' />
          </div>
          </div>
        </Card>
    </div>
  )
}

export default StepName