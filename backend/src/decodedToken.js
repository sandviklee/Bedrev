const jwt = require('jsonwebtoken')
const { prisma } = require("./database.js");

const secret = "SECRET"

/**
 * Authenticate the token given from http header. 
 * @param {*} req is the header.
 * @returns user or null
 */
const authenticateUser = async (req) => {
    const header = req;

    if (header) {
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;
        return await prisma.user.findUnique({where: {id: userId}});
    }

    return null
}


module.exports = {
    authenticateUser,
    secret
}