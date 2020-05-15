
const User=require('../models/User');


let auth=(req, res, next)=>{
    console.log('res-cokkies', req.cookies);
    
    let token=req.cookies.x_auth;

    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({
            success: false,
            error: true
        });
        req.token=token;
        req.user=user;
        next();
    })
}

module.exports={auth};