const express= require("express");
const cors=require("cors");


const port = 3001;
const app= express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET"],
    credentials:true
}))

app.get('/cost',(req,res)=>{

    const randomValue= Math.random();
    const randomNum= Math.floor(randomValue * 100);

    res.json({cost:randomNum});
});

app.listen(port,()=>{
    console.log("Server in running...")
})