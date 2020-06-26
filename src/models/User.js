const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        validate: [isEmail, 'Invalid email']
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
    confirm_hash: String,
    last_seen: Date,
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)