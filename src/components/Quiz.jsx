import { useState, useEffect } from 'react'
import Question from './Question'

export default function Quiz() {
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [allQuestions, setAllQuestions] = useState(null)
    const [dataQ, setDataQ] = useState(null)
    const [restart, setRestart] = useState(false)

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=15&difficulty=medium')
            .then(res => res.json())
            .then(data => {
                setDataQ(data.results)

                setCorrectAnswers(data.results?.map(elem => elem.correct_answer))

                setAllQuestions(data.results?.map(elem => {
                    let answerArr = elem.incorrect_answers.map(incorrectElem => incorrectElem)
                    answerArr.push(elem.correct_answer)
                    return {
                        question: elem.question,
                        answers: shuffleArray(answerArr)
                    }
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [restart])

    function shuffleArray(array) {
        let shuffledArray = array.slice(); // Создаем копию массива, чтобы не изменять исходный
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

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
            <Question
                allQuestions={allQuestions}
                correctAns={correctAnswers}
                setRestart={setRestart}
            />
        </div>
    )
}