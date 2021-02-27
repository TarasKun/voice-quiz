import React, {useState, useEffect} from 'react';

const CompoundTimer = ({timesUpHandler}) => {
    const [counter, setCounter] = useState(180);

    const timesUp = () => {
        timesUpHandler();
        return "Час вийшов";
    }

    const counterFormat = () => {
        let min = Math.floor(counter / 60);
        let sec = counter % 60;
        if (sec < 10) {
            sec = `0${sec}`
        }

        return `${min} : ${sec}`
    }

    useEffect(() => {
        counter >= 1 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <div>
            {counter === 0 ? timesUp() : counterFormat()}
        </div>
    );
}

export default CompoundTimer;