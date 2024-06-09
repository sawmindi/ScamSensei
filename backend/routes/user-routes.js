import { Router } from 'express';
import { count, getAllUsers, getUsers, updateUser, userLogin, userLogout, userSignup, verifyUser } from '../controllers/user-controllers.js';
import { validate,signupValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
const userRoutes = Router();


userRoutes.get('/',getAllUsers)
userRoutes.post('/signup',validate(signupValidator),userSignup)
userRoutes.post('/login',validate(loginValidator),userLogin)
userRoutes.get('/auth-status',verifyToken,verifyUser)
userRoutes.get('/logout',verifyToken,userLogout)
userRoutes.post('/user', getUsers)
userRoutes.put('/update', updateUser)
userRoutes.get('/count', count)

export default userRoutes;
