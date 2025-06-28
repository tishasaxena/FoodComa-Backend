const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser');

//const User = require('./schema/userSchema');


const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const User = require('./schema/userSchema');
const authRouter = require('./routes/authRoute');
const { isLoggedIn } = require('./validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/prodcutRoute');
const orderRouter = require('./routes/orderRoute')

const app = express();

app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.text()); 
app.use(express.urlencoded({extended: true}));


//Routing middleware

//if your req starts with /users then handle it using userRouter
app.use('/users',userRouter); //connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/ping' , (req,res)=>{
    // controller function
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message:"pong"});
});

app.post('/photo', uploader.single('incomingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({message: 'ok'});
});


app.post('/users', (req, res) => {
    res.send("POST request received!");
});


app.listen(ServerConfig.PORT, async ()=>{
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT} ..`);


   
    
});

//localhost:5500/users- POST
//localhost:5500/carts/0896757 - GET


