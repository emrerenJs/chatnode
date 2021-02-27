const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.json("ok");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`${PORT} listening..`);
})