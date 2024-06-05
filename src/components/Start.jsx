import React from 'react'

export default function Start({ setStart }) {
    return (
        <div className='start'>
            <h1>Quizzical</h1>
            <h4>Just try to have some fun</h4>
            <button onClick={() => setStart(prev => !prev)} >Start Quiz</button>
        </div>
    )
}