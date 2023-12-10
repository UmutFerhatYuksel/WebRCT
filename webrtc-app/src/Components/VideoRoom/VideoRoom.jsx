import React, { useContext } from 'react';
import './VideoRoom.css';
import { SocketContext } from '../../SocketContext';
import { Grid } from '@mui/material';

const VideoRoom = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  console.log( myVideo);
  console.log( userVideo);






  return (
    <div className='video-container'>
      {stream &&
        <div className='main-container'>
            <h2>{name}annem</h2>
            <video id='my-video' height="300px" width="500px"  muted autoPlay ref={myVideo}/>

        </div>
      }

      {callAccepted && !callEnded &&(
        <div className='main-container'>
          <h2>{call.name}</h2>
            <video playsInline autoPlay  id='user-video' height="300px" width="500px" ref={userVideo}/>
        </div>
      )}

    </div>

  );
};

export default VideoRoom;