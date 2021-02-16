import React, {useState, useEffect} from 'react';
import config from './../../config';
import {getDataFromSpreadsheets} from '../../helpers/spreadsheet.js';
import {useStyles} from "./quizWrapper.styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import QuestionList from "../questionList/QuestionList";

const QuizWrapper = ({fullName}) => {
    const classes = useStyles();
    const [questions, setQuestions] = useState([])
    const [error, setError] = useState([])


    const authenticate = () => {
        window.gapi.client
            .init({
                apiKey: config.apiKey,
            })
            .then(() => {
                getDataFromSpreadsheets(setQuestionsHandler, 'Week1_question!A2:F11');
            });
    };

    useEffect(() => {
        authenticate();
    }, []);

    const setQuestionsHandler = (data, error) => {
        if (data) {
            const {questions} = data;
            setQuestions(questions)
        } else {
            setError(error);
        }
    };

    window.gapi.load("client:auth2", function() {
        window.gapi.auth2.init({client_id: config.clientId});
    });

    if (error.message) {
        return (<div>Помилка</div>)
    }

    return (
        <>
            {!questions.length ?
                <div className={classes.spinner}><CircularProgress/></div> :
                <QuestionList data={questions} fullName={fullName}/>}
        </>
    )
}
export default QuizWrapper;