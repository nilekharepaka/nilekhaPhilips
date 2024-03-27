function getAnnotationPointsLengthForWall(e,viewport) {
    var wallAnnotators = [];
    var sMPRPointsCount="";
    var crossSectionPointsCount="";
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
            sMPRPointsCount=sMPRPointsCount+point.length+" ";
            var annotationLine=window.db[visibleAnnotators[0]];
            var point=annotationLine[1].points;
            sMPRPointsCount=sMPRPointsCount+point.length+" ";
            return sMPRPointsCount;
        break;
        case "cross-section":
            var annotationLine=window.db[visibleAnnotators[2]];
            var point=annotationLine[1].points;
            crossSectionPointsCount=crossSectionPointsCount+point.length;
            return crossSectionPointsCount;
        break;
    }

}
