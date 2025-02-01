import React, { useState } from "react";
import './ShowQuiz.css';
import ShowTimeLeft from "./ShowTimeLeft";
import { useNavigate } from 'react-router-dom';

const ShowQuiz = ({ quizData }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const handleOptionChange = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSaveAndNext = () => {
    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedOptionId = answers[currentQuestion.id];
    if (selectedOptionId) {
      const correctOption = currentQuestion.options.find(option => option.is_correct);

      if (selectedOptionId === correctOption?.id) {
        setScore(prevScore => prevScore + 4);
      } else {
        setScore(prevScore => prevScore - 1);
      }
    }

    
    if (selectedOptionId) {
      setAnswers({ ...answers, [currentQuestion.id]: selectedOptionId });
    }

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
    }
  };

  const handleSubmit = () => {
    let n = quizData.questions.length;
    const currentQuestion = quizData.questions[n-1];
    const selectedOptionId = answers[currentQuestion.id];
    if (selectedOptionId) {
      const correctOption = currentQuestion.options.find(option => option.is_correct);

      if (selectedOptionId === correctOption?.id) {
        setScore(prevScore => prevScore + 4);
      } else {
        setScore(prevScore => prevScore - 1);
      }
    }
    localStorage.setItem('quizScore', score);
    localStorage.setItem("answers", JSON.stringify(answers)); 
    navigate("/Quiz/Result");
  };
  

  const currentQuestion = quizData.questions[currentQuestionIndex];
  
  return (
    <div className="quiz-container">
      <ShowTimeLeft setSubmitted={setSubmitted} />
      <div className="questions-section">
        <div key={currentQuestion.id} className="question-card">
          <h3>{currentQuestion.description}</h3>
          <div className="options">
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="option">
                <input
                  type="radio"
                  id={`question-${currentQuestion.id}-option-${option.id}`}
                  name={`question-${currentQuestion.id}`}
                  value={option.id}
                  checked={answers[currentQuestion.id] === option.id}
                  onChange={() => handleOptionChange(currentQuestion.id, option.id)}
                  disabled={submitted}
                />
                <label
                  htmlFor={`question-${currentQuestion.id}-option-${option.id}`}
                >
                  {option.description}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="navigation-buttons">
          {currentQuestionIndex < quizData.questions.length - 1 ? (
            <button onClick={handleSaveAndNext}>Save and Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={submitted}>
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowQuiz;
