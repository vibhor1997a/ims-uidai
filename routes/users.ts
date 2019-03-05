import express from 'express';
import { loginHandler } from '../controllers/users/login';
import { signupHandler } from '../controllers/users/signup';
import { auth } from '../config/auth';
import { getProfileHandler } from '../controllers/users/profile';
import { checkAdultHandler } from '../controllers/users/adult';
import { checkUserHandler } from '../controllers/users/exists';
const router = express.Router();

router.post('/login', loginHandler);
router.post('/signup', signupHandler);
router.get('/me', auth, getProfileHandler);
router.post('/isAdult', checkAdultHandler);
router.post('/exists', checkUserHandler);

export { router as users };