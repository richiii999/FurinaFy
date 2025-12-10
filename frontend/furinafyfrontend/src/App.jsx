import { useState } from 'react'
import MainScreen from "./modules/MainScreen";
import './styles/App.css'

import SongCard from './modules/SongCard.jsx'
import './styles/songCard.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
        <MainScreen/>
    </>
  )
}

export default App
