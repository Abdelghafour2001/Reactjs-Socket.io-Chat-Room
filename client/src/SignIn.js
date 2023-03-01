const SignIn = ({ setRoom, setUsername, joinRoom, totalUserCout }) => {
    return (
        <div className="signin-container">
            <h4>
                Join A Chat
            </h4>
            <h5>Online: {totalUserCout}</h5>
            <div className="signin">
                <input className="text-input w-auto mb-5 border" type="text" placeholder="John" onChange={(e) => setUsername(e.target.value)}/>
                <input className="text-input w-auto mb-5 border" type="text" placeholder="Room ID" onChange={(e) => setRoom(e.target.value)} />
                <button onClick={joinRoom} className='btn-danger'>
                    Enter
                </button>
            </div>
        </div>
    )
}

export default SignIn