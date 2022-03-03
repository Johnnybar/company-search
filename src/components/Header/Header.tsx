import React from "react";
import "./Header.scss";
import logo from "../../assets/cosuno-logo.svg";

function Header() {
  return (
    <header className="company-search-header container">
      <div className="row">
        <div className="col-12">
          <div className="company-search-header__content-wrapper">
            <img
              src={logo}
              alt="company-search logo"
              className="company-search-header__logo"
            />
            <h3 className="company-search-header__heading  text-center ">
              Live Company Search and Filter
            </h3>
          </div>
        </div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
