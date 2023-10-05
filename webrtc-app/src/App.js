import VideoRoom from './Components/VideoRoom/VideoRoom';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const refu=useRef();
  const [client,setClient]=useState(null);
  const[incall,setIncall]=useState(false);


  return (
    <div className="App">
        <h1>Video Call WebRtc</h1>
        <VideoRoom></VideoRoom>
    </div>
  );
}

export default App;
