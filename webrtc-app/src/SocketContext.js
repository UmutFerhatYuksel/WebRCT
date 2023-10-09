import React, { createContext, useEffect, useRef, useState } from "react";
import  {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext=createContext();

const socket=io("http://localhost:5000");

const ContextProvider=({children})=>{
    const [stream, setStream] = useState(null);
    const [me, setme] = useState('');
    const [call,setCall]=useState({});
    const[callAccepted,setCallAccepted]=useState(false);
    const[callEnded,setCallEnded]=useState(false);
    const [name,setName]=useState('');

    
    const myVideo=useRef();
    const userVideo=useRef();
    const connectionRef=useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentVideo)=>{
            setStream(currentVideo);
            if(myVideo.current){
                myVideo.current.srcObject=currentVideo;
            }
        });


        socket.on('me',(id)=>
            setme(id)
        );

        socket.on('calluser',({from,name:callerName,signal})=>{
            setCall({isRecieved:true,from,name:callerName,signal})
        })
    },[]);

    const callUser=(id)=>{


        const peer=new Peer({initiator:true,trickle:false,stream});

        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject=currentStream; 
        });


        socket.on('callaccepted',(signal)=>{
            setCallAccepted(true);

            peer.signal(signal);
        });

        

        connectionRef.current=peer;


    }

    const leaveCall=()=>{
        setCallEnded(true);

        connectionRef.current.destroy();

        // window.location.reload();
    }

    const answercall=()=>{
        setCallAccepted(true);

        const peer=new Peer({initiator:false,trickle:false,stream});

        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from});
        });

        peer.on('stream',(currentStream)=>{
                userVideo.current.srcObject=currentStream;

        });

        peer.signal(call.signal);

        connectionRef.current=peer;
    }

  return(
    <SocketContext.Provider value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        name,
        setName,
        stream,
        callEnded,
        answercall,
        leaveCall,
        callUser,
        connectionRef,
        me,
        setme
    }}>
        {children}
    </SocketContext.Provider>
  );

}

export {ContextProvider,SocketContext}