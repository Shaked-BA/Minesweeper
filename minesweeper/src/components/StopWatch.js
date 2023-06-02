import { useEffect } from 'react';
import { FaRegClock } from "react-icons/fa";

import '../styles/StopWatch.css';


function Stopwatch({time, setTime}) {
  const incrementTime = () => {
    setTimeout(() => {setTime(prevTime => prevTime + 1)}, 1000);
  }

  useEffect(incrementTime, [time, setTime]);

  return (
    <div className="timer">
      <FaRegClock className="clock"/>
      {time}
    </div>
  );
}

export default Stopwatch;
