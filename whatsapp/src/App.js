import React from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import {useEffect,useState} from 'react';
import axios from './axios';
function App() {
 const [messages, setMessages] = useState([]);
    useEffect(()=>{
      axios.get('/messages/sync')
      .then(response=>{
        console.log(response.data)
        setMessages(response.data)
      })
           
    },[])


  useEffect(() => {
  
    const pusher = new Pusher('3305523bf96eeffe80e2', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages) => {
      alert(JSON.stringify(newMessages));
      setMessages([...messages,newMessages])
    });

  return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
console.log(messages);
  return (
    <div className="app">
    <div class="app_body">
      <Sidebar/>

      <Chat messages={messages}/>
    </div>

  
    </div>
  );
}

export default App;
