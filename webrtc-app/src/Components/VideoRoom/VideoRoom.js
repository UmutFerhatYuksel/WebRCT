import React, { useContext } from 'react';
import './VideoRoom.css';
import { SocketContext } from '../../Context/SocketContext';

const VideoRoom = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  console.log( myVideo);
  console.log( userVideo);






  return (
    <div className='video-container'>
      {stream &&
        <div className='main-container'>

          <div className='local-container'>
            <h2>{name}</h2>
            <video id='my-video' height={"300px"} width={"500px"} playsInline muted autoPlay ref={myVideo}></video>
          </div>

        </div>
      }

      {callAccepted && !callEnded &&
        <div className='main-container'>
          <h2>{call.name}</h2>
          <div className='local-container' >
            <video playsInline autoPlay ref={userVideo} id='user-video' height={"300px"} width={"500px"} ></video>
          </div>
        </div>
      }





    </div>

  );
};

export default VideoRoom;