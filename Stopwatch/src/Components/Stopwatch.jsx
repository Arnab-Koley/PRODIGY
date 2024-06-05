import React, { useState, useEffect } from 'react';
import ControlButtons from './ControlButtons';
import History from './History';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const start = () => setIsRunning(true);
    const pause = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };
    const saveLap = () => {
        if (!isRunning && time > 0) {
            const lastLap = laps.length > 0 ? laps[laps.length - 1] : 0;
            setLaps([...laps, { start: lastLap.end || 0, end: time, duration: time - (lastLap.end || 0) }]);
        }
    };

    return (
        <div className='flex flex-col justify-center'>
            <div className='text-3xl my-2 flex items-center justify-center mt-5'>{new Date(time).toISOString().slice(11, 22)}</div>
            <ControlButtons isRunning={isRunning} start={start} pause={pause} reset={reset} saveLap={saveLap} />
            {laps.length > 0 && <History laps={laps} />}
        </div>
    );
};

export default Stopwatch;
