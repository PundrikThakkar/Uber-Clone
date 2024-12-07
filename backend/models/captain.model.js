const mongoose = require("mongoose");
const match = require("nodemon/lib/monitor/match");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 character long."],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 character long."],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [3, "Email must be at 3 character long."],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "password must be at least 6 character long."],
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be atleast 3 character long."],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be atleast 3 character long."],
    },

    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return token;
};

captainSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

captainModel = mongoose.model("captian", captainSchema);

module.exports = captainModel;
