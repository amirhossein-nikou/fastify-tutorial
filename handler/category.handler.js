import { CategoryModel } from "../model/category.model.js"

const fineOneCategoryById = async (id, reply) => {
    const category = await CategoryModel.findOne({ where: { id }})
    if (!category) return reply.code(404).send({ status: 404, message: "category not found" })
    return category
}
export const createCategoryHandler = async (req, reply) => {
    const { name, parentId } = req.body;
    const category = await CategoryModel.findOne({ where: { name } })
    if (category) return reply.code(401).send({ message: "category already exists" })
    await CategoryModel.create({ name, parentId })
    return reply.code(201).send({ message: "category created" })

}
export const getAllCategoryHandler = async (req, reply) => {
    const categories = await CategoryModel.findAll({
        where: {parentId: null},
        include: [
            {
                model: CategoryModel,
                as: 'children',
                include: [
                    {
                        model: CategoryModel,
                        as:'children'
                    }
                ]
            }
        ]
    })

    return reply.code(200).send({ categories })
}
export const getOneCategoryHandler = async (req, reply) => {
    const { id } = req.params;
    const category = await fineOneCategoryById(id, reply);
    return reply.code(200).send({ category })
}
export const updateCategoryHandler = async (req, reply) => {
    const { id, name } = req.body;
    //const category = await fineOneCategoryById(id, reply);
    // await category.update({name})
    // await category.save() 
    const result = await CategoryModel.update({ name }, { where: { id } })
    if (result[0] == 0) return reply.code(400).send({ message: 'category update failed' })
    return reply.code(200).send({ message: 'category updated' })
}
export const removeCategoryHandler = async (req, reply) => {
    const { id } = req.params;
    const category = await fineOneCategoryById(id, reply);
    await category.destroy()
    return reply.code(200).send({ message: "category removed successfully" })
}