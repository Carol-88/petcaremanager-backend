import { Router } from 'express';
import { MongoRepository } from './mongo.repository';
import { UserController } from './user.controller';
import { authMiddleware } from '../../framework/middleware/auth.middleware';
const router = Router();
const userRepo = new MongoRepository();
const useCtrl = new UserController(userRepo);

router.post('/', useCtrl.createUserCtrl);
router.get('/:id', authMiddleware, useCtrl.getUserCtrl);
router.patch('/:id', authMiddleware, useCtrl.updateUserCtrl);
router.delete('/:id', authMiddleware, useCtrl.deleteUserCtrl);

router.post('/login', useCtrl.loginUserCtrl);

export default router;
