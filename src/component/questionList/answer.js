import React, { memo } from 'react';

const Answers = memo(({correct, increaseScore, showButton, answers, isAnswered, classNames , classNamesHandler}) => {

    const answersList = answers ? answers : ['', '', '', ''];

    const checkAnswer = e => {
        if (!isAnswered) {
            let elem = e.currentTarget;
            let answer = Number(elem.dataset.id);

            if (answer === +correct) {
                classNames[answer - 1] = 'right';
                increaseScore();
            } else {
                classNames[answer - 1] = 'wrong';
            }
            classNamesHandler(classNames);
            showButton();
        }
    }

    return (
        <div id="answers">
            <ul>
                <li onClick={checkAnswer} className={classNames[0]} data-id="1"><span>A</span> <p>{answersList[0]}</p></li>
                <li onClick={checkAnswer} className={classNames[1]} data-id="2"><span>B</span> <p>{answersList[1]}</p></li>
                <li onClick={checkAnswer} className={classNames[2]} data-id="3"><span>C</span> <p>{answersList[2]}</p></li>
                <li onClick={checkAnswer} className={classNames[3]} data-id="4"><span>D</span> <p>{answersList[3]}</p></li>
            </ul>
        </div>
    );
})

export default Answers