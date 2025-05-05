import { Router } from 'express';
import { addResto, getResto } from './resto.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/addResto', authenticate, addResto);
router.get('/getRestos', authenticate, getResto);

const restoRouter = router;
export default restoRouter;
