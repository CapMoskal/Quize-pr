import { useState, useEffect } from 'react'
import Question from './Question'

export default function Quiz({ dataQ }) {
    console.log(dataQ)

    const questionsArray = dataQ.map(elem => {
        let temp = elem.incorrect_answers.map(incorrectElem => {
            return {
                answer: incorrectElem,
                correct: false
            }
        })
        temp.push({ answer: elem.correct_answer, correct: true })
        return temp
    })



    // перенести эту функцию в Question
    // промапать основной массив при рэндере и шафлить в Question 
    // ответы, расставляя по местам
    // бля как же я заебался
    function shuffleArray(array) {
        let shuffledArray = array.slice(); // Создаем копию массива, чтобы не изменять исходный
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    questionsArray.forEach(elem => {
        console.log(shuffleArray(elem))
    })





    return (
        <div className='quiz'>
            Quiz goes here
        </div>
    )
}