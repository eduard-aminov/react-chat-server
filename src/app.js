const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const PORT = config.get('port')

const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const dialogRoutes = require('./routes/dialog.routes')
const messageRoutes = require('./routes/message.routes')

const updateLastSeen = require('./middlewares/updateLastSeen.middleware')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/dialog', dialogRoutes)
app.use('/api/messages', messageRoutes)

app.use(updateLastSeen)

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
