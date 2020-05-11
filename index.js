const express=require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://gurudeep2020:Gsr@2020@cluster0-kvytv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
    if(!err) {
        console.log('DB connected');
    }
    else{
        console.log(err);
        
    }
});

const app=express();

app.get('/', (req, res)=>{
    res.send('Hello world');
})
app.listen(5000, ()=>{
    console.log('Server Started');
    
})