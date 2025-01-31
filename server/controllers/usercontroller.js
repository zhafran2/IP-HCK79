const { OAuth2Client } = require('google-auth-library')
const { ComparePass } = require('../helpers/bcrypt')
const { VerifyToken, SignToken } = require('../helpers/jwt')
const { User } = require('../models')


class UserController {

    static async Register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const data = await User.create({ username, email, password })
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async Login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "EmailRequired" }
            }

            if (!password) {
                throw { name: `PasswordRequired` }
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { name: `Unauthenticated` }
            }

            const ComparedPass = ComparePass(password, user.password)
            if (!ComparedPass) {
                throw { name: `Unauthenticated` }
            }
            const access_token = SignToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
    static async GoogleLogin(req, res, next) {
        try {
            const { google_token } = req.headers
            const client = new OAuth2Client()

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()
            const email = payload.email
            const name = payload.name

            let user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                user = await User.create({
                    email,
                    password: "googlelogin"
                }, {
                    hooks: false
                })
            } else {
                if (user.password !== "googlelogin") {
                    throw { name: `GoogleFailed` }
                }

            }
            const access_token = SignToken({ id: user.id })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserController



