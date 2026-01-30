const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');





const app = express();




env.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.listen(process, () => {
    console.log('Notification server');
});