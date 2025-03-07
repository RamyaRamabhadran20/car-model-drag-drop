import React from "react";

const CarBrand = ({ brand, onDrop, onDragOver, onDragEnter, onDragLeave, highlight }) => {
    return (
        <div 
            className={`brand-drop ${highlight ? "highlight hovered" : ""}`}  
            onDrop={(e) => onDrop(e, brand)}
            onDragOver={onDragOver} 
            onDragEnter={onDragEnter} 
            onDragLeave={onDragLeave} 
        >
            <h3>{brand}</h3>
        </div>
    );
};

export default CarBrand;
