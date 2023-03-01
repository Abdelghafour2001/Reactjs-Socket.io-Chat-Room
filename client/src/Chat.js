import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';

const Chat = ({socket, username, room, uID}) => {

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const bottom = useRef()

    const sendMessage = async (e) => {
        if (message !== "") {
            const messageData = {
                uID: socket.id,
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            
            await socket.emit('send_message', messageData)
            setMessages((list) => [...list, messageData])
            setMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((list) => [...list, data])
        })
        socket.on('users_in_room_count', (usersCount) => {
            setUsersCount(usersCount)
        })
    }, [socket]);

    useEffect(() => {
        bottom.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <div>
            <div className="header"> 
                <h6>&#128512; Room: { room } | <small>Online: {usersCount}</small></h6>
                <button onClick={() => { window.location.reload() }} className="btn-outline">Quit</button>
            </div>
            <div className="main">
                {messages.length !== 0 && messages.map(msg => <Message key={msg.time + msg.author + Math.random() } msg={msg} uID={uID}/>)}
                
                <div style={{ float:"left", clear: "both", height: "10px" }}
                    ref={ref => bottom.current = ref}>
                </div>
            </div>
            <div className="form">
                <input 
                    className="text-input" 
                    onChange={(e) => setMessage(e.target.value)} 
                    value={message} 
                    ype="text" 
                    placeholder="Message &#x1F447; &#x1F447; &#x1F447;"
                    onKeyPress={(e) => { e.key === "Enter" && sendMessage() }}
                />
                <button 
                    className="btn-input" 
                    onClick={ sendMessage }
                >&#128036;</button>
            </div>
        </div>
    )
}

export default Chat;
