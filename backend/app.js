// Import statements
import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import morgan from 'morgan';
import approuter from './routes/index.js';
import cookieParser from 'cookie-parser';
config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cors(
  {origin: "https://scamsensei.vercel.app",
  credentials: true}
));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/v1', approuter);
// Main page route

app.get('/', (req, res) => {
  res.send({ message: "main page of server" });
});
export default app;
