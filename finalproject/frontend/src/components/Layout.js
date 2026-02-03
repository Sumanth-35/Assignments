import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="app-container">
        {children}
      </main>
    </>
  );
};

export default Layout;