import { useState, useEffect } from 'react'
import Form from './Form'

export default function Quiz() {
    const [dataQ, setDataQ] = useState(null)

    const [restart, setRestart] = useState(false)

    useEffect(() => {
        console.log('useEffect runned')
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setDataQ(data.results)
            })
        // .catch(err => {  разобраться как сделать вывод ошибки апи
        //     console.log(err)
        // })
    }, [restart])


    const correctAnswers = dataQ?.map(elem => {
        return elem.correct_answer
    })

    const allQuestAns = dataQ?.map(elem => {
        let answerArr = elem.incorrect_answers.map(incorrectElem => {
            return incorrectElem
        })
        answerArr.push(elem.correct_answer)
        return {
            question: elem.question,
            answers: answerArr
        }
    })

    // если апишка не работает
    if (!dataQ) {
        return (
            <div className='loading'>
                <h2>Loading...</h2>
                <h2>if doesn't load - try to refresh</h2>
            </div>
        )
    }

    return (
        <div className='quiz'>
            <Form
                allQuestAns={allQuestAns}
                correctAns={correctAnswers}
                setRestart={setRestart}
            />
        </div>
    )
}