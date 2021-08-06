import { Router } from "express";

import UserController from "./app/controllers/UserController";

const router = Router();

router.post('/users', UserController.store);

//TESTE MIDDLEWARE
//router.get('/users', authMiddleware,UserController.index);

export default router;