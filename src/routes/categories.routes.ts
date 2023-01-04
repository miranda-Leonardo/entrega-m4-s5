import { Router } from 'express';
import { createCategoryController } from '../controllers/category.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { createCategorySerializer } from '../serializers/category.serializer';

const categoryRoutes = Router();

categoryRoutes.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureDataIsValidMiddleware(createCategorySerializer), createCategoryController);

export { categoryRoutes };