const axios = require('axios');
const User = require('../')
const sendMail = (subject , email, content)  => {
    axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
            subject: subject,
            recepientEmails: [email] ,
            content: content
    });
}

module.exports = sendMail;