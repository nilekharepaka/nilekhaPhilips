function getCoordinatesForFindingMarkerOnsMPR(e) {
    var findingAnnotator = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.lines')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].color=="#F2463D" || window.db[key][i].fillcolor=="rgba(222, 56, 53, 1.0)"))
                    {            
                        findingAnnotator.push(key);
                        break;
                    }
                }
            }
        }   
    }
    var visibleAnnotators=[];
    findingAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    visibleAnnotators.forEach( function (key)
    {
        var annotation=window.db[key][0];
        if(annotation.points[0].y == annotation.points[1].y)
        {
            xCord=String(parseInt(annotation.points[0].x));
            yCord=String(parseInt(annotation.points[0].y));
        }
    });
    return xCord+" "+yCord;
}
