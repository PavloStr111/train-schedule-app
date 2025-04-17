import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import { globalErrorHandler } from './controllers/error.controller';

import "express-async-errors";
import "reflect-metadata";
import { AppError } from './errors/AppError';

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1', router);



app.all('*', (req, res, next)=>{
    const error = new AppError('Resource not found', 404);
    next(error);
});


app.use(globalErrorHandler);

export default app;