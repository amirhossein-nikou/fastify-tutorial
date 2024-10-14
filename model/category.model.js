import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
export const CategoryModel = sequelize.define('category',{
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    name: {type: DataTypes.STRING, unique: true,allowNull: false},
    parentId: {type: DataTypes.INTEGER}
})
CategoryModel.hasMany(CategoryModel,{foreignKey: 'parentId',as: 'children'})
CategoryModel.belongsTo(CategoryModel,{foreignKey: 'parentId',as: 'parent'})
// CategoryModel.sync({alter: true}).then((result) => {
//     console.log('model created : ',result);
// })
