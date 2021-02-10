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
                // discoveryDocs: config.discoveryDocs,
            })
            .then(() => {
                getDataFromSpreadsheets(setQuestionsHandler, 'Week 1!A2:F11');
            });
    };

    // function authenticate() {
    //     return window.gapi.auth2.getAuthInstance()
    //         .signIn({scope: "https://www.googleapis.com/auth/spreadsheets"})
    //         .then(() => {
    //             console.log("Sign-in successful");
    //             loadClient()
    //             },
    //             (err) => { console.error("Error signing in", err);
    //         });
    // }

    function loadClient() {
        window.gapi.client.setApiKey(config.apiKey);
        return window.gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
            .then(
                () => {
                    console.log("GAPI client loaded for API");
                    getDataFromSpreadsheets(setQuestionsHandler, 'Week 1!A2:F11')
                },
                (err) => {
                    console.error("Error loading GAPI client for API", err);
                });
    }

    // const initClient = () => {
    //     window.gapi.client
    //         .init({
    //             apiKey: config.apiKey,
    //             discoveryDocs: config.discoveryDocs,
    //         })
    //         .then(() => {
    //             getDataFromSpreadsheets(setQuestionsHandler, 'Week 1!A2:F11');
    //         });
    // };

        // useEffect(() => {
        //     window.gapi.load("client", initClient);
        // }, []);
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