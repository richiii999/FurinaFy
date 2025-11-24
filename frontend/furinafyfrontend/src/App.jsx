import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

import SongCard from './modules/SongCard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SongCard/>
    </>
  )
}

export default App
