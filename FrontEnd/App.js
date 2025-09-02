import React from 'react';
import LandDetectionForm from './LandDetectionForm';


function App(){
    return(
        <div className="app-container">
            <h1> Satellite Land Detection </h1>
            <p> Upload image for analysis</p>
            <LandDetectionForm />  {/* Image Upload forms */}
        </div>
    );
}

export default App;