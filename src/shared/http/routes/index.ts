import { Router } from "express";
import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/products/users/routes/users.routes";

const routes = Router();

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)


export default routes