//Give Parameter as vessel for occourance of vesselname in all viewports
function getNameOccouranceForVesselOnViewPorts(e,Name) {
    var textAnnotators = [];
    let present;
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.CustomCurveAnnotator') && key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {
                textAnnotators.push(key);
            }      
        }
    }
    var visibleAnnotators=[];
    textAnnotators.forEach( function (key) 
    {
        var keyNameVisible=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        var keyNameTransform=key.substring(0,key.lastIndexOf(".")+1).concat("isTransformable");
        if(window.db[keyNameVisible]=="True" && window.db[keyNameTransform]=="True")
            visibleAnnotators.push(key)
    }); 
    var vesselNameVol=0;
    var vesselNameOtherViewports=0;
    visibleAnnotators.forEach( function (key) 
    {
        if(window.db[key][0].text==Name && window.db[key][0].foregroundColor=="#FDF5D7")
            vesselNameOtherViewports++;
        else if(window.db[key][0].text==Name && window.db[key][0].foregroundColor=="#21B9FF")
            vesselNameVol++;
    });

    present=(vesselNameOtherViewports>=5 && vesselNameVol>=1)?true:false;

    return present;
}