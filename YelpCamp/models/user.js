const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMonggose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
})

UserSchema.plugin(passportLocalMonggose);

module.exports = mongoose.model('User', UserSchema)