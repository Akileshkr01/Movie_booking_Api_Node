const axios = require('axios');

const sendMail = (subject , email, content)  => {
    axios.post(process.env.NOTI_SERVICE + '/notiservice/api/v1/notifications',{
            subject: subject,
            


    })
}