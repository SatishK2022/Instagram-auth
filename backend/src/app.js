import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRouter from './router/auth.router.js';
import dbConnection from './utils/dbConnection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

// Connect to MONGODB
dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

app.use('/api/auth', authRouter)

app.use('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Instagram Login'
    })
})

export default app;