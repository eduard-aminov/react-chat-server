const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const cors = require('cors')
const {createServer} = require('http')
const createSocket = require('./socket')

const PORT = config.get('port')

const app = express()
const http = createServer(app)
const io = createSocket(http)

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const dialogRoutes = require('./routes/dialog.routes')
const messageRoutes = require('./routes/message.routes')

const updateLastSeen = require('./middlewares/updateLastSeen.middleware')

app.set('io', io)

app.use(cors())
app.use(bodyParser.json())
app.use(updateLastSeen)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/dialog', dialogRoutes)
app.use('/api/messages', messageRoutes)

const startHttp = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        http.listen(PORT, () => console.log(`Server started at port ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}


startHttp()

module.exports = app