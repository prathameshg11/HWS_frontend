import React from "react";
import Footer from "./Footer";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div>
      <div>
        <Menu />
        <div className="children">
          <div>{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
