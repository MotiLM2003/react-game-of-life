import React from 'react';

const Controls = ({
  handleTimer,
  running,
  timerDelay,
  handleSetRunning,
  gridSize,
  handleGridSize,
  cycles,
  liveCells,
  refreshGrid,
  chanceToAppear,
  setChanceToAppear,
}) => {
  const handleSlider = (e) => {
    handleTimer(e.target.value);
  };

  const handleSize = (e) => {
    handleGridSize(e.target.value);
  };
  return (
    <div class='controllers'>
      <div>
        <div>
          <h3>Timelapse</h3>
          <input
            type='range'
            min='1'
            max='1000'
            value={timerDelay}
            onChange={handleSlider}
          />
          <span>{timerDelay}</span>
        </div>
      </div>
      <div>
        <div>
          <h3>Grid size</h3>
          <input
            type='range'
            min='10'
            max='150'
            value={gridSize}
            onChange={handleSize}
          />
          <span>{gridSize}</span>
        </div>
      </div>

      <div>
        Cycles: <span>{cycles}</span>
      </div>
      <div>
        Live cells: <span>{liveCells}</span>
      </div>

      <div>
        <div>
          <h3>Cell live %</h3>
          <input
            type='range'
            min='0'
            max='100'
            value={chanceToAppear}
            onChange={(e) => {
              setChanceToAppear(e.target.value);
            }}
          />
          <span>{chanceToAppear}</span>
        </div>
      </div>
      <div>
        <button className='btn' onClick={handleSetRunning}>
          {running ? 'Stop' : 'Run'}
        </button>
        <button className='btn' onClick={refreshGrid}>
          {running ? 'Refresh' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default Controls;
