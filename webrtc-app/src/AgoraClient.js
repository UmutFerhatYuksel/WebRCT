import AgoraRTC from "agora-rtc-sdk";

const rtc=AgoraRTC.createClient({mode:"rtc",codec:'vp9'});

export default rtc;