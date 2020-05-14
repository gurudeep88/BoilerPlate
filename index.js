const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');
const app=express();
dotenv.config();
const config=require('./config/key');

const User=require('./models/User');

mongoose.connect(config.MONGO_URI,
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err)=>{
    if(!err) {
        console.log('DB connected');
    }
    else{
        console.log(err);
        
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//app.use(cookieParser());

app.post('/api/users/register', async (req, res)=>{
    
    const user=new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    });
    try {
        const savedUser=await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
        
    }
    /*await user.save((err, userData)=>{
        if(err) {return res.json({success: false, err})}
        return res.status(200).json({
            success:true
        });
    })*/
    
})
app.get('/', (req, res)=>{
    res.send('hello');
})
app.listen(5000, ()=>{
    console.log('Server Started');
    
})