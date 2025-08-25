# SatelliteImageAnalysis - Land Detection
This project analyzes satellite images to detect land vs water areas for environmental and urban applications. The java program classifies areas based on pixel color values and determines if the land is suitable for building. According to masshousingregulations.com, a lot area is deemed buildable if at least 30% is contiguous land.

## **Features**
- Reads Satellite images in standard form (JPG, PNG ...)
- Stores image as Buffer image and analyzes each pixel in order to classify as land or water based on color thresholds.
- Calulates the percentages of both categories (land and water)
- Determines if the area is buildable or not based off percentages.
  
## Real-life Application
- **Agriculture:** Distinguish water bodies and land areas for better management.
- **Disaster assessment:** Analyze water coverage to identify flood-prone areas.
- **Urban planning/Construction:** Identify available land suitable for development

## Repo Structure
SatelliteImageAnalysis/
│
├── images/                  # images for testing
├── Java/
│   └── LandDetection.java   # Main Java program for land/water detection
├── README.md                
└── LICENSE 
