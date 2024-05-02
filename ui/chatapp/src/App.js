
import { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const API_URL = "http://localhost:5037/";
  useEffect(() => {
    refreshMessages();
  }, []);

  function refreshMessages() {
    fetch(API_URL + "api/chatapp/getmessages").then(response => response.json())
      .then(data => {
        setMessages(data);
      })
  }
  function Submit(Msg) {
    const data = {
      message: Msg,
      receiver: "AIS",
      sender: "UAAR"
    };
    fetch(API_URL + "api/chatapp/sendmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      alert(result);
      refreshMessages();
    })
    .catch(error => console.error("Error sending message:", error));
  }
  
  function DeleteMsg(msgId) {

  }

  return (
    <div className="App">
      <h1>
        Connectify
      </h1>
      <input id='newmsg' type='text'  onChange={(e) => setNewMsg(e.target.value)} />
      <button onClick={() => Submit(newMsg)}>Send</button>
      {messages.map(msg => (
        <div key={msg.id}>
          <p>{msg.id}</p>
          <p>{msg.sender}</p>
          <p>{msg.receiver}</p>
          <p>{msg.message}</p>
          <button onClick={() => DeleteMsg(msg.id)}> Delete </button>
          <br /> <br />
        </div>
      ))}
    </div>
  );
}

export default App;
