const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        maxlength:50, 
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


module.exports=mongoose.model('User', userSchema);
