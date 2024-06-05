import React from 'react';
import { UilHistory } from '@iconscout/react-unicons'

const History = ({ laps }) => {
    return (
        <div>
            <h3 className='flex text-xl gap-2 bg-slate-400 items-center justify-center text-black font-bold py-1'><UilHistory size="25" color="black"/>History</h3>
            <ul>
                {laps.map((lap, index) => (
                    <div key={index} className='flex w-full bg-slate-500 my-1'>
                        <div className='bg-slate-700 p-2 flex items-center justify-center'>Lap {index + 1}</div>
                        <div className='bg-slate-600 p-2 flex items-center justify-center'>{new Date(lap.start).toISOString().slice(14, 22)} - {new Date(lap.end).toISOString().slice(14, 22)}</div>
                        <div className=' p-2 flex items-center justify-center'>{lap.duration / 1000} sec</div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default History;
