import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("postgres://postgres:amir1234nikou@localhost:5432/fastify")

async function connectionTest(){
    try {
        await sequelize.authenticate();
        console.log("Connected to postgres database");
    } catch (error) {
        console.log("db error: " ,error);
    }
}
connectionTest()