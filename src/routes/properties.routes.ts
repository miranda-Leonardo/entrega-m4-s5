import { Router } from 'express';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { createPropertySerializer } from '../serializers/property.serializer';

const propertyRoutes = Router();

propertyRoutes.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureDataIsValidMiddleware(createPropertySerializer));

export { propertyRoutes };