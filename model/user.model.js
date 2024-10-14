import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";

export class User extends Model{}
User.init({
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, allowNullL: false,unique: true},
    password: {type: DataTypes.STRING, allowNullL: false},
    active: {type: DataTypes.BOOLEAN, defaultValue: false},
    birthday: {type: DataTypes.DATE},
    token: {type: DataTypes.STRING,allowNull: true},
},{
    sequelize,
    modelName: "users"
})
export const UserDetails = sequelize.define('UserDetails', {
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    address: {type: DataTypes.STRING},
    lat: {type: DataTypes.DOUBLE},
    lng: {type: DataTypes.DOUBLE},
    userId: {type: DataTypes.INTEGER},
})
User.hasOne(UserDetails);
UserDetails.belongsTo(User)
// User.sync({alter: true}).then((result) => {
//     console.log('user synced');
// })
// UserDetails.sync({alter: true}).then((result) => {
//     console.log('user details synced');
// })
