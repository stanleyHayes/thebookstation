const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongoDBURI: process.env.MONGODB_URI,
    nodeENV: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: process.env.CLOUDINARY_URL,
    sendGridAPIKey: process.env.SENDGRID_API_KEY,
    sendGridFromEmail: process.env.SENGRID_FROM_EMAIL
}