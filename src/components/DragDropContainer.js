import React, { useState } from "react";
import CarBrand from "./CarBrand";
import CarList from "./CarList";

const correctMappings = {
    "Camry": "Toyota",
    "CR-V": "Honda",
    "F-150": "Ford"
};

const DragDropContainer = () => {
    const [mappings, setMappings] = useState({});
    const [highlightedBrand, setHighlightedBrand] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    
    const carBrands = ["Honda", "Toyota", "Ford"];
    const carModels = ["CR-V", "Camry", "F-150"];

    const handleDragStart = (e, model) => {
        e.dataTransfer.setData("text/plain", model);
    };

    const handleDragEnter = (brand) => {
        //console.log(`Dragging over ${brand}`);  // Debugging
        setHighlightedBrand(brand);
        //console.log(highlightedBrand);

    };
    const handleDragLeave = () => {
        //console.log(`Dragging away from ${highlightedBrand}`);  
    };
        
    const handleDragOver = (e) => {
        e.preventDefault(); // Allows dropping
    };

    const handleDrop = (e, brand) => {
        e.preventDefault();
        
        const model = e.dataTransfer.getData("text/plain");
    
        //console.log("Dropped model:", model);
        
        if (correctMappings[model] === brand) {
            setMappings((prev) => ({ ...prev, [model]: brand }));
            setErrorMsg("");
        } else {
            setErrorMsg(`${model} does not belong to ${brand}`);
        }
    
        setTimeout(() => {
            setHighlightedBrand(null);
        }, 100); 
    };
    

    return (
        <div className="drag-drop-container">
            <CarList models={carModels} onDragStart={handleDragStart} />
            <div className="brands-container">
                {carBrands.map((brand) => (
                    <CarBrand 
                        key={brand} 
                        brand={brand} 
                        onDrop={handleDrop} 
                        onDragOver={handleDragOver} 
                        onDragEnter={() => handleDragEnter(brand)} // ✅ Bring this back
                        onDragLeave={handleDragLeave} // ✅ Remove highlight when leaving
                        highlight={highlightedBrand === brand} 
                    />
                ))}
            </div>
            {errorMsg && <p className="error-message">{errorMsg}</p>}
            <pre>{JSON.stringify(mappings, null, 2)}</pre>
        </div>
    );
};

export default DragDropContainer;
