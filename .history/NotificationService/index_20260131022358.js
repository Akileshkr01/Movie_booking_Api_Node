const express = require('express');
const bodyParser = require('body-parser');





const app = express();
app.use(bodyParser)
app.listen(3001, () => {
    console.log('Notification server');
});