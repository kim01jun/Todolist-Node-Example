import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import api from './routes';
import config from './util/config';

mongoose.connect(config.MONGODB_URI as string, { useNewUrlParser: true, useFindAndModify: true })
  .then(() => console.log('Connected to DB'));

const app = express();

app.use(helmet())
  .use(cors())
  .use(express.json())
  .use('/api', api);

export default app;
