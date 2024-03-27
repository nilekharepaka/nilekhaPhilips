function getAnnotationCoordinatesForWall(e,viewport) {
    var wallAnnotators = [];
    var xCord,yCord;
    var xCord1,yCord1;
        for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.lines')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
               
                        if((window.db[key][i].color=="#9DD3E3" || window.db[key][i].fillcolor=="rgba(157,211,227,1.0)") && window.db[key][i].lineStyle=="Solid")
                        {
                           
                wallAnnotators.push(key);
                break;
            }
        }
                
        }
    }
    }
    var visibleAnnotators=[];
    wallAnnotators.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    switch(viewport)
    {
        case "sMPR":
            var annotationLine=window.db[visibleAnnotators[1]];
            var point=annotationLine[1].points;
            xCord=String(parseInt(point[100].x));
            yCord=String(parseInt(point[100].y));
            var annotationLine=window.db[visibleAnnotators[0]];
            var point=annotationLine[1].points;
            xCord1=String(parseInt(point[100].x));
            yCord1=String(parseInt(point[100].y));
        break;
        case "cross-section":
            var annotationLine=window.db[visibleAnnotators[2]];
                        var point=annotationLine[1].points;
                        var lowY=100000,highY=-1;
                        var lowYind,highYind;
                        for(var i=0;i<point.length;i++)
                        {
                            if(point[i].y>highY)
                            {
                                highY=point[i].y;
                                highYind=i;
                            }
                            if(point[i].y<lowY)
                            {
                                lowY=point[i].y;
                                lowYind=i;
                            }
                        }
                        xCord=String(parseInt(point[parseInt(lowYind)].x));
                        yCord=String(parseInt(point[parseInt(lowYind)].y));
                        xCord1=String(parseInt(point[parseInt(highYind)].x));
                        yCord1=String(parseInt(point[parseInt(highYind)].y));
        break;
    }
    return xCord+" "+yCord+" "+xCord1+" "+yCord1;
}
