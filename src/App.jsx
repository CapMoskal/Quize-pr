import { useState, useEffect } from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

function App() {
  const [start, setStart] = useState(false)
  const [dataQ, setDataQ] = useState(null)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {
        // console.log(data.results)
        setDataQ(data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <>
      {start ? <Quiz dataQ={dataQ} /> : <Start setStart={setStart} />}
    </>
  )
}

export default App
