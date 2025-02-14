import React from "react";
import woman from "../assets/images/woman.jpg";

const Layouts = () => {
  return (
    <div className="" style={{backgroundColor:'#EFE8D9'}}>
      {/* Hero Section */}
      <section className="w-full h-[50vh] max-h-[500px] md:h-screen overflow-hidden">
        <img
          src={woman}
          alt="Store"
          className="w-full h-full object-cover object-center"
        />
      </section>
    </div>
  );
};

export default Layouts;
