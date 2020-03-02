const express=require('express')
const app=express()
app.use(express.static('res'))

app.get('/',(req,res)=>{
    
})

const port=/* process.env ||  */5000
app.listen(port)