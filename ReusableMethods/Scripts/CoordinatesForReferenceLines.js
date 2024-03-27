function getCoordinatesForReferenceLines(e) {
    var ReferenceLineAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.ReferenceLineAnnotator') && key.includes('.lines')) {
            if(window.db[key].length>0)
            {      
                ReferenceLineAnnotator.push(key);          
            }
        }   
    }
    var visibleAnnotators=[];
    ReferenceLineAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var coordinates="";
    visibleAnnotators.forEach( function (key)
    {
        var lines = window.db[key][0].points[1];
        coordinates+=lines.x+" "+lines.y+" ";
    });
    return coordinates;
}
