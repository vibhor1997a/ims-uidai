import express from 'express';
import { registerOrganizationHander } from '../controllers/organisations/register';
import { getOrganizationsList } from '../controllers/organisations/list';
import { auth } from '../config/auth';
import { isValidHandler } from '../controllers/users/thirdParty';
const router = express.Router();

router.post('/', auth, registerOrganizationHander);
router.get('/', auth, getOrganizationsList);
router.post('/validate', isValidHandler);

export { router as organizations };