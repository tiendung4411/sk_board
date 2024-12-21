import React, { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import doImage from "./do.png";
import xanhImage from "./xanh.png";
import vangImage from "./vang.png";
import xanhlaImage from "./xanhla.png";
import bingoImage from "./bingo.png";
import redBG from "../bg/bg1.png";
import darkblueBG from "../bg/bg2.png";
import greenBG from "../bg/green.png";
import yellowBG from "../bg/bg5.png";
import ball1 from "./balls/1_ball.png";
import ball2 from "./balls/2_ball.png";
import ball3 from "./balls/3_ball.png";
import ball4 from "./balls/4_ball.png";
import ball5 from "./balls/5_ball.png";
import ball6 from "./balls/6_ball.png";


const RedBackground = ({ roundColor }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [init, setInit] = useState(false);

  const preloadImages = [doImage, xanhImage, vangImage, xanhlaImage, bingoImage, ball1, ball2, ball3, ball4, ball5, ball6];

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = preloadImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });
      try {
        await Promise.all(imagePromises);
        setImageLoaded(true);
      } catch (error) {
        console.error("Error loading images", error);
      }
    };

    loadImages();
  }, []);

  // Initialize particles once images are loaded
  useEffect(() => {
    if (imageLoaded) {
      initParticlesEngine(async (engine) => {
        await loadFull(engine);
      }).then(() => {
        setInit(true);
      });
    }
  }, [imageLoaded]);

  // Log when RedBackground re-renders
  useEffect(() => {
    console.log("RedBackground re-rendered with color:", roundColor);
  }, [roundColor]);

  // Get background image based on roundColor
  const getBackgroundImage = () => {
    console.log("Getting background image for color:", roundColor);

    switch (roundColor) {
      case 2:
        return darkblueBG;
      case 3:
        return greenBG;
      case 4:
        return yellowBG;
      case 1:
      default:
        return redBG;
    }
  };

  // Particle options
  const options = useMemo(
    () => ({
      autoPlay: true,
      background: {
        image: `url(${getBackgroundImage()})`,
        opacity: 1,
      },
      backgroundMask: {
        composite: "destination-out",
        enable: false,
      },
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            default: true,
            quantity: 4,
          },
        },
      },
      particles: {
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 25,
        },
        shape: {
          type: "image",
          options: {
            image: [
              // { name: "do", src: doImage, width: 13, height: 32 },
              // { name: "xanh", src: xanhImage, width: 13, height: 32 },
              // { name: "xanhla", src: xanhlaImage, width: 13, height: 32 },
              // { name: "bingo", src: bingoImage, width: 52, height: 52 },
              { name: "ball1", src: ball1, width: 22, height: 22 },
              { name: "ball2", src: ball2, width: 12, height: 12 },
              { name: "ball3", src: ball3, width: 22, height: 22 },
              { name: "ball4", src: ball4, width: 12, height: 12 },
              { name: "ball5", src: ball5, width: 22, height: 22 },
              { name: "ball6", src: ball6, width: 12, height: 12 },
            ],
          },
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "bounce",
            bottom: "bounce",
            left: "bounce",
            right: "bounce",
            top: "bounce",
          },
        },
        size: {
          value: { min: 10, max: 25 }, // A default size range for particles
          animation: {
            enable: false, // Turn off global size animation
          },
        },
        opacity: {
          value: 1,
          animation: {
            enable: true,
          },
        },
        collisions: {
          enable: false,
          mode: "bounce",
          absorb: {
            speed: 2,
          },
          bounce: {
            horizontal: { value: 1 },
            vertical: { value: 1 },
          },
        },
        rotate: {
          value: { min: 0, max: 360 },
          animation: {
            enable: true,
            speed: 5,
          },
          direction: "random",
        },
        zIndex: {
          value: 0,
          opacityRate: 1,
          sizeRate: 1,
          velocityRate: 1,
        },
      },
      responsive: [],
      zLayers: 100,
    }),
    [imageLoaded, roundColor] // Recalculate only when `roundColor` changes
  );

  // Loading state
  if (!imageLoaded || !init) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-container">
      <Particles id="tsparticles" options={options} />
    </div>
  );
};

export default React.memo(RedBackground);
