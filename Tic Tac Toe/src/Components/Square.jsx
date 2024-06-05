import React from 'react';

const Square = ({ value, onClick, highlight }) => {
  return (
    <button className={` text-2xl text-white w-[60px] h-[60px] border-[1px] ${highlight ? 'highlight' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
