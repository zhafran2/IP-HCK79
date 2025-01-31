const request = require('supertest')
const { sequelize } = require("../models")
const app = require('../app')
const { HashPass } = require('../helpers/bcrypt')
const { SignToken } = require('../helpers/jwt')
const { queryInterface } = sequelize

let access_token
beforeAll(async () => {
    let user = require('../data/user.json').map(el => {
        el.createdAt = el.updatedAt = new Date()
        el.password = HashPass(el.password)
        return el
    })

    await queryInterface.bulkInsert("Users", user, {})

    let category = require('../data/category.json').map(el => {
        el.createdAt = el.updatedAt = new Date()
        return el
    })
    await queryInterface.bulkInsert("Categories", category, {})

    let quiz = require('../data/quiz.json').map(el => {
        el.createdAt = el.updatedAt = new Date()
        return el
    })
    await queryInterface.bulkInsert("Quizzes", quiz, {})
})
afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Categories", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Quizzes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

access_token = SignToken({ id: 1 })

// describe("Get All Question , status = 200")
describe("Get All Question" , ()=> {
    test("Get All Question Success, status = 200. OK.", async()=> {
        const res = await request(app).get('/quiz').set("authorization",`Bearer ${access_token}`)


        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)

        expect(res.body[0]).toHaveProperty("question",  expect.any(String))
        expect(res.body[0]).toHaveProperty("option1",  expect.any(String))
        expect(res.body[0]).toHaveProperty("option2", expect.any(String))
        expect(res.body[0]).toHaveProperty("option3", expect.any(String))
        expect(res.body[0]).toHaveProperty("option4",expect.any(String))
        expect(res.body[0]).toHaveProperty("ans", expect.any(Number))
        expect(res.body[0]).toHaveProperty("categoryId",expect.any(Number))
        expect(res.body[0]).toHaveProperty("userId",expect.any(Number))
    })
    test("Get All Question failed, no access token. status = 401",async()=> {
        const res = await request(app).get('/quiz')

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Invalid token")
    })

    test("Get All Question Failed. wrong token. status = 401",async()=> {
        const res = await request(app).get('/quiz').set("authorization",`Bearer 2`)


        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Invalid token")
    })
})

describe("Create Question", () => {
    test("Create Question success,status = 201", async () => {
        const res = await request(app)
            .post('/quiz/')
            .set("authorization", `Bearer ${access_token}`)
            .send({ question: "buah apa yang banyak vitamin A nya", option1: "wortel", option2: "gula", option3: "apel", option4: "semangka", ans: 1 ,categoryId:1})

        expect(res.status).toBe(201)

        expect(res.body).toBeInstanceOf(Object)

        expect(res.body).toHaveProperty("question", "buah apa yang banyak vitamin A nya", expect.any(String))
        expect(res.body).toHaveProperty("option1", "wortel", expect.any(String))
        expect(res.body).toHaveProperty("option2", "gula", expect.any(String))
        expect(res.body).toHaveProperty("option3", "apel", expect.any(String))
        expect(res.body).toHaveProperty("option4", "semangka", expect.any(String))
        expect(res.body).toHaveProperty("ans", 1, expect.any(Number))
        expect(res.body).toHaveProperty("categoryId",1,expect.any(Number))
        expect(res.body).toHaveProperty("userId",1,expect.any(Number))
    })

    
    test("Create Question Failed, no login. status = 401", async () => {
        const res = await request(app).post('/quiz')

        expect(res.status).toBe(401)
        // console.log(res.status,"HHHHHHHHHHHHHHHH");
        expect(res.body).toHaveProperty("message", "Invalid token")
    })

    test("Create Question Failed, Wrong token,status = 401", async () => {
        const res = await request(app).post('/quiz')
            .set("authorization", `Bearer 7`)

        expect(res.status).toBe(401)
        // console.log(res.status,"HHHHHHHHHHHHHHHH");
        expect(res.body).toHaveProperty("message", "Invalid token")
    })
    test("Create Question Failed, body not found. status = 400", async () => {
        const res = await request(app).post('/quiz')
            .set("authorization", `Bearer ${access_token}`)
            .send({ option1: "wortel", option2: "gula", option3: "apel", option4: "semangka", ans: 1 })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Question is Required")
    })

})

describe("Update Question by id", () => {
    test("Update Question success. status = 200", async () => {
        const res = await request(app)
            .put('/quiz/3')
            .send({
                question: "buah apa yang banyak vitamin A nya", option1: "wortel", option2: "gula", option3: "apel", option4: "semangka", ans: 1
            })
            .set("authorization", `Bearer ${access_token}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Object)

        expect(res.body).toHaveProperty("message" , "question has been updated")
    })
    test("Update Question failed, without Login. status = 401.", async () => {
        const res = await request(app)
            .put('/quiz/3')
            .set("authorization", `Bearer 7`)

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Invalid token")
    })

    test("Update Question failed, Invalid Token. status = 401.", async () => {
        const res = await request(app)
            .put("/products/2")
            .set("authorization", `Bearer 7`)

        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Invalid token")
    })

    test("Update Question failed,id not found.", async () => {
        const res = await request(app)
            .put('/quiz/3000')
            .send({
                question: "buah apa yang banyak vitamin A nya", option1: "wortel", option2: "gula", option3: "apel", option4: "semangka", ans: 1
            })
            .set("authorization", `Bearer ${access_token}`)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty("message", "Your Request is Not Found")

    })

})