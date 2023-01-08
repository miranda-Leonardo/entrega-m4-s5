import { Router } from 'express';
import { createPropertyController, listPropertiesController } from '../controllers/property.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { ensureIsAdmMiddleware } from '../middlewares/ensureIsAdm.middleware';
import { createPropertySerializer } from '../serializers/property.serializer';

const propertyRoutes = Router();

propertyRoutes.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, ensureDataIsValidMiddleware(createPropertySerializer), createPropertyController);
propertyRoutes.get('', listPropertiesController);

export { propertyRoutes };