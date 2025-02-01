
import express from 'express';
import cors from 'cors';
import axios from 'axios'
import quizRouter from './router/quizRouter.js'

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>res.send("Hello"))

app.use('/',quizRouter);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

