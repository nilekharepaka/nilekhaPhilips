function checkForMeasurementAnnotators(e,Measurement) {
    var MeasurementAnnotatorDictionary=
    {
        "Line":".LineAnnotator",
        "Circle*":".SpectralCircleROIAnnotator",
        "Smooth Polyline":".SplineLineAnnotator",
        "Angle":".AngleAnnotator",
        "Freehand Contour":".FreeHandROIAnnotator",
        "Smooth Polygon":".SplineLineAnnotator",
        "Arrow + Text Annotation":".ArrowAnnotator"
    };
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes(MeasurementAnnotatorDictionary[Measurement]) && key.includes('.isVisible')) {
            if(window.db[key]=="True")
            {      
                  return true;      
            }
            else{
                return false;
            }
        }   
    }
    return false;
    
}
