import 'reflect-metadata';
import 'express-async-errors';
import '../container';
import { AppError } from '@/shared/errors';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { routes } from './routes';

const app = express();

dotenv.config();

app.use((req, res, next) => {
  console.log(`Request recebida: ${req.method} ${req.url}`);
  next();
});

app.use(express.json({ limit: '200mb' }));

app.use(routes);

app.use(express.json());

app.use(errors());

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log({ err })
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
