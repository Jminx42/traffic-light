import React, { useState, useEffect, useRef } from "react";
import LightColor from "./lightColor.jsx";





const Home = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const selectedLightRef = useRef(null);
  const [isLightsRunning, setIsLightsRunning] = useState(false);
  const [colors, setColors] = useState(["green", "red", "yellow"]);

  useEffect(() => {

		const intervalId = setInterval(() => {
				setCurrentColorIndex((currentColorIndex) =>
			  currentColorIndex === colors.length - 1 ? 0 : currentColorIndex + 1
			);
			}, 1000);
	  
		  return () => {
			clearInterval(intervalId);
		  };
    
  }, [isLightsRunning]);

  useEffect(() => {

	if (selectedLightRef.current) {
		selectedLightRef.current.classList.add("glow");
		return () => {
		  selectedLightRef.current.classList.remove("glow");
		};
	  }

  }, [currentColorIndex]);

  const handleClick = (event) => {
    setCurrentColorIndex(setColors(colors.filter((el) => indexOf(el) === colors.indexOf(event.target.id))));
  };

  const handleLightsClick = () => {
	// setCurrentColorIndex((currentColorIndex + 1) % colors.length);
	if (isLightsRunning) {
		setIsLightsRunning(false);
	}
	setIsLightsRunning(true);
  }

  return (
    <div className="container vh-100">
      <div className="row bg-dark mx-auto" style={{ width: "40px", height: "100px" }}></div>
      <div className="row bg-dark mx-auto d-grid p-2 rounded" style={{ width: "200px", height: "400px" }}>
        <div
          className={`col-7 rounded-circle mx-auto bg-danger ${currentColorIndex === 1 ? 'active' : ''}`}
          id="red"
          onClick={handleClick}
          ref={currentColorIndex === 1 ? selectedLightRef : null}
        ></div>
        <div
          className={`col-7 rounded-circle mx-auto bg-warning ${currentColorIndex === 2 ? 'active' : ''}`}
          id="yellow"
          onClick={handleClick}
          ref={currentColorIndex === 2 ? selectedLightRef : null}
        ></div>
        <div
          className={`col-7 rounded-circle mx-auto bg-success ${currentColorIndex === 0 ? 'active' : ''}`}
          id="green"
          onClick={handleClick}
          ref={currentColorIndex === 0 ? selectedLightRef : null}
        ></div>
      </div>
      <div className="row m-3">
        <div className="col-4 mx-auto text-center">
          <button className="btn btn-primary" onClick={handleLightsClick}>Start Traffic Lights</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
