import { useState, useEffect } from 'react'
import Form from './Form'

export default function Quiz() {
    const [dataQ, setDataQ] = useState(null)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5')
            .then(res => res.json())
            .then(data => {
                setDataQ(data.results)
            })
        // .catch(err => {  разобраться как сделать вывод ошибки апи
        //     console.log(err)
        // })
    }, [])
    // чтобы видеть, что берем с апишки
    // console.log(dataQ)


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
            <>
                <h2>sorry api doesn't work for now</h2>
                <h2>try to refresh</h2>
            </>
        )
    }

    return (
        <div className='quiz'>
            <Form allQuestAns={allQuestAns} correctAns={correctAnswers} />
        </div>
    )
}