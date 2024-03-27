function validateForHFindingMarkers(e,findings) {
    var findingAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {
                let pattern = /^F\d+$/;
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if(pattern.test(window.db[key][0].text))
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
        var keyNameVisible=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        var keyNameTransformable=key.substring(0,key.lastIndexOf(".")+1).concat("isTransformable");
        if(window.db[keyNameVisible]=="True" && window.db[keyNameTransformable]=="True")
            visibleAnnotators.push(key)
    });
    var highest=-1;
    visibleAnnotators.forEach( function (key)
    {
        var findingNumber=window.db[key][0].text;
        if(parseInt(findingNumber.substring(1))>highest)
            highest=parseInt(findingNumber.substring(1));
    });
    return highest==parseInt(findings.substring(1));
}
