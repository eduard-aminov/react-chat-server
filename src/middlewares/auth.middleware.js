const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization
            ? req.headers.authorization.split(' ')[1].toString()
            : null

        if (!token) {
            return res.status(401).json({
                error: {
                    message: 'Token needed'
                }
            })
        }
        const decoded = jwt.verify(
            token,
            config.get('jwtSecret'),
            (err, decoded) => {
                if (err) {
                    console.log('Error:', err.message)
                }
                return decoded
            })
        req.user = decoded
        next()
    } catch (e) {
        console.log('Error:', e.message)
        return res.status(401).json({
            error:{
                message: 'Invalid token provided'
            }
        })
    }
}

module.exports = authMiddleware