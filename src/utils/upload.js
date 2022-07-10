const cloudinary = require("cloudinary").v2;

const keys = require("./../config/keys");

cloudinary.config(keys.cloudinary);

const uploadFile = (file, options) => {
    return cloudinary.uploader.upload(file, options);
}

const removeFile = (public_id, options) => {
    return cloudinary.uploader.destroy(public_id, options)
}

module.exports = {uploadFile, removeFile};