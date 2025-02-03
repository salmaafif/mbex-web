import express from "express"
import userController from "../controllers/UserController.js"
const router = express.Router()
import { User } from "../models/User.js"

router.get('/', userController.getUser)
//router.post('/register', userController.register)
router.post('/register', async (request, response) => {
    try {
        if (!request.body.username || !request.body.password) {
            return response.status(400).send({
                message: "Please enter both username and password",
            })
        }
        const newUser = {
            username: request.body.username,
            password: request.body.password
        }
        const user = await User.create(newUser)
        response.status(201).send(user)
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message: error.message})
    }
})

router.post('/login', userController.login)

export default router