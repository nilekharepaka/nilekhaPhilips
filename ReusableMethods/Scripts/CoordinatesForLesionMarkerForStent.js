function getAnnotationCoordinatesForLesionStenosis(e,color) {
    var specifiedColorAnnotators = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.polygon')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if(color=="blue")
                    {
                        if((window.db[key][i].bordercolor=="#21B9FF" || window.db[key][i].fillcolor=="rgba(250,90,75,1.0)") && window.db[key][i].lineStyle=="Solid")
                        {
                            specifiedColorAnnotators.push(key);
                            break;
                        }
                    }
                    else if(color=="orange")
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
        if(annotation.length==4 && parseInt(annotation[2].points[0].y)==parseInt(annotation[3].points[0].y) )
            lesionAnnotator.push(key)

    });
    var point=window.db[lesionAnnotator[0]][3].points;
    xCord=String(parseInt(point[0].x));
    yCord=String(parseInt(point[0].y-10));
    return xCord+" "+yCord;
}