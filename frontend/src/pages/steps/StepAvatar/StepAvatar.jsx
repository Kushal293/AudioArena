import React, { useEffect, useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http/index';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader'

const StepAvatar = () => {
  const [ image, setImage ] = useState('/images/monkey-avatar.png');
  const dispatch = useDispatch();
  const { name, avatar } = useSelector(state => state.activate);
  const [ loading, setLoading ] = useState(false);
  const [ unMounted, setUnMounted ] = useState(false);
  
  const captureImage = (e) => {
    const file = e.target.files[ 0 ];

//? reading the file and converting into bit-64 string format...
    const reader = new FileReader();
    reader.readAsDataURL(file);

//? only after conversion of file to string get complet then onloadend() will run...
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    }
  }
  // const submit = async () => {
  //    if (!name || !avatar) return;
  //       setLoading(true);
  //   try {
  //     const { data } = await activate({ name, avatar });
  //     console.log(data);
  //      if (data.auth) {
  //           // if (!unMounted) {
  //           //     dispatch(setAuth(data));
  //           // }
  //        dispatch(setAuth(data));
  //         }
  //   } catch (error) {
  //     console.log(error);
  //    } finally {
  //     setLoading(false);
  //   }
  // };

  async function submit() {
        if (!name || !avatar) return;
        setLoading(true);
        try {
          const { data } = await activate({ name, avatar });
          console.log(data);
            if (data.auth) {
                if (!unMounted) {
                    dispatch(setAuth(data));
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

  useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);

  if (loading) return <Loader message='Activation in process...' />
  return (
    <div className={ styles.cardWrapper }>
      <Card title={`Okay, ${name}!`} icon='monkey-face'>
          <p className={ styles.subHeading }>
            How's this photo?
        </p>
        <div className={ styles.avatarWrapper }>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id='avatarInput'
            className={ styles.avatarInput }
            type="file"
          />
          <label className={ styles.avatarLabel } htmlFor="avatarInput">
            Choose a different photo
          </label>
        </div>
          <div>
            <Button onClick={submit} text='Next' />
          </div>
        </Card>
    </div>
  )
}

export default StepAvatar