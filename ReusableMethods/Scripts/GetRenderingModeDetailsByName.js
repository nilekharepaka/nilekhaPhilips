function getRenderingModesDetailByName(e,Input) {
    var InputArray=Input.split(",");
    Layout=InputArray[0];
    Name=InputArray[2];
    Viewport=InputArray[1];
    var PatientAnnotator = [];
    for (var key in window.db) {
        if (key.startsWith('AnnotationGfnObj.') && key.includes('.PatientDetailsAnnotator') && key.includes('.textAnnotations')) {
            if(window.db[key].length>0)
            {                               
                        PatientAnnotator.push(key);
            }
        }   
    }
    var visibleAnnotators=[];
    PatientAnnotator.forEach( function (key) 
    {
        var keyName=key.substring(0,key.lastIndexOf(".")+1).concat("isVisible");
        if(window.db[keyName]=="True")
            visibleAnnotators.push(key)
    });
    var ViewportAnnotators=[]
    var RequiredViewportDetails=[];
    if(Layout=="Coronary Overview Layout")
    {
        visibleAnnotators.forEach(function (key)
        {
            for(let i=0 ; i<window.db[key].length;i++)
            {
                if(window.db[key][i].text=="Entire Volume" || window.db[key][i].text=="Philips,Brilliance CT")
                {
                    ViewportAnnotators.push(key);
                    break;
                }
            }
        });
        switch(Viewport)
        {
            case "Axial":
                RequiredViewportDetails=window.db[ViewportAnnotators[0]];
            break;
            case "Coronal":
                RequiredViewportDetails=window.db[ViewportAnnotators[1]];
            break;
            case "Sagittal":
                RequiredViewportDetails=window.db[ViewportAnnotators[2]];
            break;
            case "Volume":
                RequiredViewportDetails=window.db[ViewportAnnotators[3]];
            break;
        }
        for(let i=0;i<RequiredViewportDetails.length;i++)
        {
            if(RequiredViewportDetails[i].text.includes(Name))
            {
                return RequiredViewportDetails[i].text;
            }
        }
    }

    else if(Layout=="Default Diagnosis Layout")
    {
        visibleAnnotators.forEach(function (key)
        {
            for(let i=0 ; i<window.db[key].length;i++)
            {
                if(window.db[key][i].text=="Entire Volume")
                {
                    ViewportAnnotators.push(key);
                    break;
                }
                else if(window.db[key][i].text=="Philips,Brilliance CT")
                {
                    for(let j=0 ; j<window.db[key].length;j++)
                    {
                        if(window.db[key][j].text.includes("Scan") && window.db[key][j].text.includes("Slice"))
                        {
                            ViewportAnnotators.push(key);
                            break;
                        }
                    }
                }
            }
        });
        switch(Viewport)
        {
            case "Axial":
                RequiredViewportDetails=window.db[ViewportAnnotators[0]];
            break;
            case "Volume":
                RequiredViewportDetails=window.db[ViewportAnnotators[1]];
            break;
        }
        for(let i=0;i<RequiredViewportDetails.length;i++)
        {
            if(RequiredViewportDetails[i].text.includes(Name))
            {
                return RequiredViewportDetails[i].text;
            }
        }
    }

    else if(Layout=="Stenosis Modification Layout")
    {
        visibleAnnotators.forEach(function (key)
        {
            if(window.db[key].length==8)
            {
                ViewportAnnotators.push(key);
            }
            else{
                for(let i=0 ; i<window.db[key].length;i++)
                {
                    if(window.db[key][i].text=="Entire Volume")
                    {
                        ViewportAnnotators.push(key);
                        break;
                    }
                    else if(window.db[key][i].text=="Philips,Brilliance CT")
                    {
                        for(let j=0 ; j<window.db[key].length;j++)
                        {
                            if(window.db[key][j].text.includes("Scan") && window.db[key][j].text.includes("Slice"))
                            {
                                ViewportAnnotators.push(key);
                                break;
                            }
                        }
                    }
                }
            }
        });
        switch(Viewport)
        {
            case "Axial":
                RequiredViewportDetails=window.db[ViewportAnnotators[0]];
            break;
            case "Volume":
                RequiredViewportDetails=window.db[ViewportAnnotators[1]];
            break;
            case "cMPR":
                RequiredViewportDetails=window.db[ViewportAnnotators[2]];
            break;
            case "sMPR":
                RequiredViewportDetails=window.db[ViewportAnnotators[3]];
            break;
        }
        for(let i=0;i<RequiredViewportDetails.length;i++)
        {
            if(RequiredViewportDetails[i].text.includes(Name))
            {
                return RequiredViewportDetails[i].text;
            }
        }
    }
}
