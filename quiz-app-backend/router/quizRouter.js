import { Router } from "express";
const router = Router();
import { showQuiz } from "../controllers/quiz.controllers.js";
import { showQuizHome } from "../controllers/quiz.Home.controllers.js";
import { showResult } from "../controllers/quiz.Result.controllers.js";

router.route('/quiz').get(showQuiz);
router.route('/').get(showQuizHome);
router.route('/Quiz/Results').get(showResult);

export default router;