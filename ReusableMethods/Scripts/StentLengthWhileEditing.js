function getStentLength(e) {
    var stentLengthReading = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator')&& key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if((window.db[key][i].foregroundColor=="White"))
                    {            
                        stentLengthReading.push(key);
                        break;
                    }
                }              
            }
        }   
    }
    var visibleAnnotators=[];
    stentLengthReading.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var reading=window.db[visibleAnnotators[0]][0].clientInfo.textLines;
    if(reading.length==1)
        return reading[0];
    else 
        return reading[0]+" "+reading[1];
}


