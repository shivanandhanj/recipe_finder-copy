// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile:{type:Schema.Types.ObjectId, ref:'Profile'}
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
