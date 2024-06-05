import React from 'react';
import Stopwatch from './Components/Stopwatch';
import { UilStopwatch } from '@iconscout/react-unicons'

const App = () => {
    return (
      <div className='flex items-center w-full justify-center'>
        <div className='flex  justify-center text-white flex-col items-center mt-10 bg-bg2 w-[350px] rounded-[15px] pb-10'>
            <h1 className='text-3xl bg-slate-400 w-full px-5 py-2 rounded-t-[15px] flex items-center justify-center text-slate-900 font-bold '><UilStopwatch size="40" color="black"/>Stopwatch</h1>
            <Stopwatch />
        </div>
      </div>
    );
};

export default App;
