import { useState } from 'react'
import he from 'he'
import { nanoid } from 'nanoid'

const userObj = {
    'question0': '',
    'question1': '',
    'question2': '',
    'question3': '',
    'question4': ''
}

export default function Question({ allQuestions, correctAns, setRestart }) {
    const [endScore, setEndScore] = useState(0)
    const [isFinished, setIsFinished] = useState(false)
    const [usersAnswers, setUsersAnswers] = useState(userObj)

    function restartGame() {
        setEndScore(0)
        setIsFinished(false)
        setUsersAnswers(userObj)
        setRestart(prev => !prev)
    }

    function checkFinished() {
        for (let elem in usersAnswers) {
            if (usersAnswers[elem] === '') return 1
        }
        return 0
    }

    function finishQuiz() {
        let score = 0
        let indexCorrectAns = 0
        for (let elem in usersAnswers) {
            usersAnswers[elem] === correctAns[indexCorrectAns] && score++
            indexCorrectAns++
        }
        setIsFinished(prev => !prev)
        setEndScore(score)
    }

    function handleChange(quest, indexQ) {
        if (!isFinished) {
            const nameAns = `question${indexQ}`
            setUsersAnswers(prev => {
                return {
                    ...prev,
                    [nameAns]: quest
                }

            })
        }
    }

    function checkColor(ans, indexQ) {
        let otv = ''
        ans === usersAnswers[`question${indexQ}`] ? otv = 'wrong' : ''
        ans === correctAns[indexQ] ? otv = 'right' : ''
        return otv
    }

    const isAllAns = checkFinished()
    return (
        <>
            <div className='container'>
                {allQuestions.map((elem, indexQ) => {
                    return (
                        <div
                            key={nanoid()}
                            className='quest-container'
                        >
                            <h2>{he.decode(elem.question)}</h2>
                            <div className='ans-container'>
                                {elem.answers.map(ans => {
                                    return (
                                        <h3
                                            key={nanoid()}
                                            // HERE
                                            className={
                                                `ans 
                                                ${usersAnswers[`question${indexQ}`] === ans && 'selected'} 
                                                ${isFinished && checkColor(ans, indexQ)}`
                                            }
                                            onClick={() => handleChange(ans, indexQ)}
                                        >
                                            {he.decode(ans)}
                                        </h3>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='end'>
                {!isFinished && <button
                    className='btn'
                    disabled={isAllAns}
                    onClick={finishQuiz}
                >
                    Check Results
                </button>}
            </div>
            {isFinished && (
                <div className='restart'>
                    <h2>{`you scored ${endScore}/${allQuestions.length} correct answers`}</h2>
                    <button className='btn' onClick={restartGame}>Restart Game</button>
                </div>)
            }
        </>
    )
}