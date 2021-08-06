import { Router } from "express";

import UserController from "@controllers/UserController";
import AuthController from "@controllers/AuthController";


import authMiddleware from "@middlewares/authMiddleware";

const router = Router();


router.post('/auth', AuthController.authenticate);


router.post('/users', UserController.store);
router.post('/getuser', authMiddleware, UserController.get_user);

//TESTE MIDDLEWARE
router.get('/users', authMiddleware,UserController.get_all);

export default router;