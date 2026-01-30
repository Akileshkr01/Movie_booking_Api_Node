const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');





const app = express();




env.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.listen(3001, () => {
    console.log('Notification server');
});