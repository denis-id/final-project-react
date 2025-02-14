import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { LanguageProvider } from "../context/LanguageContext";

function Layout() {
  return (
    <div>
     <LanguageProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </LanguageProvider>
    </div>
  );
}

export default Layout;
