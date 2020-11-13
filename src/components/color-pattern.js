import React from 'react';

const ColorPattern = ({ color, setColor }) => {
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
    ,
    [
      'live-cell-7-1',
      'live-cell-7-2',
      'live-cell-7-3',
      'live-cell-7-4',
      'live-cell-7-5',
    ],
    ,
    [
      'live-cell-8-1',
      'live-cell-8-2',
      'live-cell-8-3',
      'live-cell-8-4',
      'live-cell-8-5',
    ],
  ];

  return (
    <div
      class='colors-container'
      onClick={() => {
        const cColor = color + 1;

        if (color === color.length) color = 0;
        setColor(cColor);
      }}
    >
      <div className={`color-item ${colors[color][0]} `}>&nbsp;</div>
      <div className={`color-item ${colors[color][1]} `}>&nbsp;</div>
      <div className={`color-item ${colors[color][2]} `}>&nbsp;</div>
      <div className={`color-item ${colors[color][3]} `}>&nbsp;</div>
      <div className={`color-item ${colors[color][4]} `}>&nbsp;</div>
    </div>
  );
};

export default ColorPattern;
