import { useState, useMemo } from 'react'
import he from 'he'

export default function Form({ allQuestAns, correctAns, setRestart }) {
    console.log(allQuestAns)

    const [endScore, setEndScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [usersAnswers, setUsersAnswers] = useState(
        {
            question0: '',
            question1: '',
            question2: '',
            question3: '',
            question4: ''
        }
    )

    function restartGame() {
        setEndScore(0)
        setFinished(false)
        setUsersAnswers({
            question0: '',
            question1: '',
            question2: '',
            question3: '',
            question4: ''
        })
        setRestart(prev => !prev)
    }

    function shuffleArray(array) {
        let shuffledArray = array.slice(); // Создаем копию массива, чтобы не изменять исходный
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function handleChange(e) {
        const { name, value } = e.target
        setUsersAnswers(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function checkFinished() {
        for (let elem in usersAnswers) {
            if (usersAnswers[elem] === '') return 1
        }
        return 0
    }

    function finishQuiz(e) {
        e.preventDefault()
        let score = 0
        let indexCorrectAns = 0
        for (let elem in usersAnswers) {
            usersAnswers[elem] === correctAns[indexCorrectAns] && score++
            indexCorrectAns++
        }
        setFinished(prev => !prev)
        setEndScore(score)
    }

    function getInputs(ansArr, indexQ) {
        let shuffledArr = shuffleArray(ansArr)
        const inputsQ = shuffledArr?.map((elem, index) => {
            return (
                <label
                    className='label-q'
                    key={`${indexQ}-${index}`}
                    htmlFor={`${indexQ}-${index}`}
                >
                    <input
                        className='input-q'
                        type="radio"
                        id={`${indexQ}-${index}`}
                        name={`question${indexQ}`}
                        value={elem}
                        onChange={handleChange}
                    />
                    {he.decode(elem)}
                </label>
            )
        })
        return inputsQ
    }

    const questArr = useMemo(() => {
        return allQuestAns?.map((elem, index) => {
            const inputs = getInputs(elem.answers, index)
            return (
                <div key={index} className='quest'>
                    <h2>{he.decode(elem.question)}</h2>
                    <div className='inputs'>
                        {inputs}
                    </div>
                </div>
            )
        })
    }, [allQuestAns])

    const isAllAns = checkFinished()
    return (
        <div className='form'>
            <form>
                {questArr}
                {!finished && <button disabled={isAllAns} onClick={finishQuiz}>Chek results</button>}
            </form>
            {finished && <div className='restart'>
                <h2>{`you scored ${endScore}/5 correct answers`}</h2>
                <button onClick={restartGame}>restart game</button>
            </div>}
        </div>
    )
}