import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { addCategory, getCategory, updateCategory, deleteCategory } from './category.controller';

const router = Router();

router.post('/addCategory', authenticate, addCategory); // Add a new category
router.get('/getCategory', authenticate, getCategory); // Get all categories
router.put('/updateCategory/:id', authenticate, updateCategory); // Update a category by ID
router.delete('/deleteCategory/:id', authenticate, deleteCategory); // Delete a category by ID

const catRouter = router;
export default catRouter;
