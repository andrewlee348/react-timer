import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const fiveMinutes = new Date(300000);
  const [timer, setTimer] = useState(fiveMinutes);
  const intervalId = useRef(null);

  const formatDate = (dateObject) => {
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const paddedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${paddedSeconds}`;
  };

  const startTimer = () => {
    intervalId.current = setInterval(() => {
      setTimer((remaining) => new Date(remaining - 1000));
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalId === null) {
      return;
    }
    clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const resetTimer = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
    }
    setTimer(fiveMinutes);
  };

  useEffect(() => {
    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return (
    <div style={{ margin: "25px" }}>
      <p>{formatDate(timer)}</p>
      <div
        style={{
          display: "flex",
          width: "150px",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => startTimer()}>Start</button>
        <button onClick={() => stopTimer()}>Stop</button>
        <button onClick={() => resetTimer()}>Reset</button>
      </div>
    </div>
  );
}

export default App;
