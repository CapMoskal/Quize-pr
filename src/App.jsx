import { useState, useEffect } from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  
  return (
    <>
      {start ? <Quiz /> : <Start setStart={setStart} />}
    </>
  )
}

export default App
