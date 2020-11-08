import React from 'react';
import produce from 'immer';
import GameGridItem from './GameGridItem';

const GameGrid = ({ grid, setGrid, gridSize, liveCells }) => {
  const toggleLife = (x, y) => {
    const newGrid = produce(grid, (copy) => {
      copy[x][y] = copy[x][y] ? 0 : 1;
    });

    setGrid(newGrid);
  };

  return (
    <div
      className='grid-container'
      style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr` }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => {
          return (
            <GameGridItem
              key={`${rowIndex}-${colIndex}`}
              cell={grid[rowIndex][colIndex]}
              liveCells={liveCells}
              toggleLife={() => {
                toggleLife(rowIndex, colIndex);
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default GameGrid;
