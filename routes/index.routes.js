const middleware1 = (req,res,next)=>{
    console.log('middleware 1');
    next()
} 
const middleware2 = (req,res,next)=>{
    console.log('middleware 2');
    next()
} 
const index = {
    schema: {
        tags: ['home'],
        summary: "main home route",
        response: {
            200: {
                message: {type: "string"},
                message2: {type: "string"},
            }
        }
    },
    handler: (req, reply) => {
        reply.code(200).send({
            header: req.headers?.authorization,
            message: "hello fastify",
            message2: "hello fastify2",
        })
    },
    preHandler: [middleware1, middleware2]
}

export function indexRouter(fastify, options, done) {
    fastify.get("/",index )
    done()
}