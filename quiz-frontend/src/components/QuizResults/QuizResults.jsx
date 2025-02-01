import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizResults.css';

const QuizResults = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(''); 


  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Quiz/Results');
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    
    const savedScore = localStorage.getItem('quizScore');
    const markedAnswers = JSON.parse(localStorage.getItem('answers')) || {}; // Convert from string to object

   

    setScore(savedScore);
    setAnswers(markedAnswers);
    fetchQuizData();
  }, []);

  const handleViewSolution = (solution)=>{
    setSelectedSolution(solution);
    setModalVisible(true);
  }
  const closeModal=()=>{
    setModalVisible(false);
  }

  return (
    <>
      <div className="final-score">
        <h2>Your Score: {score}</h2>
      </div>
      <div className="container">
        <div className="quizContent">
          <h1>Quiz Results</h1>

          {loading ? (
            <p className="loading">Loading Results...</p>
          ) : (
            questions.map((question, index) => {
              const markedAnswer = answers[question.id];

              return (
                <div key={index} className="questionCard">
                  <h2 className="questionTitle">Question {index + 1}:</h2>
                  <p className="questionText">{question.description}</p>

                  <h3 className="optionsTitle">Options:</h3>
                  <ul className="optionsList">
                    {question.options.map((option, idx) => {
                      const isMarked = option.id===markedAnswer;
                      const isCorrect = option.is_correct;
                      let optionClass = 'optionItem';

                      if (isMarked) {
                        optionClass += isCorrect ? ' markedCorrect' : ' markedIncorrect';
                      } else if (isCorrect) {
                        optionClass += ' correct';
                      }

                      return (
                        <li key={idx} className={optionClass}>
                          {option.description}
                          {isMarked && <span className="markedTag"></span>}
                          {isCorrect && <span className="correctMark"> ✅</span>}
                        </li>
                      );
                    })}
                  </ul>
                  {!markedAnswer && <p className="notAnswered"> Status : Not Answered</p>}

                    <button className='viewSolutionBtn ' onClick={()=> handleViewSolution(question.detailed_solution)}>View Soution</button>
                </div>
              );
            })
          )}
        </div>
      </div>
      {modalVisible && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h3>Detailed Solution</h3>
            <p>{selectedSolution}</p>
            <button className="closeModalBtn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizResults;
