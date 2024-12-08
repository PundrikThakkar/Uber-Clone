import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;

      setUser(data.user);
      localStorage.setItem("token", data.token);

      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-4 w-full placeholder:text-base">
            Create Account
          </button>
        </form>
        <p className="text-center">
          You have an Account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-signup"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-4 w-full placeholder:text-base">
          Register as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
