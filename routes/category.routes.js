import { createCategoryHandler, getAllCategoryHandler, getOneCategoryHandler, removeCategoryHandler, updateCategoryHandler } from "../handler/category.handler.js"
import { getUserMiddleware } from "../utils/getUser.js"

const createCategory = {
    schema: {
        tags: ['Category'],
        security: [{apiKey: []}],
        summary: "create category",
        body: {
            type: "object",
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                    description: "category name"
                },
                parentId: {
                    type: 'integer',
                    description: "parent category"
                }
            }
        },
        response: {
            200: {}
        }
    },
    handler: createCategoryHandler,
    preHandler: [getUserMiddleware]
}
const getAllCategories = {
    schema: {
        tags: ['Category'],
        security: [{apiKey: []}],
        summary: "get all categories",
        response: {
            200: {}
        }
    },
    handler: getAllCategoryHandler,
    preHandler: [getUserMiddleware]
}
const getOneCategory = {
    schema: {
        tags: ['Category'],
        security: [{apiKey: []}],
        summary: "get one categories",
        params: {
            type: "object",
            properties: {
                id: {
                    type: 'integer',
                    description: "category id"
                }
            }
        },
        response: {
            200: {}
        }
    },
    handler: getOneCategoryHandler,
    preHandler: [getUserMiddleware]
}
const updateCategory = {
    schema: {
        tags: ['Category'],
        security: [{apiKey: []}],
        summary: "update category with id",
        body: {
            type: "object",
            required: ['id'],
            properties: {
                id: {
                    type: 'integer',
                    description: "category id"
                },
                name: {
                    type: 'string',
                    description: "category id"
                }
            }
        },
        response: {
            200: {}
        }
    },
    handler: updateCategoryHandler,
    preHandler: [getUserMiddleware]
}
const removeCategory = {
    schema: {
        tags: ['Category'],
        security: [{apiKey: []}],
        summary: "delete category with id",
        params: {
            type: "object",
            properties: {
                id: {
                    type: 'integer',
                    description: "category id"
                }
            }
        },
        response: {
            200: {}
        }
    },
    handler: removeCategoryHandler,
    preHandler: [getUserMiddleware]
}
export function categoryRouter(fastify,options,done) {
    fastify.post("/create",createCategory)
    fastify.get("/list",getAllCategories)
    fastify.get("/:id",getOneCategory)
    fastify.patch("/update",updateCategory)
    fastify.delete("/remove/:id",removeCategory)
    done()
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWx3ZXJld29sZiIsImlhdCI6MTcyODg5NTk2NywiZXhwIjoxNzI4ODk5NTY3fQ.W0xoFddgqOjiELC5ceVqO-mGDJ7WRH_jW0g-T9bfxP8