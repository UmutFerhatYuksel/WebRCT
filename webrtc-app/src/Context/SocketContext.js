import React, { createContext, useEffect, useRef, useState } from "react";
import  {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext=createContext();

const socket=io("http://localhost:5000");

const ContextProvider=({children})=>{
    const [video, setvideo] = useState(null);
    const [me, setme] = useState("");
    const [call,setCall]=useState(null);
    const[callAccept,setCallAccept]=useState(false);
    const[callEnd,setCallEnd]=useState(false);
    const [name,setName]=useState("");

    const userVideo=useRef();
    const myVideo=useRef();
    const connectionRef=useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video:true,audio:true})
        .then((currentVideo)=>{
            setvideo(currentVideo);
            
                myVideo.current.srcObject=currentVideo;
            
        });

        socket.on('me',(id)=>{
            setme(id);
        });

        socket.on('calluser',({from,name:callerName,signal})=>{
            setCall({isRecieved:true,from,name:callerName,signal})
        })
    },[]);

    const callUser=(id)=>{

        setCallAccept(true);

        const peer=new Peer({initiator:true,trickle:false,video});

        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signalData:data,from:me,name});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObj=currentStream;
        });

        socket.on('callaccepted',(signal)=>{
            setCallAccept(true);

            peer.signal(signal);
        })

        connectionRef.current=peer;


    }

    const leaveCall=()=>{
        setCallEnd(true);

        connectionRef.current.destroy();
    }

    const answercall=()=>{
        setCallAccept(true);

        const peer=new Peer({initiator:false,trickle:false,video});

        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.to,video});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObj=currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current=peer;
    }

  return(
    <SocketContext.Provider value={{
        call,
        callAccept,
        myVideo,
        userVideo,
        name,
        setName,
        video,
        callEnd,
        answercall,
        leaveCall,
        callUser,
        connectionRef
    }}>
        {children}
    </SocketContext.Provider>
  );

}

export {ContextProvider,SocketContext}