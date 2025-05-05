import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { addMenu, getMenus, updateMenu, deleteMenu } from './menu.controller';

const router = Router();

router.post('/addMenu', authenticate, addMenu); // Add a new menu
router.get('/getMenus', authenticate, getMenus); // Get all menus
router.put('/updateMenu/:id', authenticate, updateMenu); // Update a menu by ID
router.delete('/deleteMenu/:id', authenticate, deleteMenu); // Delete a menu by ID

const menuRouter = router;
export default menuRouter;