import React from 'react';
import Timer from 'react-compound-timer'

const CompoundTimer = ({timesUpHandler}) => {
    return (
        <Timer
            initialTime={180_000}
            direction="backward"
            checkpoints={[
                {
                    time: 0,
                    callback: () => timesUpHandler(),
                }
            ]}
        >
            {() => (
                <div className='timer'>
                    <Timer.Minutes/>:
                    <Timer.Seconds/>
                </div>
            )}
        </Timer>
    )
}

export default CompoundTimer;