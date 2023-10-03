import React, { useEffect, useRef } from 'react';
import AgoraConfig from '../AgoraConfig';
import AgoraRTC from 'agora-rtc-sdk';

const VidoeRoom = () => {
    const localVideoRef=useRef();
    const remoteVideoRef=useRef();


    useEffect(() => {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
        
        client.init(AgoraConfig.appId,()=>{
            client.join(null, AgoraConfig.chanelName, null,
                (uid) => {
                   var localStream = AgoraRTC.createStream({
                        video: true,
                        audio: true,
                    });
                    localStream.init(()=>{
                        localStream.play(localVideoRef.current);

                        client.publish(localStream);

                        client.on("stream-added",(event)=>{
                            client.subscribe(event.stream);
                        });

                        client.on("stream-subscribed",(event)=>{
                            event.stream.play(remoteVideoRef.current);
                        });

                    });
                });
        });
        
    }, [])


    return (
        <div>

        </div>
    );
}

export default VidoeRoom;