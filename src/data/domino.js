import React from 'react';
import '../App.scss';

const Domino = ({ FirstNumber, LastNumber, onSelectionChange }) => {
    const handleClick = () => {
      onSelectionChange(FirstNumber, LastNumber);
    };
  
    return (
      <div className="domino" onClick={handleClick}>
        <div className="top">{FirstNumber}</div>
        <div className="bottom">{LastNumber}</div>
      </div>
    );
};

  export default Domino;