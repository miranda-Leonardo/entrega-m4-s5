import { Router } from 'express';
import { createUserController, listUsersController, updateUserController } from '../controllers/user.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { createUserSerializer, updateUserSerializer } from '../serializers/user.serializer';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(createUserSerializer), createUserController);
userRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
userRoutes.patch('/:id', ensureAuthMiddleware, ensureDataIsValidMiddleware(updateUserSerializer), updateUserController);

export { userRoutes };