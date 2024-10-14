import { User } from "../model/user.model.js";
import { fastify } from "../server.js";

export const getUserMiddleware = async (req, res) => {
    try {
        const authorization = req.headers?.authorization
        if (!authorization) return res.status(401).send({ message: "authorization failed" })
        const [bearer, token] = authorization.split(' ')
        if (!bearer || bearer.toLowerCase() !== 'bearer' || !token) {
            return res.status(401).send({ message: "authorization failed" })
        }
        const result = fastify.jwt.verify(token);
        if (typeof result == 'string') return res.status(401).send({ message: result })
        const {username} = result
        const user = await User.findOne({ where: { username } })
        req.user = user.dataValues
    } catch (error) {
        return res.status(401).send({ message: "authorization failed" })
    }
}