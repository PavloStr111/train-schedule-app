import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import { globalErrorHandler } from './controllers/error.controller';

import "express-async-errors";
import "reflect-metadata";
import { AppError } from './errors/AppError';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use(express.json());


morgan.token('query', function(req) {
  return JSON.stringify(req.query);
}); 
morgan.token('body', function(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time ms - IP: :remote-addr - Query: :query - Body: :body'));


app.use('/api/v1', router);

app.all('*', (req, res, next)=>{
    const error = new AppError('Resource not found', 404);
    next(error);
});


app.use(globalErrorHandler);

export default app;