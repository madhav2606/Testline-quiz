import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShowQuiz from './ShowQuiz';
import './StartQuiz.css';

function Quiz() {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Quiz');
        setQuizData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load quiz data');
        setLoading(false);
      }
    };
    fetchQuizData();
  }, []);


  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }
 
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div>
        {quizData ? (
          <pre><ShowQuiz quizData={quizData}/></pre>
        ) : (
          <p>No quiz data available.</p>
        )}
      </div>
    </div>
  );
}

export default Quiz;
