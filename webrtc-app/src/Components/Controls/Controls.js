import { Box, Button, Paper, TextField } from "@mui/material";
import { ContentPaste, Label, Phone, PhoneDisabled } from '@mui/icons-material'
import React, { useContext, useState } from "react";
import './Control.css';
import { SocketContext } from "../../Context/SocketContext";




const Controls = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, call, answercall } = useContext(SocketContext);

    const copyToBoard = () => {
        navigator.clipboard.writeText(me);
    }
    const [idToCall, setIdToCall] = useState('');
    
    return (
        <div className="control-container">
            <form>
                <div className="form-container">
                    <Box grid sx={{ display: 'grid', m: 4 }}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth id="outlined-basic" label="Name" variant="outlined" />
                        <Button fullWidth sx={{ m: "auto", mt: 2 }} onClick={copyToBoard} variant="contained" endIcon={<ContentPaste />}>Copy Call ID</Button>
                    </Box>
                    {callAccepted && !callEnded ? (
                        <Box sx={{ display: 'grid', m: 4 }}>
                            <Button sx={{ m: "auto", mt: 2 }} variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} >
                                Hang Up
                            </Button>
                        </Box>

                    ) : (
                        <Box grid sx={{ display: 'grid', m: 4 }}>
                            <TextField value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth id="outlined-basic" label="ID to Call" variant="outlined" />
                            <Button fullWidth sx={{ m: "auto", mt: 2 }} onClick={() => callUser(idToCall)} variant="contained" endIcon={<Phone />}>Make a Call</Button>
                        </Box>
                    )}

                    <div className="call-container">
                        {call.isRecieved && !callAccepted && (
                            <Box sx={{ display: 'grid', m: 4 }}>
                                <h1>{call.name} is calling:</h1>
                                <Button fullWidth sx={{ m: "auto" }} variant="contained" color="success" onClick={answercall}>
                                    Answer
                                </Button>
                            </Box>

                        )}

                    </div>

                </div>
            </form>
        </div>
    )
}

export default Controls;