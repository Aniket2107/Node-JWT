const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5000;

dotenv.config();

//MongoDB connect
mongoose.connect(
    process.env.DB_CON,
    {useNewUrlParser:true,
     useUnifiedTopology: true
    },
    () => {console.log('DB connected')}
);

//Middleware
app.use(express.json());
app.use('/',require('./Routes/index'));
app.use('/',require('./Routes/private'));

app.listen(PORT, () => {console.log(`Server started at port ${PORT} `)});