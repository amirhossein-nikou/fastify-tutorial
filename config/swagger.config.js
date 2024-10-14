export const fastifySwaggerConfig =  {
    swagger: {
        info: {
            title: 'Test swagger',
            description: 'testing the fastify swagger api',
            version: '0.1.0'
        },
        tags: [
            { name: "Category", description: "manage categories" },
            { name: "User", description: "manage user profile" },
            { name: "product", description: "manage products" },
            { name: "home", description: "home page" },
            { name: "authentication", description: "login and register" },
        ],
        securityDefinitions: {
            apiKey: {
                type: "apiKey",
                in: 'header',
                name: "authorization",
                description: "bearer authorization"
            }
        },
    },
}
export const fastifySwaggerUiConfig =  {
    prefix: "swagger",
    theme: {
        title: "fastify swagger"
    },
}