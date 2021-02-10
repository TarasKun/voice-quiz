import React, {useEffect, useState} from 'react';

const Popup = ({startQuiz, style, score}) => {
    const [time, setTime] = useState('start')
    const [title, setTitle] = useState('Вітаю у нашій вікторині')
    const [text, setText] = useState('Я Марусін помічник! ПОМІЧНИК! ПОМІЧНИК!Я Марусін помічник! ПОМІЧНИК! ПОМІЧНИК!')
    const [buttonText, setButtonText] = useState('Старт')

    const popupHandle = () => {
        if (time === 'start') {
            setTime('end')
            setTitle('Вітаю')
            setText('Ви відповіли правильно на ' + score + ' питань')
            setButtonText('Завершити')
            startQuiz();
        } else {
            window.location.reload();
        }
    }

    const createMarkup = text => {
        return {__html: text};
    }

    return (
        <div className="popup-container" style={style}>
            <div className="container center">
                <div className="col-md-8 col-md-offset-2">
                    <div className="popup">
                        <h1>{title}</h1>
                        <p dangerouslySetInnerHTML={createMarkup(text)}/>
                        <button className="fancy-btn" onClick={popupHandle}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup