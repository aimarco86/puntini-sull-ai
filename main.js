const { useState, useRef, useEffect } = React;

function formatTime(s) {
  const min = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const handleStop = () => {
    setIsRunning(false);
    setSeconds(0);
    clearInterval(timerRef.current);
  };

  const handleRestart = () => {
    setSeconds(0);
    setIsRunning(true);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(seconds)}</div>
      <div className="timer-buttons">
        <button onClick={handleStart} disabled={isRunning}>Start</button>
        <button onClick={handlePause} disabled={!isRunning}>Pause</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Timer />);