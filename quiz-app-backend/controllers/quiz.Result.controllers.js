import axios from 'axios';

export const showResult = async(req,res)=>{
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        const quizDataHome = response.data;
        res.json({
          questions:quizDataHome.questions
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching quiz data');
      }
}