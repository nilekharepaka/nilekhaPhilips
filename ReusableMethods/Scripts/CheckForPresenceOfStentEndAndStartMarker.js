function checkEndAndStartStentMarkerPresence(e)
{
    var startPresent=startMarker();
    var endPresent=endMarker();
    if(startPresent==1 && endPresent==1)
        return true;
    else
        return false;
}

function endMarker() {
    var endMarkerAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.polygons')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].bordercolor=="#F03CF0" && window.db[key][i].fillcolor=="rgba(240, 60, 240, 1.0)"))
                    {            
                        endMarkerAnnotator.push(key);
                        break;
                    }
                }
            }
        }   
    }
    var visibleAnnotators=[];
    endMarkerAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    if(visibleAnnotators.length >0)
        return 1;
    else
        return 0;
}

function startMarker() {
    var startMarkerAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.polygons')) {            if(window.db[key].length>0)
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
    if(visibleAnnotators.length >0)
        return 1;
    else
        return 0;
}
