import React, { useState } from 'react'
import './Chat.css';
import {Avatar, IconButton} from "@mui/material";
import MoreVert from '@mui/icons-material/MoreVert';
import AttachFile from '@mui/icons-material/AttachFile';
import Search from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import axios  from './axios';
function Chat({ messages }) {
  const [input,setInput]= useState('')
  const sendMessage =async(e)=>{
    e.preventDefault();

  await  axios.post('/messages/new',{
      message: input,
      name: "DEMO APP",
      timestamp: "Just now!",
      received: false,
    });
    setInput('');
  };
  return (
    <div className='chat'>
        <div className='chat_header'>
          <Avatar/>
          <div className='chat_headerInfo'>
            <h3>Room name</h3>
            <p>Last Seen at..</p>
          </div>
          <div className='chat_headerRight'>
            <IconButton>
              <Search/>
              </IconButton>
              <IconButton>
                <AttachFile/>
              </IconButton>
              <IconButton>
                <MoreVert/>
              </IconButton>
          </div>
        </div>

        <div className='chat_body'>
          {messages.map((message)=>(
                 <p className={`chat_message ${message.received && "chat_reciever"}`}>
                 <span className='chat_name'>
                   {message.name}
                 </span>
               
     
                 {message.message}
                 <span className='chat_timestamp'>
                   {message.timestamp}
                 </span>
               </p>
          ))}
     
       
          
        </div>
        <div className='chat_footer'>
          <InsertEmoticon />
          <form>
            <input value= {input} onChange={(e)=>setInput(e.target.value)} placeholder='Type a message' type="text"/>
            <button onClick={sendMessage} type="submit">
              Send a message
            </button>
            <MicIcon/>
          </form>
        </div>
    </div>
  )
}

export default Chat