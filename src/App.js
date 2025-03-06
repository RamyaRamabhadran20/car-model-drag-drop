import React from "react";
import DragDropContainer from "./components/DragDropContainer";
//import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

function App(){
  return(
    <div className="App">
      <h1>Car Model Drag-Drop</h1>
      <DragDropContainer></DragDropContainer>
    </div>
  );
}
export default App;