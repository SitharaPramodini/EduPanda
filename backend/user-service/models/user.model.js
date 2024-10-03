const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      // Add your email validation regex here
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'learner', 'instructor'],
      default: 'learner'
    },
    photo: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    bio: {  
      type: String,
      maxLength: [250, "Bio must not be more than 250 characters"],
      default: "bio",
    },
    otp: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isInstructor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving to DB
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(this.password, salt);
//   this.password = hashedPassword;
//   next();
// });

// Method to generate OTP
userSchema.methods.generateOTP = function() {
  const otpLength = 6; // Length of the OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate random 6-digit OTP
  this.otp = otp;
  this.otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
  return otp;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
