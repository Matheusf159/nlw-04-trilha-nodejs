import request from 'supertest'
import { getConnection, getCustomRepository } from 'typeorm'
import { app } from '../app'

import createConnection from '../database'

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("should be able to create a new  survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example23",
            description: "Description Example23"
        })

        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2)
    })
})