function getRenderingModesTextPosition(e,text) {
    var volumeAnnotator = [];
    var xCord,yCord;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.PatientDetailsAnnotator') && key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if(window.db[key][i].text=="Entire Volume")
                    {            
                        volumeAnnotator.push(key);
                        break;
                    }
                }
            }
        }   
    }
    var visibleAnnotators=[];
    volumeAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var renderingModeAnnotators=[]
    visibleAnnotators.forEach( function(key)
    {
        for(let i=0 ; i<window.db[key].length;i++)
        {
            var annotator=window.db[key][i];
            if(annotator.fontStyle=="Underline")
                renderingModeAnnotators.push(annotator);
        }
    });
    for(let i=0 ; i<renderingModeAnnotators.length;i++)
    {
        if(renderingModeAnnotators[i].text==text)
        {
            xCord=String(parseInt(renderingModeAnnotators[i].pointToAlign.x));
            yCord=String(parseInt(renderingModeAnnotators[i].pointToAlign.y));
            break;
        }
    }
    return xCord+" "+yCord;
}
