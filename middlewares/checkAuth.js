const jwt = require('jsonwebtoken');
const jwtSecret = "abcdsfas1234sdefg1234567"

const checkAuth = (req, res, next) => {
    let token = req.headers["authorization"];
    
    if(token) {
        const decodedToken = jwt.verify(token, jwtSecret)
        req.user = {
            id: decodedToken.id
        }
        next()
    } else {
        req.user = {
            id: null
        }
        next()
    }
}

module.exports = checkAuth;