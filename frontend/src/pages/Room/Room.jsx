import React, { useEffect, useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRTC';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Room.module.css';
import { getRoom } from '../../http';

const Room = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { clients, provideRef, handleMute } = useWebRTC(roomId, user);
  const [ room, setRoom ] = useState(null);
  const [ isMute, setIsMute ] = useState(true);

  useEffect(() => {
    handleMute(isMute, user.id);
  }, [ [ isMute ] ]);
  
  const handleManualLeave = () => {
    navigate('/rooms');
  }

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await getRoom(roomId);
      console.log(data);
      setRoom((prev) => data);
    };

    fetchRoom();
  }, [ roomId ]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setIsMute((prev) => !prev);
  }

  return (
    <div>
      <div className='container'>
        <button onClick={handleManualLeave} className={ styles.goBack }>
          <img src="/images/arrow-left.png" alt="back" />
          <span>All voice rooms</span>
        </button>
      </div>
      {/* <h1>All Connected Clients</h1> */}
      <div className={ styles.clientsWrap }>
        <div className={ styles.header }>
          <h2 className={ styles.topic }>{ room?.topic }</h2>
          <div className={ styles.actions }>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" alt="palm-icon" />
            </button>
            <button onClick={handleManualLeave} className={styles.actionBtn}>
              <img src="/images/win.png" alt="win-icon" />
              <span>Leave quietly</span>
            </button>
          </div>
        </div>

        <div className={ styles.clientsList }>
          {
        clients.map((client) => {
          return (
            <div className={ styles.client } key={ client.id }>
              <div className={styles.userHead}>
              <audio
                ref={(instance) => provideRef(instance, client.id) }
                // controls
                autoPlay
              ></audio>
                <img className={ styles.userAvatar } src={ client.avatar } alt="avatar" />
                <button onClick={() => handleMuteClick(client.id)} className={ styles.micBtn }>
                  {
                    client.muted ?
                      (
                        <img src="/images/mic-mute.png" alt="mic-mute-icon" />
                      ) : (
                        <img src="/images/mic.png" alt="mic-icon" />
                      )
                  }
                </button>
            </div>
              <h4>{ client.name }</h4>
            </div>
          )
        })
      }
        </div>
      </div>
    </div>
  )
}

export default Room