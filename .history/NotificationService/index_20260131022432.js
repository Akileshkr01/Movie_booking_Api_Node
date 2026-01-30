const express = require('express');
const bodyParser = require('body-parser');





const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(3001, () => {
    console.log('Notification server');
});