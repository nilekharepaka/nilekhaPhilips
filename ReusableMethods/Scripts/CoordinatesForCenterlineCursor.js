function getAnnotationCoordinatesForCenterlineCursor(e) {
    var specifiedColorAnnotators = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.polygon')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                
                        if((window.db[key][i].bordercolor=="#21B9FF" || window.db[key][i].fillcolor=="rgba(250,90,75,1.0)") && window.db[key][i].lineStyle=="Solid")
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
    
    var centerlinecursorAnnotator=[]
    visibleAnnotators.forEach( function (key) 
    {
        var annotation=window.db[key];
        if(annotation.length==8 )
        centerlinecursorAnnotator.push(key)

    });
    var volumecursor;
    var highest=0;
    centerlinecursorAnnotator.forEach( function (key)
    {
        var point=window.db[key][3].points;
        if(point[0].y>highest)
        {
            highest=point[0].y;
            volumecursor=key;
        }
    });
    var volumepoint=window.db[volumecursor][3].points;
    xCord=String(parseInt(volumepoint[0].x));
    yCord=String(parseInt(volumepoint[0].y));
    return xCord+" "+yCord;
}