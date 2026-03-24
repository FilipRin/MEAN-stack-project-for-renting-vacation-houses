import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRouter from './routers/user.router'
import vikRouter from './routers/vikendica.router'
import resRouter from './routers/reservation.router'
import feedbRouter from './routers/feedback.router'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/planinskaVikendica')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use("/users", userRouter)
router.use("/vikendice",vikRouter)
router.use("/reservations",resRouter)
router.use("/feedbacks",feedbRouter)

app.use('/', router)
app.listen(4000, ()=>console.log('Express running on port 4000'))
