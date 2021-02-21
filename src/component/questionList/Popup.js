import React, {useEffect, useState} from 'react';

const Popup = ({startQuiz, style, score}) => {
    const [time, setTime] = useState('start')
    const [title, setTitle] = useState('Вітаю у нашій вікторині')
    const [text, setText] = useState('Я не знаю, що тут написит, нехай буде як є')
    const [buttonText, setButtonText] = useState('Старт')

    const popupHandler = () => {
        if (time === 'start') {
            setTime('end')
            setTitle('Вітаю')
            setText('Час вийшов')
            setButtonText('Завершити')
            startQuiz();
        } else {
            window.location.reload();
        }
    }

    useEffect(()=>{
        if(score >= 5) {
            setText('Ви відповіли правильно на ' + score + ' питань')
        } else if (score <= 4 && score > 0) {
            setText('Ви відповіли правильно на ' + score + ' питання')
        } else setText('У вас є 10 запитань, та 3 хвилини, щоб відповісти. Успіху.')
    }, [score])

    return (
        <div className="popup-container" style={style}>
            <div className="container center">
                <div className="col-md-8 col-md-offset-2">
                    <div className="popup">
                        <h1>{title}</h1>
                        <p>{text}</p>
                        <button className="fancy-btn" onClick={popupHandler}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup