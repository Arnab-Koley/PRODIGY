import React from 'react';
import { UilPlay } from '@iconscout/react-unicons'
import { UilPause } from '@iconscout/react-unicons'
import { UilHistoryAlt } from '@iconscout/react-unicons'
import { UilSave } from '@iconscout/react-unicons'

const ControlButtons = ({ isRunning, start, pause, reset, saveLap }) => {
    return (
        <div className='flex gap-2 my-5'>
            {!isRunning ? 
                <button className='flex items-center justify-center py-1 px-2 border-2' onClick={start}><UilPlay size="30"/>Start</button> 
                : <button className='flex items-center justify-center py-1 px-2 border-2' onClick={pause}><UilPause size="30"/>Pause</button>}
            <button className='flex items-center justify-center py-1 px-2 border-2' onClick={reset}><UilHistoryAlt size="30"/>Reset</button>
            <button className='flex items-center justify-center py-1 px-2 border-2' onClick={saveLap} disabled={isRunning}><UilSave size="30"/>Save</button>
        </div>
    );
};

export default ControlButtons;
