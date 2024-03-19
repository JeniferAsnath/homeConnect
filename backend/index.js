const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const {PORT} = process.env || 3000;

app.use(express.json({limit: '50mb'}));

app.get ('/', (req,res)=>{
   return res.json({ok :true})
});


app.listen(PORT, () => {
    console.log( `App listening on port ${PORT}`);
})