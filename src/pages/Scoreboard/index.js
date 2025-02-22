import { React, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Scoreboard = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const navigate = useNavigate()

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

  // check if token is valid
    useEffect(() => {
      if(!sessionStorage.getItem('token')){
        navigate("/")
      } else {
        const options = { headers: new Headers({ 'Authorization': sessionStorage.getItem('token') }) }
        // fetch("http://0.0.0.0:5001/users", options)
        fetch("https://black-beard-island.herokuapp.com/users", options)
          .then(res => {
            if (!res.ok){
              handleLogout()
            } else{
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
      const fetchHighestScore = async () => {
        try{
            // const { data } = await axios.get(`http://0.0.0.0:5001/users`)
            const { data } = await axios.get(`https://black-beard-island.herokuapp.com/users`)
            setData(data)
        } catch(error){
            console.log(error)
        }
      }
      fetchHighestScore()
    
    }, [])
    

    const descending = data.sort((a,b) => b.games_won - a.games_won)
    const winners = descending.map((player, index) => {
       return(
        <div aria-label="scoreboard" className="scoreboard-text" style={{border: 'none', borderRadius: '15px', padding: '0rem 2rem', margin: '1rem 6rem'}}>
            <h4>{index+1}. &nbsp;{player.username} &nbsp; {player.games_won}</h4>
        </div>
       )
    })  

    

  return (
    <div>
      {loading ? <h2>Loading ...</h2> : 
      <>
        <h1 className="scoreboard-text" style={{textAlign: 'center'}}
        data-testid="header"
        >Scoreboard</h1>
        <h3 className="scoreboard-text" style={{textAlign: 'center'}}>Games Won</h3>

        <div className='scoreboard-btn scoreboard-text' style={{position: 'fixed', right:'6rem', top: '3.5rem'}} onClick={ () => { navigate('/home') } }>Home</div>

        <div className="scoreboard-frame">
            <div style={{paddingTop: '7em'}}>
                {winners}
            </div>
        </div>
      </>
    }
    </div>
  )
};

export default Scoreboard;
