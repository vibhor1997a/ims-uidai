import express from 'express';
import { users } from './users';
const router = express.Router({ mergeParams: true });

router.use('/users', users);

export { router as routes };