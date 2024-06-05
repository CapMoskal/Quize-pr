import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {

    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=medium')
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
      })
  }, [])

  const dq = [
    {
      type: 'bollean',
      quest: 'blabla?',
      variants: [
        { ans: 'otvet 1', correct: false },
        { ans: 'otvet 2', correct: false },
        { ans: 'blabla', correct: true },
        { ans: 'otvet 4', correct: false }
      ]
    },
  ]

  return (
    <>
    </>
  )
}

export default App
