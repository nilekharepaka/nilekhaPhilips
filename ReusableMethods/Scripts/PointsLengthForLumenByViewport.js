function getAnnotationPointLengthForLumen(e,viewport) {
    var lumenAnnotators = [];
    var sMPRPointsCount="";
    var cMPRPointsCount="";
    var crossSectionPointsCount="";
        for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.lines')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
               
                        if((window.db[key][i].color=="#FF830F" || window.db[key][i].fillcolor=="rgba(255,131,15,1.0)") && window.db[key][i].lineStyle=="Solid")
                        {
                           
                lumenAnnotators.push(key);
                break;
            }
        }
                
        }
    }
    }
    var visibleAnnotators=[];
    lumenAnnotators.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    switch(viewport)
    {
        case "sMPR":
            var annotationLine=window.db[visibleAnnotators[3]];
            var point=annotationLine[1].points;
            sMPRPointsCount=sMPRPointsCount+point.length+" ";
            var annotationLine=window.db[visibleAnnotators[2]];
            var point=annotationLine[1].points;
            sMPRPointsCount=sMPRPointsCount+point.length+" ";
            return sMPRPointsCount;
        break;
        case "cMPR":
            var annotationLine=window.db[visibleAnnotators[1]];
            var point=annotationLine[1].points;
            cMPRPointsCount=cMPRPointsCount+point.length+" ";
            var annotationLine=window.db[visibleAnnotators[0]];
            var point=annotationLine[1].points;
            cMPRPointsCount=cMPRPointsCount+point.length+" ";
            return cMPRPointsCount;
        break;
        case "cross-section":
            var annotationLine=window.db[visibleAnnotators[4]];
            var point=annotationLine[1].points;
            crossSectionPointsCount=crossSectionPointsCount+point.length;
            return crossSectionPointsCount;
        break;
    }
}
