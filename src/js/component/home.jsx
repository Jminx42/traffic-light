import React, { useState, useEffect, useRef } from "react";
import LightColor from "./lightColor.jsx";





const Home = () => {
	const colors = ["red", "green", "yellow"];
	const selectedLightRef = useRef(null);
	const [currentColorIndex, setCurrentColorIndex] = useState(-1);
	const [isTrafficLightOn, setIsTrafficLightOn] = useState(false);
  
	const handleClick = (event) => {
	  const index = Number(event.target.id);
	  const selectedLightClassList = event.target.classList;
	  if (index === currentColorIndex) {
		selectedLightClassList.remove("glow", "active");
		setCurrentColorIndex(-1);
	  } else {
		if (currentColorIndex !== -1) {
		  const prevSelectedLight = document.getElementById(currentColorIndex);
		  prevSelectedLight.classList.remove("glow", "active");
		}
		selectedLightClassList.add("glow", "active");
		setCurrentColorIndex(index);
	  }
	};
  
	useEffect(() => {
	  const intervalDuration = 1000;
	  const intervalId = setInterval(() => {
		if (isTrafficLightOn) {
		  setCurrentColorIndex((currentColorIndex) =>
			currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1
		  );
		}
	  }, intervalDuration);
  
	  return () => {
		clearInterval(intervalId);
	  };
	}, [isTrafficLightOn]);
  
	return (
	  <div className="container vh-100">
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
				currentColorIndex === index ? "active glow" : ""
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
			  className="btn btn-primary"
			  onClick={() => {
				setIsTrafficLightOn(!isTrafficLightOn);
			  }}
			>
			  Start Traffic Light
			</button>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default Home;
