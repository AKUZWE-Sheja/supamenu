import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { addItem, getItems, updateItem, deleteItem } from './item.controller';

const router = Router();

router.post('/addItem', authenticate, addItem);
router.get('/getItems', authenticate, getItems); 
router.put('/updateItem/:id', authenticate, updateItem); 
router.delete('/deleteItem/:id', authenticate, deleteItem); 

const itemRouter = router;
export default itemRouter;