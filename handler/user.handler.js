import { User, UserDetails } from "../model/user.model.js"
export const updateDetailsHandler = async (req,reply) => {
    const id = req.user.id
    const {address,lat,lng} = req.body
    const isExistsDetails = await UserDetails.findOne({where: {userId: id}})
    if(isExistsDetails){
        await UserDetails.update({address,lat,lng},{where:{ userId: id}})
    }else{
        await UserDetails.create({
            address,
            lat,
            lng,
            userId: id
        })
    } 
    return reply.code(201).send({message: 'details updated '})
}
export const getUserPRofileHandler = async (req,reply) => {
    const id = req.user.id
    const user = await User.findOne({
        where: {id},
        include: [
            {
                model: UserDetails,
                as: 'UserDetail',
                attributes: ['id','lat',"lng",'address']
            }
        ]
    })
    return reply.code(200).send({user})
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWx3ZXJld29sZiIsImlhdCI6MTcyODg0ODQwNywiZXhwIjoxNzI4ODUyMDA3fQ.SFpSKl1df3hDcucSPer3iSDpcL8B--vNFyh4WSDaKJo