import VideoRoom from './Components/VideoRoom/VideoRoom';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Controls from './Components/Controls/Controls';
import React from 'react';

function App() {

  return (
    <div className="App">
        <h1>Video Call WebRtc</h1>
        <VideoRoom></VideoRoom>
        <Controls></Controls>
       
    </div>
  );
}

export default App;
