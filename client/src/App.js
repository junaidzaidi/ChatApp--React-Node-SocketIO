// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';


const socket = io.connect("http://localhost:3001")

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", {id: room});
    }
  }

  const joinChat = () => {
    if (username !== "") {
      socket.emit("set_username", {username: username})
    }
  }

  return (
    <div className="App">
      <h3> Join a Chat </h3>

      <input 
        type='text' 
        placeholder='Your Name' 
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />

      {/* <input 
        type='text' 
        placeholder='Room Name' 
        onChange={(event) => {
          setRoom(event.target.value)
        }}
      /> */}
      <div>
        <button onClick={joinChat}> Join a Chat </button>
      </div>

      <Chat 
        socket={socket} 
        username={username} 
        room={room}
      />

    </div>
  );
}

export default App;
