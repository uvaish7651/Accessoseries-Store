import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/user.js'
import bodyParser from 'express'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import cors from 'cors';

const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

//home testing route

app.get('/', (req, res) => {
    res.send("This is a page")
})

//User Router
app.use('/api/user', userRouter)

//product Router
app.use('/api/product', productRouter);

//cart Router
app.use('/api/cart', cartRouter)

//address router
app.use('/api/address', addressRouter)

//payment router

app.use('/api/payment', paymentRouter)

mongoose.connect(
    "mongodb+srv://uvaishraza000_db_user:pZ3fVQfG6ooEu7yl@cluster0.wqrsghs.mongodb.net/Accesseries-Store-App",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error(" MongoDB Error", err));
    
const port = 1000;
app.listen(port, () => console.log(`server is runnign on port ${port}`))