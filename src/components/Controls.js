import React from 'react';

const Controls = ({
  handleTimer,
  running,
  timerDelay,
  handleSetRunning,
  gridSize,
  handleGridSize,
}) => {
  const handleSlider = (e) => {
    handleTimer(e.target.value);
  };

  const handleSize = (e) => {
    handleGridSize(e.target.value);
  };
  return (
    <div>
      <button onClick={handleSetRunning}>{running ? 'Stop' : 'Run'}</button>
      <input
        type='range'
        min='1'
        max='1000'
        value={timerDelay}
        onChange={handleSlider}
      />

      <input
        type='range'
        min='10'
        max='150'
        value={gridSize}
        onChange={handleSize}
      />
    </div>
  );
};

export default Controls;
