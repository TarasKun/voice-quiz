import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import QuizWrapper from "../quizWrapper/QuizWrapper";
import mcLogo from '../../images/mcLogo.png'
import composeMusic from '../../images/compose_music.svg'
import music_girl from "../../images/music_girl.svg";

export default function SignIn() {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [personalData, setPersonalData] = useState(false)

    const firstNameHandler = (e) => {
        setFirstName(e.target.value)
    }

    const secondNameHandler = (e) => {
        setSecondName(e.target.value)
    }

    const signInHandler = () => {
        if (firstName && secondName) {
            setPersonalData(true)
        }
    }

    const fullName = {
        firstName,
        secondName
    }

    return (
        <>
            {personalData ? <QuizWrapper fullName={fullName}/> :
                <div className="container signIn">
                    <div className="row">
                        <div className="col-lg-10 col-lg-offset-1">
                            <div id='signInContainer'>
                                <div id='mcLogo'>
                                    <img src={mcLogo} alt="mcLogo"/>
                                </div>
                                <div id='composeMusic'>
                                    <img src={composeMusic} alt="mcLogo"/>
                                </div>
                                <div id='sign-in-title'>
                                    <span>УВІЙТИ</span>
                                </div>
                                <div className='text-fields text-fields-full'>
                                    <TextField
                                        margin="normal"
                                        required
                                        label="Ім'я"
                                        name="Name"
                                        autoFocus
                                        onChange={firstNameHandler}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        name="surname"
                                        label="Прізвище"
                                        type="surname"
                                        id="surname"
                                        onChange={secondNameHandler}
                                    />
                                    <div id="submit" className={'btn-grad'} onClick={signInHandler}>
                                        Вхід
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='music-girl'>
                        <img src={music_girl} alt="music_girl"/>
                    </div>
                </div>
            }
        </>
    )
}