import { Router } from 'express';
import { createSchudeleController } from '../controllers/schudele.controller';
import { ensureAuthMiddleware } from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { createSchudeleSerializer } from '../serializers/schudele.serializer';

const schudeleRoutes = Router();

schudeleRoutes.post('', ensureAuthMiddleware, ensureDataIsValidMiddleware(createSchudeleSerializer), createSchudeleController);

export { schudeleRoutes };