const express = require('express');
const app = express();
require('dotenv').config()
require('./models/db')
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task_router')
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use('/',taskRouter)
app.use(express.json())



app.listen(PORT,()=>{
    console.log(`Server is running on port = ${PORT}`);
})

