const express = require('express');
const bodyParser = require('body-parser');





const app = express();
app.use(bodyParser.json());
app.use
app.listen(3001, () => {
    console.log('Notification server');
});