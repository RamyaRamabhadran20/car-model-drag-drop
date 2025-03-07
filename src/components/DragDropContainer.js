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
        console.log(`Dragging over ${brand}`);  // Debugging
        setHighlightedBrand(brand);
        //console.log(highlightedBrand);

    };
    /*const handleDragLeave = (brand) => {
        console.log(`Dragging away from ${highlightedBrand}`);  
        console.log("settign to null");
        setHighlightedBrand(null);
    };*/
    const handleDragLeave = (brand) => {
        console.log(`Dragging away from ${brand}`);  
        setTimeout(() => {
            if (highlightedBrand === brand) { 
                setHighlightedBrand(null);
            }
        }, 10); 
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
        <div className="container text-center"> {/* Bootstrap container */}
            
            <div className="row">
                <div className="col-md-6">
                    <CarList models={carModels} onDragStart={handleDragStart} />
                </div>
                <div className="col-md-6 brands-container">
                    {carBrands.map((brand) => (
                        <CarBrand 
                            key={brand} 
                            brand={brand} 
                            onDrop={handleDrop} 
                            onDragOver={handleDragOver} 
                            onDragEnter={() => handleDragEnter(brand)}  
                            onDragLeave={() => handleDragLeave(brand)} 
                            highlight={highlightedBrand === brand} 
                        />
                    ))}
                </div>
            </div>
            
            {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
            
            <pre className="bg-light p-3 border">{JSON.stringify(mappings, null, 2)}</pre>
        </div>
    );
    
};

export default DragDropContainer;
