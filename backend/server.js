import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import CategoryRoutes from './routes/CategoryRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import ProductModel from './models/ProductModel.js';
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
app.use('/api/v1/category',CategoryRoutes)
app.use('/api/v1/product',ProductRoutes)


app.get('/',(req,res)=>{
    res.send("<h1>Welcome to the ecommerce Web App</h1>");
});

const PORT =process.env.PORT||8000;

app.listen(8000,()=>{
    console.log(`Server running on the ${PORT}`)
})

// Webhook endpoint
app.post('/webhook', async (req, res) => {
    const { queryResult } = req.body;
    const intentName = queryResult.intent.displayName;
    let responseText = '';
   

    if (intentName === 'order.add-context:ongoing-order') {
        const productNames = queryResult.parameters['beauty-products'];
    
        try {
          const products = await ProductModel.find({ name: { $in: productNames } });
    
          if (products.length > 0) {
            responseText = `We've added ${products.map(p => p.name).join(', ')} to your order.`;
          } else {
            responseText = `Sorry, we couldn't find the products you're looking for.`;
          }
        } catch (error) {
          console.error('Error fetching products:', error);
          responseText = 'There was an error processing your request. Please try again later.';
        }
      } else {
        responseText = 'Sorry, I did not understand your request.';
      }
    
      res.json({ fulfillmentText: responseText });
    });

