const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          // Regex for validating email format
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    verifyToken: {
      type: String,
      default: null,
    },
    verifyTokenExpiry: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
    },
    department: {
      type: String,
      enum: ["administrator", "finance", "maintenance", "public"],
      default: "public",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = User;










// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please provide a username"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide an email"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordToken: String,
//   forgotPasswordTokenExpiry: Date,
//   verifyToken: String,
//   verifyTokenExpiry: Date,
//   role: { type: String,  enum: ['admin', 'manager', 'user'] ,default:"user"},
//   department:{
//     type:String , enum:["administrator", "finance" , "maintenance" ,"public" ] , default:"public"
//   }
// });

// const User = mongoose.models.users || mongoose.model("users", userSchema);

// module.exports = User;
