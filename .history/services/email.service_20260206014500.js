const axios = require('axios');
const User = require('../models/user.model');

const sendMail = async (subject, userId, content) => {
    try {
        if (!process.env.NOTI_SERVICE) {
            throw new Error('NOTI_SERVICE environment variable is not defined');
        }

        const user = await User.findById(userId);

        if (!user || !user.email) {
            throw new Error('User not found or email not available');
        }

        await axios.post(
            `${process.env.NOTI_SERVICE}/notiservice/api/v1/notifications`,
            {
                subject,
                recipientEmails: [user.email],
                content
            }
        );

        return true;
    } catch (error) {
        console.error('Error sending notification email:', error.message);
        throw error; // let caller decide how to handle it
    }
};

module.exports = sendMail;
