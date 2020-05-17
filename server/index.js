const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
const authRoutes=require('./routes/routers');
const config=require('./config/key');

const User=require('./models/User');

mongoose.connect(config.MONGO_URI,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err)=>{
    if(!err) {
        console.log('DB connected successfully');
    }
    else{
        console.log(err);
        
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/api/users', authRoutes);
//Login

app.get('/', (req, res)=>{
    res.send('hello');
})
app.listen(5000, ()=>{
    console.log('Server Started');
    
})