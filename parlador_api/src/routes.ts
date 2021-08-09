import { Router } from 'express'

import UserController from '@controllers/UserController'
import AuthController from '@controllers/AuthController'
import PostController from '@controllers/PostController'
import authMiddleware from '@middlewares/authMiddleware'

const router = Router()

router.post('/auth', AuthController.authenticate)

router.post('/users', UserController.store)
router.post('/getuser', authMiddleware, UserController.get_user)
router.post('/deleteuser', authMiddleware, UserController.delete_user)
router.post('/updateuser/:id', authMiddleware, UserController.update_user)

router.post('/createpost', authMiddleware, PostController.postStore)
router.post('/getallpostuser', authMiddleware, PostController.getAllPostUser)
router.get('/allposts', authMiddleware, PostController.getall)
router.post('/updatepost/:id', authMiddleware, PostController.updatePost)

// TESTE MIDDLEWARE
router.get('/users', authMiddleware, UserController.get_all)

export default router
