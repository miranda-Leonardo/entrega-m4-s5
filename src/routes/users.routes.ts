import { Router } from 'express';
import { createUserController } from '../controllers/user.controller';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { userCreateSerializer } from '../serializers/user.serializer';

const userRoutes = Router();

userRoutes.post('', ensureDataIsValidMiddleware(userCreateSerializer), createUserController);

export { userRoutes };