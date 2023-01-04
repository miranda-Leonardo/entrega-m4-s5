import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleError } from "./errors/handle.error"
import { userRoutes } from "./routes/users.routes"
import { sessionRoutes } from "./routes/session.routes"


const app = express()
app.use(express.json())

app.use('/users', userRoutes);
app.use('/login', sessionRoutes);

app.use(handleError);

export default app