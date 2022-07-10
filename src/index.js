const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const expressUserAgent = require("express-useragent");

const keys = require("./config/keys");

const userAuthV1Routes = require("./routes/v1/authentication");
const userBooksV1Routes = require("./routes/v1/books");
const userCommentV1Routes = require("./routes/v1/comments");
const userLikesV1Routes = require("./routes/v1/likes");
const userCategoriesV1Routes = require("./routes/v1/categories");

dotenv.config();

mongoose.connect(keys.mongoDBURI).then(data => {
    console.log(`Connected to MongoDB on database ${data.connection.db.databaseName}`);
}).catch(error => {
    console.log(`Error: ${error}`);
});

const app = express();

app.use(expressUserAgent.express());
app.use(express.json({limit: '10MB'}));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/v1/user/auth', userAuthV1Routes);
app.use('/api/v1/user/books', userBooksV1Routes);
app.use('/api/v1/user/comments', userCommentV1Routes);
app.use('/api/v1/user/likes', userLikesV1Routes);
app.use('/api/v1/user/categories', userCategoriesV1Routes);

const server = app.listen(keys.port, () => {
    console.log(`Server connected in ${keys.nodeENV} mode on port ${keys.port}`);
});

server.on('SIGTERM', () => {
    server.close(error => {
        console.log(`Error: ${error.message}`);
    });
});