import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import { handleError } from './errors/handle.error'
import { userRoutes } from './routes/users.routes'
import { sessionRoutes } from './routes/session.routes'
import { categoryRoutes } from './routes/categories.routes'
import { propertyRoutes } from './routes/properties.routes'
import { schudeleRoutes } from './routes/schudeles.routes'


const app = express()
app.use(express.json())

app.use('/users', userRoutes);
app.use('/login', sessionRoutes);
app.use('/categories', categoryRoutes);
app.use('/properties', propertyRoutes);
app.use('/schudeles', schudeleRoutes);

app.use(handleError);

export default app