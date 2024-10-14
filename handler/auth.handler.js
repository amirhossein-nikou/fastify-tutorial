import { User } from "../model/user.model.js"
import { fastify } from "../server.js"

export async function registerHandler(req, reply) {
    const { firstname, lastname, username, password } = req.body
    const user = await User.create({
        firstname,
        lastname,
        username,
        password: await fastify.bcrypt.hash(password)
    })
    reply.code(201).send({ user })
}
export async function loginHandler(req, reply) {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user) throw reply.code(404).send({ message: "username or password is incorrect" })
    const compareResult = await fastify.bcrypt.compare(password, user.password);
    if(compareResult){
        // create access token
        const token = fastify.jwt.sign({username},{expiresIn: "1h"})
        user.token = token;
        await user.save()
        return reply.code(200).send({
            message: "logged in successfully",
            token
        })
    }
    reply.code(401).send({ message: "username or password is incorrect" })
}