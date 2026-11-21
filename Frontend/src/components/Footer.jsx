import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div>
        <h2>FOREVER.</h2>
        <p>
          Your simple destination for quality fashion
          and lifestyle products.
        </p>
      </div>

      <div>
        <h3>QUICK LINKS</h3>

        <Link to="/">Home</Link>
        <Link to="/collection">Collection</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div>
        <h3>CONTACT</h3>
        <p>+91 8978712187</p>
        <p>support@forever.com</p>
      </div>

    </footer>
  );
}

export default Footer;