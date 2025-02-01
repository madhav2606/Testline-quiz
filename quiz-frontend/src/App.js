import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Quiz from './components/Quiz/StartQuiz.jsx';
import QuizResults from './components/QuizResults/QuizResults.jsx';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path='/Quiz/Result' element={<QuizResults/>}/>
        </Routes>
    </Router>
  );
}

export default App;
