function getCoordinatesForStartMarkerOfStent(e) {
    var startMarkerAnnotator = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.polygons')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].bordercolor=="#84EFE5" && window.db[key][i].fillcolor=="rgba(132, 239, 229, 1.0)"))
                    {            
                        startMarkerAnnotator.push(key);
                        break;
                    }
                }
            }
        }   
    }
    var visibleAnnotators=[];
    startMarkerAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var annotation=window.db[visibleAnnotators[0]][2];
    xCord=String(parseInt(annotation.points[0].x));
    yCord=String(parseInt(annotation.points[0].y));
    return xCord+" "+yCord;
}
