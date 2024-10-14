import { getUserPRofileHandler, updateDetailsHandler } from "../handler/user.handler.js";
import { getUserMiddleware } from "../utils/getUser.js";

const getUserProfileSchema = {
    schema: {
        tags: ['User'],
        security: [{ apiKey: [] }],
        summary: 'show current user profile',
        response: {
            200: {
                type: 'object',
                properties: {
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: "integer" },
                            firstname: { type: "string" },
                            lastname: { type: "string" },
                            username: { type: "string" },
                            active: { type: "boolean", default: false},
                            createdAt: { type: "string" },
                            UserDetail: {
                                type: "object",
                                properties: {
                                    id: { type: "integer" },
                                    address: { type: "string" },
                                    lat: { type: "number" },
                                    lng: { type: "number" },
                                }
                            },
                        }
                    }
                }
            }
        },
    },
    handler: getUserPRofileHandler,
    preHandler: [getUserMiddleware]
}
const updateUserDetail = {
    schema: {
        tags: ['User'],
        security: [{ apiKey: [] }],
        summary: 'update user details',
        body: {
            type: 'object',
            properties: {
                address: {type: "string"},
                lat: {type: "number"},
                lng: {type: "number"},
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    message: {type: "string"}
                }
            }
        },
    },
    handler: updateDetailsHandler,
    preHandler: [getUserMiddleware]
}
export function userRouter(fastify, option, done) {
    fastify.get('/profile', getUserProfileSchema)
    fastify.patch('/details', updateUserDetail)
    done()
}