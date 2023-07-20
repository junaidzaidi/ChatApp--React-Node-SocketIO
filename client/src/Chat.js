import React, { useEffect, useState } from "react";


function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                sender: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() 
            }
            console.log("Message Emitted")
            await socket.emit("send_message", messageData);
        }
    } 

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data)
        });
    }, [socket]);

    return (
        <div>
            <div className="chat-header">
                Live Chat
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input 
                    type="text" 
                    placeholder="Hey write here..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value)
                    }}
                />
                <button onClick={sendMessage}>&#9654;</button>
            </div>
        </div>
    )
}

export default Chat