import { getOne, list } from "../handler/product.handler.js"
import { getUserMiddleware } from "../utils/getUser.js"
const productSchema = {
    type: "object",
    properties: {
        id: { type: "integer" },
        title: { type: "string" },
    }
}
const getOneProduct = {
    schema: {
        tags: ['product'],
        security: [{apiKey: []}],
        params: {
            type: "object",
            properties: {
                id: {
                    type: 'string',
                    description: "product id"
                }
            }
        },
        response: {
            200: productSchema
        }
    },
    handler: getOne,
    preHandler: [getUserMiddleware]
}
const getAllProducts = {
    schema: {
        tags: ['product'],
        security: [{apiKey: []}],
        response: {
            200: {
                type: 'object',
                properties: {
                    products: {
                        type: 'array',
                        items: productSchema
                    },
                    user: {
                        type: 'object',
                        properties: {
                            id : {type: "integer"},
                            firstname: {type: "string"},
                            lastname: {type: "string"},
                            username: {type: "string"},
                        }
                    }
                }
            }
        }
    },
    handler: list,
    preHandler: [getUserMiddleware]

}
export default function productRoutes(fastify, options, done) {
    fastify.addHook("onRequest",(request) => request.jwtVerify())
    fastify.get("/", getAllProducts)
    fastify.get("/:id", getOneProduct)
    done()
}