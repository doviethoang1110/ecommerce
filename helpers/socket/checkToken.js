const jwt = require('jsonwebtoken');
const {secretKey} = require('../../config/configuration')

module.exports.checkToken = async (socket) => {
    try {
        const authHeader = socket.handshake.headers['authorization'];
        const token = authHeader && authHeader.replace("Bearer ", "");
        if(!token) throw new Error('Bạn chưa đăng nhập');
        const decoded = await jwt.verify(token, secretKey.jwtKey);
        return decoded.user.id;
    }catch (error) {
        console.log(error)
        delete error.expiredAt;
        error.message = "Token đã hết hạn"
        throw new Error(error);
    }
}

verifyToken = async (token, secretKey) => {
    return jwt.verify(token, secretKey);
}