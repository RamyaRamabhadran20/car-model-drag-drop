import React from "react";

const CarList=({models, onDragStart}) =>{
    return (
        <div className="car-list">
            <h2> Models </h2>
            {models.map((model) =>(
                <div 
                    key={model} 
                    className="draggable-car" 
                    draggable 
                    onDragStart={(e) => onDragStart(e, model)}
                >
                    {model}
                </div>
            ))}
        </div>
    );
};
export default CarList;