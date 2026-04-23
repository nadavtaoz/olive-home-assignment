import express from 'express';
import cors from 'cors';
import policiesRouter from './routes/policies';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/policies', policiesRouter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
