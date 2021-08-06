import { Router } from "express";

import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";

const router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

//TESTE MIDDLEWARE
//router.get('/users', authMiddleware,UserController.index);

export default router;