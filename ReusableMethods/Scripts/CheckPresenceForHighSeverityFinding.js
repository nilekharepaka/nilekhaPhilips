function checkPresenceForHighSeverityFindingMarker(e) {
    var findingAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {
                let pattern = /^F\d+$/;
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].foregroundColor=="#F2463D" || window.db[key][0].foregroundColor=="#FCE290") && pattern.test(window.db[key][0].text))
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
    return visibleAnnotators.length>0;
}
