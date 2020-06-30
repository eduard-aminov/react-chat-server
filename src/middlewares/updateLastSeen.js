const User = require('../models/User')

const updateLastSeen = ({ next }) => {
    User.updateOne({_id: '5ef63a53024cd63bcc5e10db'}, {last_seen: new Date()}, () => {})
    next()
}

module.exports = updateLastSeen