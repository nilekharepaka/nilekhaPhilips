function getAnnotationCoordinatesForCenterline(e,viewport) {
    var centerlineAnnotators = [];
    var xCord,yCord;
        for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.lines')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
               
                        if((window.db[key][i].color=="#21B9FF" || window.db[key][i].fillcolor=="rgba(33,185,255,1.0)") && window.db[key][i].lineStyle=="Solid")
                        {
                           
                centerlineAnnotators.push(key);
                break;
            }
        }
                
        }
    }
    }
    var visibleAnnotators=[];
    centerlineAnnotators.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    switch(viewport)
    {
        case "volume":
            var annotationLine=window.db[visibleAnnotators[0]];
            var point=annotationLine[1].points;
            xCord=String(parseInt(point[50].x));
            yCord=String(parseInt(point[50].y));
        break;
        case "cMPR":
            var annotationLine=window.db[visibleAnnotators[1]];
            var point=annotationLine[1].points;
            xCord=String(parseInt(point[50].x));
            yCord=String(parseInt(point[50].y));
        break;
    }
    return xCord+" "+yCord;

}
