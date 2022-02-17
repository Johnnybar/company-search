import React from "react";
import "./Header.scss";
import logo from "../../assets/cosuno-logo.svg";

function Header() {
  return (
    <header className="cosuno-header container">
      <div className="row">
        <div className="col-12">
          <div className="cosuno-header__content-wrapper">
            <img src={logo} alt="cosuno logo" className="cosuno-header__logo" />
            <h3 className="cosuno-header__heading  text-center ">
              Cosuno Live Company Search and Filter
            </h3>
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
