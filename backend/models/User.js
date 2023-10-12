const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['project manager', 'contractor', 'supervisor', 'visitor'],
    default: 'visitor',
  },
});

// Hash the user's password before saving it
/*userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to validate user's password
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
*/

const User = mongoose.model('User', userSchema);

module.exports = User;
