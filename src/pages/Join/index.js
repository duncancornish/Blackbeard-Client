
import { React, useState, useEffect } from "react"

import { socket } from '../../socket/index.js'
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // check if token is valid
  useEffect(() => {

    if(!sessionStorage.getItem('token')){
      navigate("/")
    } else {
      const options = { headers: new Headers({ 'Authorization': sessionStorage.getItem('token') }) }
      // fetch("http://0.0.0.0:5001/token", options)
      fetch("https://black-beard-island.herokuapp.com/token", options)
        .then(res => {
          if (!res.ok){
            handleLogout()
          } else {
            setLoading(false)
          }
        })
      }
      const handleLogout = () => {
        sessionStorage.clear();
        navigate("/")
      }
      
    })

  useEffect(() => {
    if (!!localStorage.getItem('gameData')) {
      localStorage.clear();
      window.location.reload();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const roomID = document.getElementById('roomID').value

    //  Check if room ID is available
    if (roomID.length === 6) {
      const joiningData = {
        roomID: roomID,
        player: {
          id: socket.id,
          user: sessionStorage.getItem('username')
        }
      }
      socket.emit("join game", joiningData)
      navigate('/lobby')
    } else {
      alert('please input a valid room ID')
    }
  }

  return (
    
    <div className="menu-img-l" role="main">
      {loading? <h2>Loading ... </h2> :
      <>
      <div className='scoreboard-btn scoreboard-text' style={{ position: 'fixed', right: '6rem', top: '3.5rem' }} onClick={() => { navigate('/home') }}>Home</div>
      <div className="content-section container-join">
        <h1>Join a Game</h1>
        <form action="" >
          <label htmlFor="roomID">Input Room ID: </label>
          <input type="text" name="roomID" id="roomID"></input>
          <button onClick={handleSubmit}>Join</button>

        </form>
      </div>
      </>
      }
    </div>
  )
};

export default Join;
