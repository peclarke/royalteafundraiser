import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import svg from './250.svg';

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <>
    <img src={svg} />
    </>
  )
}

export default App
