const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'メールアドレスを入力してください。'],
        lowercase: true,
        validate: [isEmail, '正しいメールアドレスを入力してください。']
    },
    password: {
        type: String,
        required: [true, 'パスワードを入力してください。'],
        minlength: [6, 'パスワードは6文字以上にしてください。']
    }
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;