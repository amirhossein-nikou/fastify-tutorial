import fastifyJwt from "@fastify/jwt";
import fastifyMiddie from "@fastify/middie";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import cors from 'cors';
import Fastify from "fastify";
import fastifyBcrypt from "fastify-bcrypt";
import * as path from 'path';
import serveStatic from "serve-static";
import './config/sequelize.config.js';
import { fastifySwaggerConfig, fastifySwaggerUiConfig } from "./config/swagger.config.js";
import { authRoutes } from "./routes/auth.routes.js";
import { categoryRouter } from "./routes/category.routes.js";
import { indexRouter } from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";
import { userRouter } from "./routes/user.routes.js";
const __dirname = import.meta.dirname;
export const fastify = Fastify({
    logger: true
})
const PORT = 3000;
async function main() {
    await fastify.register(fastifyMiddie)
    fastify.register(fastifyBcrypt, {
        saltWorkFactor: 12
    })
    fastify.register(fastifyJwt, {
        secret: '3_w_&)wqr#^fabz*hy_r6tm!7ucx$2+)yu2944yn09zd*m1am9'
    })
    fastify.register(fastifySwagger, fastifySwaggerConfig)
    fastify.register(fastifySwaggerUi, fastifySwaggerUiConfig)
    fastify.register(indexRouter)
    fastify.use(cors())
    fastify.use("/",serveStatic(path.join(__dirname,'public')))
    fastify.use((req,res,next) => {
        console.log(" we are in middleware");
        next()
    })
    fastify.register(productRoutes, { prefix: '/products' })
    fastify.register(categoryRouter, { prefix: '/category' })
    fastify.register(userRouter, { prefix: '/user' })
    fastify.register(authRoutes, { prefix: '/auth' })

    try {
        fastify.listen({
            port: PORT
        })
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}
main()