import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader">
      <Spin className="loader-icon"/>
    </div>
  );
};

export default Loader;
