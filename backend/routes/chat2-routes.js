import { Router } from 'express';
import runConversation from '../controllers/chat2-controllers.js';

const chatRoutes2 = Router();


chatRoutes2.post('/',async (req, res) => {
    try {
      const response = await runConversation(req.body.prompt);
      res.json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  })



export default chatRoutes2;