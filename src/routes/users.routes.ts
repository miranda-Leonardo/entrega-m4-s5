import { Router } from 'express';
import { createUserController, listUsersController } from '../controllers/user.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { userCreateSerializer } from '../serializers/user.serializer';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);
userRoutes.get('', ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);

export { userRoutes };