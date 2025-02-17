import React, { useState, useEffect, useRef } from 'react';
import beepSound from '../assets/beepSound.wav';

const PomodoroClock = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const audioBeep = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            audioBeep.current.play();
            if (isSession) {
              setIsSession(false);
              return breakLength * 60;
            } else {
              setIsSession(true);
              return sessionLength * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, breakLength, sessionLength, isSession]);

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsSession(true);
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div  id='global' className="container text-center">
      <h1>25 + 5 Clock</h1>
      <div className="row">
        <div className="col">
          <h2 id="break-label">Break Length</h2>
          <button id="break-decrement" onClick={() => setBreakLength(Math.max(1, breakLength - 1))}>-</button>
          <span id="break-length">{breakLength}</span>
          <button id="break-increment" onClick={() => setBreakLength(Math.min(60, breakLength + 1))}>+</button>
        </div>
        <div className="col">
          <h2 id="session-label">Session Length</h2>
          <button id="session-decrement" onClick={() => setSessionLength(Math.max(1, sessionLength - 1))}>-</button>
          <span id="session-length">{sessionLength}</span>
          <button id="session-increment" onClick={() => setSessionLength(Math.min(60, sessionLength + 1))}>+</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2 id="timer-label">{isSession ? 'Session' : 'Break'}</h2>
          <h3 id="time-left">{formatTime(timeLeft)}</h3>
          <button id="start_stop" onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button id="reset" onClick={handleReset}>Reset</button>
        </div>
      </div>
      <audio id="beep" ref={audioBeep} src={beepSound} />
    </div>
  );
};

export default PomodoroClock;