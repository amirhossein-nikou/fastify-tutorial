import { products } from "../db/product.js";

export function getOne(req,reply){
    const {id} = req.params
    const result = products.find(product => product.id == id)
    if(!result) return reply.send({
        message: "product not found "
    })
    reply.send(result)
}
export function list(req,reply){
    reply.send({products,user: req.user})
}