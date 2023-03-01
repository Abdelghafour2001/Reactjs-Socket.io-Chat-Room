import React, { useState, useEffect } from 'react';

const Message = ({msg, uID}) => {
    const {author, message, time} = msg;

    return (
        <div className={uID === msg.uID ? "message-container user" : "message-container"}>
            <div className="user-meta">
                <div className="img-bg">
                    <span className="img-letter">{ author.slice(0, 1).toUpperCase() }</span>
                </div>
            </div>
            <div className={"message-p"}>
                <p className={uID === msg.uID ? "message message-user m-0" : "message m-0"}>
                    { message }
                    <small>{author} - {time}</small>
                </p>
            </div>
        </div>
    )
}

export default Message