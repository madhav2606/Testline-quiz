import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ShowTimeLeft({setSubmitted}) {

    const [timeLeft, setTimeLeft] = useState(15 * 60);
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft === 0) {
          setSubmitted(true);
          navigate("/Quiz/Result");
          return;
        }
    
        const timerInterval = setInterval(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    
        return () => clearInterval(timerInterval); 
      }, [timeLeft, navigate, setSubmitted]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
    };
  return (
    <div>
        <div className="quiz-header">
          <h2>Time Left: {formatTime(timeLeft)}</h2>
        </div>
    </div>
  )
}

export default ShowTimeLeft
