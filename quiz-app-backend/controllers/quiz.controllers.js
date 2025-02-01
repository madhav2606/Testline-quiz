import axios from 'axios';
export const showQuiz = async(req,res)=>{
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        const quizData = response.data;
        // console.log(quizData);
        res.json(quizData);
      } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching quiz data');
      }
}