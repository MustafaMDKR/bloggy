import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=social">
            <h6>Social</h6>
          </Link>
          <Link className="link" to="/?cat=sports">
            <h6>Sports</h6>
          </Link>
          <Link className="link" to="/?cat=politics">
            <h6>politics</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className="link" to="/?cat=family">
            <h6>Family</h6>
          </Link>
          
          <span className="write">
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
          <span className=""><strong>{currentUser?.username}</strong></span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
