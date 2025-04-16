import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'hello'
    })
})

export default app;