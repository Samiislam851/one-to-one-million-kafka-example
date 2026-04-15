import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from '../common/middlewares/error-handler';
import { notFoundHandler } from '../common/middlewares/not-found';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the API',
  });
});

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
