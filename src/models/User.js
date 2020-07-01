const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Email is required',
        validate: [isEmail, 'Invalid email']
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
    confirm_hash: String,
    last_seen: {
        type: Date,
        default: new Date()
    },
}, {
    timestamps: true
})

module.exports = model('User', UserSchema)