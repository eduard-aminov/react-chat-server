const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Token needed'})
        }

        req.user = jwt.verify(token, config.get('jwtSecret'))
    } catch (e) {
        res.status(401).json({message: 'Invalid token provided'})
    }
}

module.exports = authMiddleware