const captainModel = require("../models/captain.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "Captain Already Exist" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  return res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel
    .findOne({ email: email })
    .select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Captain doesn't exist." });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  return res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  //   res.clearCookie("token");

  //   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  //   await blacklistTokenModel.create({ token });

  //   res.status(200).json({ message: "Logged out" });

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (token) {
    await blacklistTokenModel.create({ token });

    res.clearCookie("token");
  }
  res.status(200).json({ message: "Logged out" });
};
