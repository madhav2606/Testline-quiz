import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';


function Home() {
  const navigate = useNavigate();
  const [duration, setDuration] = useState(null);
  const [topic, setTopic] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setDuration(response.data.duration);
        setTopic(response.data.topic);
        setTitle(response.data.title);
        
        
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchQuizData();
  }, []);

  const handleStartQuiz = () => {
    navigate('/Quiz');
  };
  return (
    <div className="App">
      <div className="quiz-card">
        <div className="quiz-header">
          <span className="live-dot"></span>
          <span className="live-text">Live Test</span>
        </div>
        <div className="quiz-details">
          <p>Duration: {duration} min</p>
          <h2>{title}</h2>
          <p>Topic: {topic}</p>
        </div>
        <button className="start-quiz-button" onClick={handleStartQuiz}>
          Start Test
        </button>
      </div>
    </div>
  )
}

export default Home
