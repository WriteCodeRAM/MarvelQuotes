import React, { useState } from "react";
import axios from "axios";
import './App.css'; 


function QuoteDisplay() {
  const [quote, setQuote] = useState("Click generate to show a quote from a random Marvel character!");
  const [title, setTitle] = useState("Marvel Quote Generator");
  const [gif, setGif] = useState("https://media3.giphy.com/media/3GnKKEw2v7bXi/giphy.gif?cid=5b2529d7kerfd41ktpsgssoqyq9hsa9rd6r3fd5ukey844uz&rid=giphy.gif&ct=g")
  const [speaker, setSpeaker] = useState("Randal Michel")

  const [blocked, setBlocked] = useState(['Click on character name in order to block quotes from them.'])


const options = {
  method: 'GET',
  url: 'https://marvel-quote-api.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': 'dc93ee594cmsh3d384c14d13a9edp19dd7fjsn4cb68636655f',
    'X-RapidAPI-Host': 'marvel-quote-api.p.rapidapi.com'
  }
};


  const fetchQuote = () => {

   
    axios.request(options).then(function (response) {

      if(blocked.includes(response.data.Speaker)){
       setQuote(`quotes from ${response.data.Speaker} are blocked.`)
      setTitle('Hit Generate again for a random quote')
      fetchGIF('BLOCKED')
      }else{

        
      console.log(response.data);
      setQuote(response.data.Quote)
      setTitle(response.data.Title)
      fetchGIF(response.data.Speaker)

       }

      }

    ).catch(function (error) {
      console.error(error);
    });
    
  
  };

  const fetchGIF = (speaker) => {

    axios.request(`https://api.giphy.com/v1/gifs/translate?api_key=p8ATwCVsmErawdfI34y7uECfYDnpg3aG&s=${speaker}`).then(res => {

    console.log(res)
      
      setGif(res.data.data.images.original.url)
      setSpeaker(speaker)
  }).catch(err => console.log(err))
      
    }

    const handleBlock = (e) => {

      if(e.target.innerText.slice(11) === 'BLOCKED') return 
    setBlocked(blocked.concat(e.target.innerText.slice(11))) 

      // console.log(blocked);
    }
  
  



  return (
    <div className="">
 

    <div className="quoteContainer">

      <div className="quotes">
      <img src={gif}/>
      <button onClick={fetchQuote}>Get Quote</button>
      <p>Movie: {title}</p>
      <button onClick={handleBlock}>Character: {speaker}</button>
      <p>Quote: {quote}</p>
      </div>
      <div className="blockedContainer">
    <h3 className="blocked">Blocked characters</h3>
    <ul>
      
       {blocked.map((name, i) => (
       <li key={i} className={i !== 0 ? 'blocked' : 'bloke'}>
          <p>{name}</p>
       </li>
         

        
      ))}
    
    </ul>
  </div>
    </div>
  
    </div>
  );
}


const BlockedDisplay = () => {
  return (
    <div className="blockedContainer">
    <h3>Blocked characters</h3>
  </div>
  )
}




function App() {
  return (
    <div className="App">
      <QuoteDisplay />
      {/* <BlockedDisplay />  */}

    </div>
  );
}

export default App
