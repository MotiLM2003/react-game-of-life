import React, { useState, useEffect } from 'react';

const GameGridItem = ({ cell, toggleLife }) => {
  useEffect(() => {}, [cell]);
  return (
    <div
      onClick={toggleLife}
      className={`game-grid-item ${cell ? 'live-cell' : 'dead-cell'}`}
    ></div>
  );
};

export default React.memo(GameGridItem);
