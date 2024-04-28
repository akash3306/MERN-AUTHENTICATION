import express from 'express'
import dotenv from 'dotenv'
import './db.js'
import cors from 'cors' 
dotenv.config()
import { UserRouter } from './routes/user.js'
import cookieParser from 'cookie-parser'
const app = express()
// Usnig router imported above from routes/useer.js
app.use(express.json())

//cors
app.use(cors({
    origin: ["http://localhost:3000"], //url from loginpage remove /anything
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)



//creating and connecting db
// mongoose.connect("mongodb://127.0.0.1:27017/Authentication")


app.listen (process.env.PORT, ()=> {
    console.log("Server is running")
})