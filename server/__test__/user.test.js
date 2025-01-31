const request = require('supertest')
const { sequelize } = require("../models")
const app = require('../app')
const { HashPass } = require('../helpers/bcrypt')
const {queryInterface} = sequelize



beforeAll(async () => {
    let user = require('../data/user.json').map(el => {
        el.createdAt = el.updatedAt = new Date()
        el.password = HashPass(el.password)
        return el
    })

    await queryInterface.bulkInsert("Users", user, {})
})

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})

describe("Test Register", () => {
    test("Test Register Success with status = 200, OK", async () => {
        const res = await request(app).post('/register').send({
            username: "andini12",
            email: "Andini@gmail.com",
            password: "andini"
        })
        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty("username", "andini12", expect.any(String))
        expect(res.body).toHaveProperty("email", "Andini@gmail.com", expect.any(String))
        expect(res.body).toHaveProperty("password", "andini", expect.any(String))
    })
    test("Test Register failed, without password. status = 401 ", async () => {
        const res = await request(app).post('/register').send({
            username: "andini12",
            email: "Andini@gmail.com"

        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Password is Required")
    })
    test("Test Register Failed, without email.status = 401", async()=> {
        const res = await request(app).post('/register').send({
            username: "andini12",
            password: "Andini@gmail.com"

        })
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty("message", "Email is Required")
    })
})



describe("Test Login Success", () => {
    test("Test Login Success with status = 200, OK", async () => {
        const res = await request(app).post('/login').send({
            email: "andhito@gmail.com",
            password: "12345"
        })
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty("access_token", expect.any(String))
    })

})

describe("Test Login Failed", () => {
    test("Without Email, status = 400", async () => {
        const res = await request(app).post('/login').send({
            password: "12345"
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Email is required")
    })

    test("Without Password, status = 400", async () => {
        const res = await request(app).post('/login').send({
            email: "andhito@gmail.com"
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Password is required")
    })

    test("Invalid Email or password, status = 401", async () => {
        const res = await request(app).post('/login').send({
            email: "andhito@gmail.com",
            password: "11111"
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Email or Password is Invalid")
    })

    test("Invalid Email or password, status = 401", async () => {
        const res = await request(app).post('/login').send({
            email: "andhitogmail.com",
            password: "12345"
        })
        expect(res.status).toBe(401)
        expect(res.body).toHaveProperty("message", "Email or Password is Invalid")
    })
})