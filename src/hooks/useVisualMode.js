import { useState } from "react";

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    const tempHistory = [...history]
    if (replace) {
      tempHistory.pop();
      setHistory([...tempHistory]);
    } 
      setHistory([...tempHistory, newMode]);
      return setMode(newMode) 
    
  }

  const back = function () {

    const tempHistory =  [...history];
    tempHistory.pop();

    setHistory([tempHistory]);
    const prevMode = tempHistory[tempHistory.length - 1];

    if(tempHistory.length > 0) {
      return setMode(prevMode);
    }
  }

  return (
    { mode, transition, back }
  )
};