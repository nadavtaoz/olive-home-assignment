import express from 'express';
import cors from 'cors';
import { policiesRouter, agentsRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/policies', policiesRouter);
app.use('/agents', agentsRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
