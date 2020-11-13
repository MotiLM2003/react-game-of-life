import React, { useState, useEffect, useRef } from 'react';

import './styles/style.css';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';
import produce from 'immer';

import Header from './components/Header';
import Footer from './components/Footer';

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
  const [timerDelay, setTimerDelay] = useState(250);
  const [gridSize, setGridSize] = useState(25);
  const [isOnReSizing, setIsOnResizing] = useState(false);
  const [color, setColor] = useState(0);
  useEffect(() => {
    refreshGrid();
  }, [gridSize]);

  const [liveCells, setLiveCells] = useState(0);
  const [chanceToAppear, setChanceToAppear] = useState(42);

  useEffect(() => {
    refreshGrid();
  }, [chanceToAppear]);

  timerRef.current = timerDelay;
  const liveCellRef = useRef(liveCells);
  const sizeRef = useRef(null);
  const [cycles, setCycles] = useState(0);
  sizeRef.current = gridSize;

  const [grid, setGrid] = useState(setNewGrid);
  useEffect(() => {
    setIsOnResizing(false);
  }, [grid]);

  function setNewGrid() {
    const rows = [];
    const ran = Math.round(Math.random() * 1);

    for (let i = 0; i < parseInt(gridSize); i++) {
      rows.push(Array.from(Array(gridSize), setRandom));
    }
    return rows;
  }
  function setRandom() {
    let ran = getRandomNumber(1, 100);
    ran = ran <= chanceToAppear ? 1 : 0;
    return ran;
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleGridSize = (value) => {
    console.log('value:', value);
    setGridSize(parseInt(value));
  };

  const handleTimer = (value) => {
    setTimerDelay(value);
    timerRef.current = value;
  };

  runningRef.current = running;
  useEffect(() => {}, [liveCells]);
  // running init/update
  useEffect(() => {
    runningRef.current = running;
    if (running) {
      simulation();
    }
  }, [running]);

  function refreshGrid() {
    if (isOnReSizing) return;
    setIsOnResizing(true);
    setGrid(setNewGrid);
    cyclesCounter = 0;
  }
  const handleSetRunning = () => {
    setRunning(!running);
  };

  const resetData = () => {
    setCycles(0);
    setLiveCells(0);
  };
  let cyclesCounter = 0;
  const simulation = () => {
    if (!runningRef.current) {
      resetData();
      return;
    }
    let liveCellsCount = 0;
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < gridSize; i++) {
          if (g[i] === undefined) {
            return;
          }
          for (let k = 0; k < gridSize; k++) {
            if (g[i][k] === undefined) {
              return;
            }
            if (parseInt(gridCopy[i][k]) === 1) {
              liveCellsCount += 1;
            }
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
              const tempCopy = gridCopy[i][k];
              if (tempCopy !== undefined) {
                gridCopy[i][k] = 1;
              }
            }
          }
        }
      });
    });
    if (running) {
      setLiveCells(liveCellsCount);
    }

    liveCellRef.current = liveCellsCount;
    setTimeout(() => {
      if (running) {
        cyclesCounter = cyclesCounter + 1;
        setCycles(cyclesCounter);
      }

      simulation();
    }, timerRef.current);
  };

  return (
    <React.Fragment>
      <Header />
      <div className='contaienr'>
        <div className='stage'>
          <Controls
            handleSetRunning={handleSetRunning}
            running={running}
            handleTimer={handleTimer}
            timerDelay={timerDelay}
            gridSize={gridSize}
            handleGridSize={handleGridSize}
            cycles={cycles}
            liveCells={liveCells}
            refreshGrid={refreshGrid}
            chanceToAppear={chanceToAppear}
            setChanceToAppear={setChanceToAppear}
            color={color}
            setColor={setColor}
          />
          <GameGrid
            grid={grid}
            setGrid={setGrid}
            gridSize={gridSize}
            liveCells={liveCells}
            color={color}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
