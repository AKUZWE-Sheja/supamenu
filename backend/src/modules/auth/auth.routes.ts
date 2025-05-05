import { Router } from "express";
import AuthController from './auth.controller';

const router = Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);

const userRouter = router;
export default userRouter;
