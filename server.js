import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';

dotenv.config()


//database config
connectDB();


//rest object
const app=express()


//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes all 

app.use('/api/v1/auth',authRoute)



app.get('/',(req,res)=>{
    res.send("<h1>Welcome to the ecommerce Web App</h1>");
});

const PORT =process.env.PORT||8000;

app.listen(8000,()=>{
    console.log(`Server running on the ${PORT}`)
})