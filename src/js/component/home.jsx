import React, { useState, useEffect, useRef } from "react";
import LightColor from "./lightColor.jsx";

//create your first component
const Home = () => {
  const colors = ["danger", "warning", "success"];
  const selectedLightRef = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(-1);
  const [isTrafficLightOn, setIsTrafficLightOn] = useState(false);

  const handleClick = (event) => {
    const index = Number(event.target.id);
    const selectedLight = selectedLightRef.current;
    setIsSelected(true);
    setCurrentColorIndex(index);
    // If already selected, remove glow effect and active class
    if (isSelected && index === currentColorIndex) {
      setIsSelected(false);
      setCurrentColorIndex(-1);
      selectedLight.classList.remove("glow");
      selectedLight.classList.remove("active");
    } else {
      // If not already selected, add glow effect and active class
      setIsSelected(true);
      setCurrentColorIndex(index);
      if (selectedLight !== null) {
        selectedLight.classList.add("glow");
        selectedLight.classList.add("active");
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTrafficLightOn) {
        setIsSelected(true);
        setCurrentColorIndex((currentColorIndex) =>
          currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1
        );
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isTrafficLightOn]);

  useEffect(() => {
    const selectedLight = selectedLightRef.current;
    if (isSelected) {
      selectedLight.classList.add("glow");
      return () => {
        selectedLight.classList.remove("glow");
      };
    }
  }, [currentColorIndex]);

  return (
    <div className="container h-100">
      <div
        className="row bg-dark mx-auto"
        style={{ width: "40px", height: "100px" }}
      ></div>
      <div
        className="row bg-dark mx-auto d-grid p-2 rounded"
        style={{ width: "200px", height: "400px" }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            className={`col-7 rounded-circle mx-auto bg-${color} ${
              currentColorIndex === index ? "active" : ""
            }`}
            id={index}
            onClick={handleClick}
            ref={currentColorIndex === index ? selectedLightRef : null}
          ></div>
        ))}
      </div>
      <div className="row m-3">
        <div className="col-4 mx-auto text-center">
          <button
            className={`btn btn-${isTrafficLightOn ? "danger" : "success"}`}
            onClick={() => {
              setIsTrafficLightOn(!isTrafficLightOn);
            }}
          >
            {isTrafficLightOn ? "STOP Traffic Light" : "START Traffic Light"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
