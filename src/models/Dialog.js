const { Schema, model } = require('mongoose')

const DialogSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: 'Author id is required',
    },
    partnerId: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: 'Partner id is required',
    },
}, {
    timestamps: true
})

module.exports = model('Dialog', DialogSchema)