import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [plate, setPlate] = useState("");

  const navigate = useNavigate();

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData
    );

    if (response.status == 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="px-7 py-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}>
          <h3 className="text-base font-medium mb-2">Enter your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="First name"
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              minLength={3}
            />
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="password"
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            minLength={6}
          />

          <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-5">
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="Vehicle Color"
              required
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              minLength={3}
            />
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="Plate number"
              value={plate}
              required
              onChange={(e) => {
                setPlate(e.target.value);
              }}
            />
            <input
              type="text"
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="Capacity"
              required
              value={capacity}
              onChange={(e) => {
                setCapacity(e.target.value);
              }}
            />
            <select
              required
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value);
              }}>
              <option value="" disabled>
                {" "}
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motor Cycle</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-4 w-full placeholder:text-base">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          You have an Account?
          <Link to="/captain-login" className="text-blue-600">
            Login as captain here
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/signup"
          className="bg-[#c95d3c] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-4 w-full placeholder:text-base">
          Register as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
