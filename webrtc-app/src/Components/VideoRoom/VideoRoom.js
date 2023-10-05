import React, { useContext, useEffect, useRef, useState } from 'react';
import AgoraConfig from '../../AgoraConfig';
import AgoraRTC from 'agora-rtc-sdk';
import './VideoRoom.css';
import { SocketContext } from '../../Context/SocketContext';

const VidoeRoom = () => {
  const {name,callAccepted,myVideo,userVideo,callEnded,video,call}=useContext(SocketContext);
  console.log(myVideo);
  
    return (
      <div className='main-container'>
          <div className='local-container'>
              <video playsInline muted autoPlay ref={myVideo}></video>
          </div>
      </div>
    );
  };

export default VidoeRoom;