//Give Parameter as vessel for occourance of vesselname in all viewports
function getReferenceAndLesionVieportOccourenec(e) {
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
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    }); 
    var referenceText=0;
    var lesionTxt=0;
    visibleAnnotators.forEach( function (key) 
    {
        if(window.db[key][0].text=="Reference")
            referenceText++;
        else if(window.db[key][0].text=="Lesion")
            lesionTxt++;
    });

    present=(referenceText>=2 && lesionTxt>=1)?true:false;

    return present;
}