import React, { useState, useEffect, useCallback, useRef } from 'react';

import './styles/style.css';
import GameGrid from './components/GameGrid';
import Controls from './components/Controls';
import produce from 'immer';
import { _ } from 'lodash.random';
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
  const [timerDelay, setTimerDelay] = useState(100);
  const [gridSize, setGridSize] = useState(25);
  useEffect(() => {
    refreshGrid();
    console.log('refresh');
  }, [gridSize]);

  const [liveCells, setLiveCells] = useState(0);
  const [chanceToAppear, setChanceToAppear] = useState(22);

  useEffect(() => {
    refreshGrid();
  }, [chanceToAppear]);

  timerRef.current = timerDelay;
  const liveCellRef = useRef(liveCells);
  const sizeRef = useRef(null);
  const [cycles, setCycles] = useState(0);
  sizeRef.current = gridSize;

  const [grid, setGrid] = useState(setNewGrid);

  function setNewGrid() {
    const rows = [];
    const ran = Math.round(Math.random() * 1);

    for (let i = 0; i < parseInt(gridSize); i++) {
      console.log('grid-size', gridSize);
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
    //console.log('value', value);
    setGridSize(value);
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

  const refreshGrid = () => {
    setRunning(false);
    console.log('refresh', gridSize);
    setGrid(setNewGrid);

    cyclesCounter = 0;
  };
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
          for (let k = 0; k < gridSize; k++) {
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
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    if (running) {
      setLiveCells(liveCellsCount);
    }

    liveCellRef.current = liveCellsCount;
    // console.log('liveCells', liveCellRef.current);
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
      <div class='contaienr'>
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
          />
          <GameGrid
            grid={grid}
            setGrid={setGrid}
            gridSize={gridSize}
            liveCells={liveCells}
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
