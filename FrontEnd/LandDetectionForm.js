import React, { useState } from 'react';


function LandDetectionForm(){

    // state variables
    const [selectedFile, setSelectedFile] = useState(null);
    const [analysis, setAnalysis] = useState(null)
    const [loading, setLoading] = useState(false);

    // stores all uploaded files in a fileList
    const handleFileChange = (event) =>{
        setSelectedFile(Array.from(event.target.files));
    }

    const handleSubmit = async (e) =>
        {
                e.preventDefault(); // prevent page reload
                if(!selectedFile){
                    alert("Please Upload Images");
                    return;
                }

            setLoading(true);
            // prepare file for upload
            const formData = new FormData();
            selectedFile.forEach(file => {
                formData.append("file", file);
            })
            

            try{
                const response = await fetch("https://localhost:8080/analyze", {
                method: "POST",
                body: formData
                
            });

            if(!response.ok){
                throw new Error("Server error. Check Backend Logs");
            }

            const data = await response.json();
            setAnalysis(data);
            }catch(error){
                console.error(error);
                alert("Image analysis failed");
            } finally{
                setLoading(false);
            }
        };

    return (
        <div className="land-detection-form">
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange}/>
                <button type="submit" disabled={loading}>
                    {loading ? "Analyzing..." : "Upload and Analyze"}
                </button>
            </form>

            {analysis && (
            <div className="analysis">
                <h3>Results</h3>
                <p>Land: {analysis ? analysis.landPercent.toFixed(2) : 0}%</p>
                <p>Water: {analysis ? analysis.waterPercent.toFiced(2) : 0}%</p>
                <p>Status: {analysis ? (analysis.buildable ? "Area is suitable for building" : "Area may not be suitable for building") : "No data to analyze"}</p>
                {analysis.analyzedImageUrl && (
                    <img src={analysis.analyzedImageUrl} alt="Analyzed" style={{ width: '300px', marginTop: '10px' }} />
                )}
            </div>
            )}
        </div>
        
    )
}
export default LandDetectionForm;