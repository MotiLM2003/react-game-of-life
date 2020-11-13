import React from 'react';
import ColorPattern from './color-pattern';

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
  color,
  setColor,
}) => {
  const handleSlider = (e) => {
    handleTimer(e.target.value);
  };

  const handleSize = (e) => {
    handleGridSize(e.target.value);
  };
  return (
    <div className='controllers'>
      <div>
        <div style={{ width: '100%' }}>
          <h3>Colors Pattern</h3>
          <ColorPattern color={color} setColor={setColor} />
        </div>
      </div>
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
          <span>{timerDelay}ms</span>
        </div>
      </div>
      <div>
        <div>
          <h3>Grid size</h3>
          <input
            type='range'
            min='10'
            max='42'
            value={gridSize}
            onChange={handleSize}
          />
          <span>
            {gridSize}x{gridSize}
          </span>
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
