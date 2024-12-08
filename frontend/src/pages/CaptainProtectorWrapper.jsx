import React, { useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectorWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setCaptain(data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectorWrapper;
