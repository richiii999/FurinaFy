import { useState } from 'react'
import MainScreen from "./modules/MainScreen";
import './styles/App.css'
import SongCard from './modules/SongCard.jsx'
import './styles/SongCard.css'


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      {/*<SongCard/>*/}
      <MainScreen/>
      <p>pp</p>
    </>
  )
}

export default App
