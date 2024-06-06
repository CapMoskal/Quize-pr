import { useState } from 'react'
import he from 'he'

export default function Form({ allQuestAns }) {
    console.log(allQuestAns)
    // сохранить массив правильных ответов, чтобы
    // потом сравнить ответы пользователя

    // при выборе ответа пользователем сохранять его 
    // ответы, чтобы потом сравнить с массивом правильных

    const correctAns = allQuestAns.map(elem => {
        elem.answers.forEach(ans => {
            if (ans.correct) {
                return ans.answer
            }
        })
    })
    console.log(correctAns)

    const [formData, setFormData] = useState(
        {
            question0: '',
            question1: '',
            question2: '',
            question3: '',
            question4: ''
        }
    )

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





    function getInputs(ansArr) {
        // зашафлить и раскидать вопросы по инпутам
        // добавить необходимые свойства к каждому инпуту
    }

    const questArr = allQuestAns?.map((elem, index) => {
        console.log('index >>> '+index)
        return (
            <div key={index} className='quest'>
                <h2>{he.decode(elem.question)}</h2>
                {/* {() => getInputs(elem.answers)} */}
                <input
                    type="radio"
                    id={index}
                    name={`question0`}
                    // name={`question1-4`} у дргих будут свой индекс question
                    value=''
                    onChange={getInputs}
                />
                <label htmlFor={index}></label>
            </div>
        )
    })






    // console.log(formData)
    return (
        <form>
            {questArr}
        </form>
    )
}