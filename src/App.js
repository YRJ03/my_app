import React, { useState } from 'react';
import './App.css';

function App() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const increment = () => {
    if (num < 150) {
      setHistory([...history, num]);
      setNum(prevNum => Math.min(prevNum + 1, 150));
      setRedoStack([]);
    }
  };

  const decrement = () => {
    if (num > 0) {
      setHistory([...history, num]);
      setNum(prevNum => Math.max(prevNum - 1, 0));
      setRedoStack([]);
    }
  };

  const undo = () => {
    if (history.length > 0) {
      const lastValue = history.pop();
      setRedoStack([num, ...redoStack]);
      setNum(lastValue);
      setHistory(history);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextValue = redoStack.shift();
      setHistory([...history, num]);
      setNum(nextValue);
      setRedoStack(redoStack);
    }
  };

  return (
    <div className="App">
      <h1>Number: {num}</h1>
      <button onClick={decrement}>Subtract 1</button>
      <button onClick={increment}>Add 1</button>
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${(num / 150) * 100}%` }}>
        </div>
      </div>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}

export default App;
