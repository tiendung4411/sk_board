import React, { useEffect, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
const CustomBackground = ({ children, particleOptions }) => {
  useEffect(() => {
    loadSlim().then(() => {
      console.log("Particles Slim loaded");
    });
  }, []);

    const defaultOptions = useMemo(() => {
        //...
    }, []);
  const options = particleOptions || defaultOptions;

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
      {children}
    </div>
  );
};

export default CustomBackground;







  