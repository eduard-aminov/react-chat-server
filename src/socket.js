const socket = require('socket.io')

const createSocket = (http) => {
    const io = socket(http)
    io.on('connection', (socket) => {
        console.log('Connected')
    })
    return io
}

module.exports = createSocket