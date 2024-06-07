import { useState, useMemo } from 'react'
import he from 'he'

export default function Form({ allQuestAns, correctAns }) {
    console.log(correctAns)

    // чтобы видеть, что приходит с Quiz
    // console.log(allQuestAns)

    // при выборе ответа пользователем сохранять его 
    // ответы в formData, чтобы потом сравнить с массивом правильных

    const [endScore, setEndScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [formData, setFormData] = useState(
        {
            question0: '',
            question1: '',
            question2: '',
            question3: '',
            question4: ''
        }
    )
    // console.log(formData)

    const isFinished = () => {
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
        setFormData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    function getInputs(ansArr, indexQ) {
        let shuffledArr = shuffleArray(ansArr)
        // зашафлить и раскидать вопросы по инпутам
        // добавить необходимые свойства к каждому инпуту
        const inputsQ = shuffledArr?.map((elem, index) => {
            return (
                <label key={`${indexQ}-${index}`} htmlFor={`${indexQ}-${index}`}>
                    <input
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

    // функция заканчивает квиз, считает очки и рендерит результат
    function finishQuiz(e) {
        e.preventDefault()
        let score = 0
        let indexCorrectAns = 0
        for (let elem in formData) {
            formData[elem] === correctAns[indexCorrectAns] && score++
            indexCorrectAns++
        }
        console.log('---------------')
        console.log('score = ' + score)
        console.log('---------------')
        setFinished(prev => !prev)
        setEndScore(score)
    }

    const questArr = useMemo(() => {
        return allQuestAns?.map((elem, index) => {
            const inputs = getInputs(elem.answers, index)
            return (
                <div key={index} className='quest'>
                    <h2>{he.decode(elem.question)}</h2>
                    {inputs}
                </div>
            )
        })
    }, [allQuestAns])

    // console.log(formData)
    return (
        <div className='form'>
            <form>
                {questArr}
                {!finished && <button onClick={finishQuiz}>Chek results</button>}
            </form>
            <div className='restart'>
                {finished && <h2>{endScore}</h2>}
                {finished && <button>restart game</button>}
            </div>
        </div>
    )
}

// 1) финиш нельзя нажимать пока на все не ответить!!!!
// 2) рестарт должен работать
// 3) сделать красивый подсчет и настроить стили хз че нибудь еще додумаю 