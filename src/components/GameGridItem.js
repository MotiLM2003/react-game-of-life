import React, { useEffect } from 'react';

const GameGridItem = ({ cell, toggleLife, liveCells, colorIndex }) => {
  useEffect(() => {}, [cell]);
  const colors = [
    ['live-cell-1', 'live-cell-2', 'live-cell-3', 'live-cell-4', 'live-cell-5'],
    [
      'live-cell-2-1',
      'live-cell-2-2',
      'live-cell-2-3',
      'live-cell-2-4',
      'live-cell-2-5',
    ],
    [
      'live-cell-3-1',
      'live-cell-3-2',
      'live-cell-3-3',
      'live-cell-3-4',
      'live-cell-3-5',
    ],

    [
      'live-cell-4-1',
      'live-cell-4-2',
      'live-cell-4-3',
      'live-cell-4-4',
      'live-cell-4-5',
    ],
    [
      'live-cell-5-1',
      'live-cell-5-2',
      'live-cell-5-3',
      'live-cell-5-4',
      'live-cell-5-5',
    ],
    [
      'live-cell-6-1',
      'live-cell-6-2',
      'live-cell-6-3',
      'live-cell-6-4',
      'live-cell-6-5',
    ],
    [
      'live-cell-7-1',
      'live-cell-7-2',
      'live-cell-7-3',
      'live-cell-7-4',
      'live-cell-7-5',
    ],
    [
      'live-cell-8-1',
      'live-cell-8-2',
      'live-cell-8-3',
      'live-cell-8-4',
      'live-cell-8-5',
    ],
  ];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  console.log(colorIndex, 'coloridnex');
  return (
    <div
      onClick={toggleLife}
      className={`game-grid-item ${
        cell
          ? colors[colorIndex][getRandomNumber(0, colors[colorIndex].length)]
          : 'dead-cell'
      }`}
    ></div>
  );
};

export default React.memo(GameGridItem);
