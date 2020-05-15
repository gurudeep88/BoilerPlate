const router=require('express').Router();

const cookieParser=require('cookie-parser');

const bodyParser=require('body-parser');
const User=require('../models/User');
const {auth}=require('../middlewares/auth');

//Auth Middleware
router.get('/auth', auth, (req, res)=>{
    res.status(200).json({
        _id:req._id,
        isAuth:true,
        email:req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

//User Register Function
router.post('/register', async (req, res)=>{
    
    const user=new User(req.body);
    console.log(req.body);
    
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

//User Login 
router.post('/login', (req, res)=>{
    
    //find email
        User.findOne({email: req.body.email}, (err, user)=>{
            
            if(!user){
                return res.json({
                    loginSuccess: false,
                    message: 'Auth failed, email not found'
                });
            }
        //compare password
            user.comparePassword(req.body.password, (err, isMatch)=>{
                 if(!isMatch){
                     return res.json({
                         loginSuccess: false, 
                         message: 'wrong password'
                        });
                 }
            })
        //generate token
        user.generateToken((err, user)=>{
            if(err) { return res.status(400).send(err);}
            
            
            res.cookie('x_auth', user.token)
            .status(200)
            .json({
                loginSuccess:true,
                userId: user._id
            })
          console.log(user.token);
            
        })
        })
    
    
    })

//User Logout
router.get('/logout', auth, (req, res)=>{
    User.findOneAndUpdate({_id:req.user.id}, {token:''}, (err, data)=>{
        if(err) return res.json({
            success: false,
            err
        })
        return res.status(200).json({
            success: true
        })
    })
})
    
    

module.exports=router;