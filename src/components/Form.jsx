import React from 'react'

export default function Form({ allQuestAns }) {
    function shuffleArray(array) {
        let shuffledArray = array.slice(); // Создаем копию массива, чтобы не изменять исходный
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    // const shuffledAnswArr = shuffleArray(answArr).map(elem => {

    // })

    return (
        <h1>???</h1>
        // <label>{quest}
        //     <input type="radio" name='quest'/>
        //     <input type="radio" name='quest'/>
        //     <input type="radio" name='quest'/>
        //     <input type="radio" name='quest'/>
        // </label>
    )
}