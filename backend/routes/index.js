import { Router } from 'express';
import routerScam from './scam.js';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
import chatRoutes2 from './chat2-routes.js';

const approuter = Router();
approuter.use('/scam', routerScam);
approuter.use('/users',userRoutes)
approuter.use('/chat', chatRoutes);
approuter.use("/chat2",chatRoutes2)
export default approuter;