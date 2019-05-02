import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import api from './routes';
import config from './util/config';

mongoose.connect(config.MONGODB_URI as string, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'));

const app = express();

app.use(helmet())
  .use(express.json())
  .use('/privacy-policy', express.static('public/privacy.html'))
  .use('/api', api);

export default app;
