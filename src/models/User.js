const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
    },
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    username: {
        type: String,
        required: 'Username is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    avatar: String,
    confirmHash: String,
    lastSeen: {
        type: Date,
        default: new Date()
    },
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)