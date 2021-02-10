import React, {useState, useEffect} from 'react';
import Answers from './answer';
import Popup from './Popup';
import {getDataFromSpreadsheets, setDataToSpreadsheets} from '../../helpers/spreadsheet'
import {useComponentWillMount} from "../../helpers/useComponentWillMount";
import happy_music from '../../images/happy_music.png'
import music_girl from '../../images/music_girl.svg'

const QuestionList = ({data, fullName}) => {
    const [number, setNumber] = useState(0)
    const [showButton, setShowButton] = useState(false)
    const [questionAnswered, setQuestionAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [displayPopup, setDisplayPopup] = useState('flex')
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState([])
    const [correct, setCorrect] = useState(0)
    const [classNames, setClassNames] = useState(['', '', '', '']);
    const [results, setResults] = useState([]);

    const total = data.length;

    const classNamesHandler = classNames => {
        setClassNames(classNames)
    }

    const pushData = number => {
        setQuestion(data[number].question)
        setAnswers([data[number].answers[0], data[number].answers[1], data[number].answers[2], data[number].answers[3]])
        setCorrect(data[number].correct)
        setNumber(number + 1)
    }

    const setResultsHandler = (data, error) => {
        if (data) {
            setResults(data)
        } else {
            console.log(error);
        }
    };

    const nextQuestion = () => {
        if (number === total) {
            setDisplayPopup('flex')
            setDataToSpreadsheets([...results, [fullName.firstName + ' ' + fullName.secondName, score]])
        } else {
            pushData(number);
            setShowButton(false)
            setQuestionAnswered(false)
            setClassNames(['', '', '', ''])
        }
    }

    const handleShowButton = () => {
        setShowButton(true);
        setQuestionAnswered(true)
    }

    const handleStartQuiz = () => {
        setDisplayPopup('none');
        setNumber(1)
    }

    const handleIncreaseScore = () => {
        setScore(score + 1)
    }

    useEffect(() => {
        getDataFromSpreadsheets(setResultsHandler, 'Week 1!A15:B60')
    }, []);

    useComponentWillMount(pushData, number);

    return (
        <div className="container">
            <div id='happy-music'>
                <img src={happy_music} alt="happy_music"/>
            </div>
            <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={handleStartQuiz}/>
            <div className="row">
                <div className="col-lg-10 col-lg-offset-1 question-list-full">
                    <div id="question">
                        <h4>Питання {number}/{total}</h4>
                        <p>{question}</p>
                    </div>
                    {answers.length &&
                    <Answers answers={answers} correct={correct} showButton={handleShowButton}
                             isAnswered={questionAnswered} increaseScore={handleIncreaseScore}
                             classNames={classNames} classNamesHandler={classNamesHandler}/>}
                    <div id="submit">
                        {showButton ?
                            <button
                                className="fancy-btn"
                                onClick={nextQuestion}>
                                {number === total ? 'Закінчити' : 'Наступне питання'} </button> : null}
                    </div>
                </div>
            </div>
            <div id='music-girl'>
                <img src={music_girl} alt="music_girl"/>
            </div>
        </div>
    );
};

export default QuestionList