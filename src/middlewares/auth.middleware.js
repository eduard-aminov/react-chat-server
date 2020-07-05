const jwt = require('jsonwebtoken')
const config = require('config')

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1].toString()

        if (!token) {
            return res.status(401).json({message: 'Token needed'})
        }
        const decoded = jwt.verify(
            token,
            config.get('jwtSecret'),
            (err, decoded) => {
            if (err) {
                console.log('Error:', err.message)
            }
            console.log(decoded)
            })

        req.user = decoded
        next()
    } catch (e) {
        console.log('Error:', e.message)
        return res.status(401).json({message: 'Invalid token provided'})
    }
}

module.exports = authMiddleware