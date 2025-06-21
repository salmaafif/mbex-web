import express, { response } from "express"
import {PORT, MongoDB} from './config.js'
import mongoose from "mongoose"
import userRoutes from './routes/user-routes.js'
import boothRoutes from './routes/booth-routes.js'
import rateLimiter from "./middleware/rateLimiter.js"

const app = express()
app.use(express.json())

app.get('/', (req,res)=> {
    res.send('Hello World')
})
app.use(rateLimiter)
//save user
app.use("/api/users", userRoutes);
//booth
app.use("/api/booths", boothRoutes)

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