import express from 'express'
import { getUser, login, logout, register } from '../controller/auth.controller.js';
import jwtAuth from '../middlewares/auth.middleware.js';
const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/user',jwtAuth, getUser)
authRouter.get('/logout',jwtAuth, logout)


export default authRouter;