import { useState } from 'react'
import MainScreen from "./modules/MainScreen";
import './styles/App.css'

import SongCard from './modules/SongCard.jsx'
import './styles/songCard.css'

import DropdownTest from './modules/DropdownTest.jsx'
import './styles/dropdownTest.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
        <SongCard/>
        <SongCard name="Test Song" artist="Test Artist" length="1:23"/>
    </>
  )
}

export default App
