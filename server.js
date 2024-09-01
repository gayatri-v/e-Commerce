import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import CategoryRoutes from './routes/CategoryRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import path from 'path'
dotenv.config()


//database config
connectDB();


//rest object
const app=express()



//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'./client/build')))

//routes all 

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/product',ProductRoutes)



app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'/client/build/index.html'))
})

const PORT =process.env.PORT||8000;

app.listen(8000,()=>{
    console.log(`Server running on the ${PORT}`)
})