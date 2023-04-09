import React, { useState, useEffect, useRef } from "react";
import LightColor from "./lightColor.jsx";


//create your first component
const Home = () => {
	const colors = ["red", "green", "yellow"];
	const selectedLightRef = useRef(null);
	const [isSelected, setIsSelected] = useState(false);
	const [currentColorIndex, setCurrentColorIndex] = useState(-1);
  
	const handleClick = (event) => {
		const index = Number(event.target.id);
		const selectedLight = selectedLightRef.current;
	  
		// If already selected, remove glow effect and active class
		if (isSelected && index === currentColorIndex) {
		  selectedLight.classList.remove("glow");
		  selectedLight.classList.remove("active");
		  setIsSelected(false);
		  setCurrentColorIndex(-1);
		} else {
		  // If not already selected, add glow effect and active class
		//   selectedLight.classList.add("glow");
		  selectedLight.classList.add("active");
		  setIsSelected(true);
		  setCurrentColorIndex(index);
		}
	  };
  
	
	useEffect(() => {
		const selectedLight = selectedLightRef.current;
		if (selectedLight) {
		  selectedLight.classList.add("glow");
		  return () => {
			selectedLight.classList.remove("glow");
		  };
		}
	}, [currentColorIndex]);
  
	return (
	  <div className="container vh-100">
		<div className="row bg-dark mx-auto" style={{ width: "40px", height: "100px" }}></div>
		<div className="row bg-dark mx-auto d-grid p-2 rounded" style={{ width: "200px", height: "400px" }}>
		  <div className={`col-7 rounded-circle mx-auto bg-danger ${isSelected && currentColorIndex === 0 ? 'active' : ''}`} 
		  id="0" onClick={handleClick} ref={isSelected && currentColorIndex === 0  ? selectedLightRef : null}></div>
		  <div className={`col-7 rounded-circle mx-auto bg-warning ${isSelected && currentColorIndex === 2 ? 'active' : ''}`} 
		  id="2" onClick={handleClick} ref={isSelected && currentColorIndex === 2 ? selectedLightRef : null}></div>
		  <div className={`col-7 rounded-circle mx-auto bg-success ${isSelected && currentColorIndex === 1 ? 'active' : ''}`} 
		  id="1" onClick={handleClick} ref={isSelected && currentColorIndex === 1 ? selectedLightRef : null}></div>
		</div>
		<div className="row m-3">
			<div className="col-4 mx-auto text-center">
				<button className="btn btn-primary">Start Traffic Light</button>
			</div>
		</div>
	  </div>
	);
  };
  
  export default Home;
