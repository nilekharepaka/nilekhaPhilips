function getRenderingModesDetail(e) {
    var volumeAnnotator = [];
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
    var modesString="";
    for(let i=0 ; i<renderingModeAnnotators.length;i++)
    {
        modesString+=renderingModeAnnotators[i].text+" ";
    }
    return modesString;
}
