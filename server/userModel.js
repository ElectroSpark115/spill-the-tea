const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 10


const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    //email?
    //real names?
})

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    }
    next();
  } catch (err) {
    next(err);
  }
  
});

userSchema.methods.comparePassword = async function (input) {
  return await bcrypt.compare(input, this.password);
};

module.exports = mongoose.model('User', userSchema) 