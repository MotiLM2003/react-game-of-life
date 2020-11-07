import React, { useState, useEffect, useCallback, useRef } from 'react';

import './styles/style.css';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';
import produce from 'immer';

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const App = () => {
  const [running, setRunning] = useState(false);
  const runningRef = useRef();
  const timerRef = useRef();
  const [timerDelay, setTimerDelay] = useState(50);
  const [gridSize, setGridSize] = useState(100);
  timerRef.current = timerDelay;
  const sizeRef = useRef(null);
  sizeRef.current = gridSize;
  const [grid, setGrid] = useState(() => {
    const rows = [];
    const ran = Math.round(Math.random() * 1);

    for (let i = 0; i < gridSize; i++) {
      const ran = Math.round(Math.random() * 1);

      rows.push(Array.from(Array(gridSize), (value) => ran));
    }
    return rows;
  });

  const handleGridSize = (value) => {
    setGridSize(value);
    timerRef.current = value;
  };

  const handleTimer = (value) => {
    setTimerDelay(value);
    timerRef.current = value;
  };

  runningRef.current = running;
  useEffect(() => {
    runningRef.current = running;
    if (running) {
      setGrid(() => {
        const rows = [];
        const ran = Math.round(Math.random() * 1);

        for (let i = 0; i < gridSize; i++) {
          const ran = Math.round(Math.random() * 1);

          rows.push(Array.from(Array(gridSize), (value) => ran));
        }
        return rows;
      });
      simulation();
    }
  }, [running]);

  const handleSetRunning = () => {
    setRunning(!running);
  };

  const simulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          for (let k = 0; k < gridSize; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI > 0 && newI < gridSize && newK >= 0 && newK < gridSize) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(() => {
      simulation();
    }, timerRef.current);
  }, []);

  return (
    <div>
      <Controls
        handleSetRunning={handleSetRunning}
        running={running}
        handleTimer={handleTimer}
        timerDelay={timerDelay}
        gridSize={gridSize}
        handleGridSize={handleGridSize}
      />
      <GameGrid grid={grid} setGrid={setGrid} gridSize={gridSize} />
    </div>
  );
};

export default App;
