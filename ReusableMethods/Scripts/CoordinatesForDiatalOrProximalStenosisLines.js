function getAnnotationCoordinatesForDistalOrProximalStenosis(e,location) {
    var greenColorAnnotators = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.polygon')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].bordercolor=="#00BD5E" || window.db[key][i].fillcolor=="rgba(0,189,94,1.0)") && window.db[key][i].lineStyle=="Solid")
                    {
                        greenColorAnnotators.push(key);
                        break;
                    }
                }
                
            }
                
        }
    }
    var visibleAnnotators=[];
    greenColorAnnotators.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var markerAnnotator=[];
    visibleAnnotators.forEach( function (key) 
    {
        var annotation=window.db[key];
        if(annotation[2].points[0].x==annotation[3].points[0].x)
            markerAnnotator.push(key)
    });
    switch(location)
    {
        case "proximal":
            var annotationLine=window.db[markerAnnotator[0]];
            var point=annotationLine[3].points;
            xCord=String(parseInt(point[0].x));
            yCord=String(parseInt(point[0].y-10));
        break;
        case "distal":
            var annotationLine=window.db[markerAnnotator[1]];
            var point=annotationLine[3].points;
            xCord=String(parseInt(point[0].x));
            yCord=String(parseInt(point[0].y-10));
        break;
    }
    return xCord+" "+yCord;
}