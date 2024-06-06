import { useState, useEffect } from 'react'
import Form from './Form'

export default function Quiz({ dataQ }) {
    console.log(dataQ)

    const allQuestAns = dataQ?.map(elem => {
        let answerArr = elem.incorrect_answers.map(incorrectElem => {
            return {
                answer: incorrectElem,
                correct: false
            }
        })
        answerArr.push({ answer: elem.correct_answer, correct: true })
        return {
            question: elem.question,
            answers: answerArr
        }
    })

    return (
        <div className='quiz'>
            <Form allQuestAns={allQuestAns} />
        </div>
    )
}