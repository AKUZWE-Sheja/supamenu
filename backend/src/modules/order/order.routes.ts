import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { addOrder, getOrders, updateOrder, deleteOrder } from './order.controller';

const router = Router();

router.post('/addOrder', authenticate, addOrder); // Add a new order
router.get('/getOrders', authenticate, getOrders); // Get all orders
router.put('/updateOrder/:id', authenticate, updateOrder); // Update an order by ID
router.delete('/deleteOrder/:id', authenticate, deleteOrder); // Delete an order by ID

const orderRouter = router;
export default orderRouter;