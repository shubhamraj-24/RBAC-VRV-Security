const crypto = require("crypto");

const generateRefreshToken = async( userID) => {
const refreshToken = crypto.randomBytes(32).toString("hex");
return refreshToken 
}

module.exports = generateRefreshToken