import React, { useState, useEffect, useRef } from "react";
import LightColor from "./lightColor.jsx";


//create your first component
const Home = () => {
	const [color, setColor] = useState("");
	const selectedLightRef = useRef(null);
  
	const handleClick = (event) => {
	  setColor(event.target.id);
	};
  
	useEffect(() => {
		const selectedLight = selectedLightRef.current;
		if (selectedLight) {
		  selectedLight.classList.add("glow");
		  return () => {
			selectedLight.classList.remove("glow");
		  };
		}
	}, [color]);
  
	return (
	  <div className="container vh-100">
		<div className="row bg-dark mx-auto" style={{ width: "40px", height: "100px" }}></div>
		<div className="row bg-dark mx-auto d-grid p-2 rounded" style={{ width: "200px", height: "400px" }}>
		  <div className={`col-7 rounded-circle mx-auto bg-danger ${color === 'red' ? 'active' : ''}`} id="red" onClick={handleClick} ref={color === 'red' ? selectedLightRef : null}></div>
		  <div className={`col-7 rounded-circle mx-auto bg-warning ${color === 'yellow' ? 'active' : ''}`} id="yellow" onClick={handleClick} ref={color === 'yellow' ? selectedLightRef : null}></div>
		  <div className={`col-7 rounded-circle mx-auto bg-success ${color === 'green' ? 'active' : ''}`} id="green" onClick={handleClick} ref={color === 'green' ? selectedLightRef : null}></div>
		</div>
	  </div>
	);
  };
  
  export default Home;
