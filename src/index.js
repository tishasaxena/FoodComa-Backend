const express = require('express');
//const bodyParser = require('body-parser');

//const User = require('./schema/userSchema');


const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const User = require('./schema/userSchema');
const authRouter = require('./routes/authRoute');


const app = express();


app.use(express.json()); 
app.use(express.text()); 
app.use(express.urlencoded({extended: true}));


//Routing middleware

//if your req starts with /users then handle it using userRouter
app.use('/users',userRouter); //connects the router to the server
app.use('/carts', cartRouter);
app.use('/auth', authRouter);

app.post('/ping', (req,res)=>{
    console.log(req.body);
    return res.json({message:"pong"});
})

app.post('/users', (req, res) => {
    res.send("POST request received!");
});


app.listen(ServerConfig.PORT, async ()=>{
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT} ..`);


    // const newUser = await User.create({
    //     email: 'c@d.com',
    //     password: '654321',
    //     firstName: 'kripas',
    //     lastName: 'kanathan',
    //     mobileNumber: '4321187680'
    
    // });

    // console.log("Created new user");
    // console.log(newUser);
    
});

//localhost:5500/users- POST
//localhost:5500/carts/0896757 - GET


