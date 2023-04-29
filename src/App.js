import { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [stopwatch, setStopwatch] = useState("00:00:00");
  const [isActive, setIsActive] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    setIsActive(true);
    intervalRef.current = setInterval(() => updateStopwatch(), 17);
  };

  const stopStopwatch = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  const resetStopwatch = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setStopwatch("00:00:00");
    setTimeElapsed(0);
    setLaps([]);
  };

  const lapStopwatch = () => {
    setLaps((prevLaps) => [...prevLaps, { time: stopwatch }]);
  };

  const updateStopwatch = () => {
    setTimeElapsed((prevElapsedTime) => prevElapsedTime + 1);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  };

  useEffect(() => {
    setStopwatch(formatTime(timeElapsed));
  }, [timeElapsed]);

  useEffect(() => {
    const lapList = document.querySelector(".laps-container");
    if (lapList) {
      lapList.scrollTop = lapList.scrollHeight;
    }
  }, [laps]);

  return (
    <main>
      <h1>Stopwatch</h1>
      <h1>{stopwatch}</h1>
      <div>
        <button onClick={isActive ? stopStopwatch : startStopwatch}>
          {isActive ? "Stop" : "Start"}
        </button>
        <button disabled={!isActive} onClick={lapStopwatch}>
          Lap
        </button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>
      <div>
        <ul className="laps-container">
          {laps.map((lap, index) => (
            <li key={index}>
              <p>
                Lap {index + 1}: {lap.time}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
