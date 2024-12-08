import React from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  return <div>CaptainHome</div>;
};

export default CaptainHome;
