import React, { useEffect } from 'react';

const GameGridItem = ({ cell, toggleLife, liveCells }) => {
  useEffect(() => {}, [cell]);
  const liveClass1 = [
    'live-cell-1',
    'live-cell-2',
    'live-cell-3',
    'live-cell-4',
    'live-cell-5',
  ];
  const liveClass2 = [
    'live-cell-2-1',
    'live-cell-2-2',
    'live-cell-2-3',
    'live-cell-2-4',
    'live-cell-2-5',
  ];

  const liveClass3 = [
    'live-cell-3-1',
    'live-cell-3-2',
    'live-cell-3-3',
    'live-cell-3-4',
    'live-cell-3-5',
  ];

  const liveClass4 = [
    'live-cell-4-1',
    'live-cell-4-2',
    'live-cell-4-3',
    'live-cell-4-4',
    'live-cell-4-5',
  ];

  const liveClass5 = [
    'live-cell-5-1',
    'live-cell-5-2',
    'live-cell-5-3',
    'live-cell-5-4',
    'live-cell-5-5',
  ];

  const liveClass6 = [
    'live-cell-6-1',
    'live-cell-6-2',
    'live-cell-6-3',
    'live-cell-6-4',
    'live-cell-65-5',
  ];

  const getClass = () => {
    const rnd = Math.floor(Math.random() * liveClass1.length);
    // console.log('grid itme live cells: ', liveCells);
    if (liveCells <= 200) {
      return liveClass1[rnd];
    }
    if (liveCells <= 500) {
      return liveClass2[rnd];
    }
    if (liveCells <= 700) {
      return liveClass3[rnd];
    }
    if (liveCells <= 850) {
      return liveClass4[rnd];
    }
    if (liveCells <= 1000) {
      return liveClass5[rnd];
    } else {
      // (liveCells <= 60) {
      return liveClass6[rnd];
    }
  };

  return (
    <div
      onClick={toggleLife}
      className={`game-grid-item ${cell ? getClass() : 'dead-cell'}`}
    ></div>
  );
};

export default GameGridItem;
