function checkStentLinePresenceAfterAcceptEditing(e) {
    var stentMarkerAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.polygons')) {
            if(window.db[key].length>0)
            {
                var marker=true;
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].bordercolor=="Black") && window.db[key][i].fillcolor=="rgba(0, 0, 0, 0.0)")
                    {            
                        marker=true;
                    }
                    else
                    {
                        marker=false;
                    }
                }
                if(marker==true)    
                    stentMarkerAnnotator.push(key);          
            }
        }   
    }
    var visibleAnnotators=[];
    stentMarkerAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(window.db[key])
    });
    if(visibleAnnotators.length==2)
    {
        var first=visibleAnnotators[0];
        var second=visibleAnnotators[1];
        if(first[0].points[0].x == second[0].points[0].x && first[1].points[0].x == second[1].points[0].x)
            return true;
        else
            return false;
    }
    else{
        return false;
    }
}


