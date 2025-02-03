import express, { response } from "express"
import {PORT, MongoDB} from './config.js'
import mongoose from "mongoose"
import { User } from "./models/User.js"

const app = express()
app.use(express.json())

app.get('/', (req,res)=> {
    res.send('Hello World')
})
//save user
app.post('/user', async (request, response) => {
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

mongoose
    .connect(MongoDB)
    .then(() =>{
        console.log('Success connected to database')
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(error)
    })

//npm run dev