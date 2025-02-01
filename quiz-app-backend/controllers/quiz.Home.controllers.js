import axios from 'axios';

export const showQuizHome = async(req,res)=>{
    try {
        const response = await axios.get('https://api.jsonserve.com/Uw5CrX');
        const quizDataHome = response.data;
        res.json({
          title: quizDataHome.title,
          duration: quizDataHome.duration,
          topic: quizDataHome.topic
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).send('Error fetching quiz data');
      }
}