import { loginHandler, registerHandler } from "../handler/auth.handler.js";

const registerSchema = {
    schema: {
        tags: ['authentication'],
        summary: "register new user",
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                firstname: { type: "string" },
                lastname: { type: "string" },
                username: { type: "string" },
                password: { type: "string" },
            }
        },
        response: {
            201: {
                type: 'object',
                properties: {
                    user: {
                        type: 'object',
                        properties: {
                            id: { type: "integer" },
                            firstname: { type: "string" },
                            lastname: { type: "string" },
                            username: { type: "string" },
                            password: { type: "string" },
                            createdAt: { type: "string" },
                            updatedAt: { type: "string" },
                        }
                    }
                }
            }
        },
    },
    handler: registerHandler
}
const loginSchema = {
    schema: {
        tags: ['authentication'],
        summary: "login to your account",
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: { type: "string" },
                password: { type: "string" },
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                }
            }
        },
    },
    handler: loginHandler
}
export function authRoutes(fastify, options, done) {
    fastify.post("/register", registerSchema)
    fastify.post("/login", loginSchema)
    done()
}