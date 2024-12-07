const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  console.log(
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
  );
  if (
    !firstname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required.");
  }
  const captain = captainModel.create({
    fullname: {
      firstname: firstname,
      lastname: lastname,
    },
    email: email,
    password: password,
    vehicle: {
      color: color,
      plate: plate,
      capacity: capacity,
      vehicleType: vehicleType,
    },
  });

  return captain;
};
