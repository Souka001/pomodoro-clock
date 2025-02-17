import { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PomodoroClock from './components/PomodoroClock';


function App() {
  const [count, setCount] = useState(0)

  return (
    <PomodoroClock/>
  )
}

export default App
