import React, { useState } from 'react'
import Button from '../../../../components/shared/Button/Button';
import Card from '../../../../components/shared/Card/Card';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css'

const Email = ({onNext}) => {
    const [ emailId, setEmailId ] = useState('');
  return (
      <Card title='Enter your email id' icon='email-emoji'>
          <TextInput value={emailId} onChane={(e) => setEmailId(e.target.value)} />
          <div>
              <div className={ styles.actionButton }>
                  <Button text="Next" onClick={onNext} />
              </div>
              <p className={styles.bottomParagraph}>
                  By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
              </p>
          </div>
    </Card>
  )
}

export default Email