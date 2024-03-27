function checkDistalLesionProximalMarkerPresence(e)
{
    return getAnnotationCoordinatesForDistalOrProximalStenosis() && getAnnotationCoordinatesForLesionStenosis();
}


function getAnnotationCoordinatesForDistalOrProximalStenosis() {
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
    return markerAnnotator.length>=2;
}


function getAnnotationCoordinatesForLesionStenosis() {
    var specifiedColorAnnotators = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.polygon')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                        if((window.db[key][i].bordercolor=="#FA5A4B" || window.db[key][i].fillcolor=="rgba(250,90,75,1.0)") && window.db[key][i].lineStyle=="Solid")
                        {
                            specifiedColorAnnotators.push(key);
                            break;
                        }
                }
                
            }
                
        }
    }
    var visibleAnnotators=[];
    specifiedColorAnnotators.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var lesionAnnotator=[]
    visibleAnnotators.forEach( function (key) 
    {
        var annotation=window.db[key];
        if(annotation.length==4 && parseInt(annotation[2].points[0].x)==parseInt(annotation[3].points[0].x) )
            lesionAnnotator.push(key)

    });
    
    return lesionAnnotator.length>=1;
}