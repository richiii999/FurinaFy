import { useState } from 'react'
import MainScreen from "./modules/MainScreen";
import './styles/App.css'

import SongCard from './modules/SongCard.jsx'

import './styles/SongCard.css'
import PlayStory from './modules/play.jsx';

function App() {
  const [count, setCount] = useState(0)
  
  return (

    
      <><PlayStory></PlayStory><MainScreen></MainScreen></>
    
    
  )
}

export default App
