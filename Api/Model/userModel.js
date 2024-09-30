const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true
  },
  membershipType: {
    type: String,
    lowercase: true,
    default: "notMember"
  },
  role: {
    type: String,
    role: ["user", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide your password"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same"
    }
  }
});

userSchema.pre("save", async function (next) {
  // only run this function if the password was actually modified
  if (!this.isModified("password")) return next();

  // HAS  the password with cot of 12
  this.password = await bcrypt.hash(this.password, 1);

  // Delete passwordconfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangeAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const chamgeTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < chamgeTimestamp;
  }

  // false means not cahnge
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
