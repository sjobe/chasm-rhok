function buildSoilStrataArray()
{
    var data = new Array();
    for (var strataIdx = 0; strataIdx < /*INDEX.*/num_strata; strataIdx++)
    {
        var strata = new Array();
        for (var idx = 0; idx < /*INDEX.*/num_profile_segments + 1; idx++)
        {
            strata.push(parseInt($("#soilDepth" + idx + "\\.strata" + strataIdx + "\\:depth").val()));
        }
        if ( strata.length === /*INDEX.*/num_profile_segments + 1 )
        {
            data[strataIdx] = strata;
        }
    }
    
    return data;
}

function buildProfileArray()
{
    var data = new Array(/*INDEX.*/num_profile_segments);
    for (var idx = 0; idx < /*INDEX.*/num_profile_segments; idx++)
    {
        var row = new Array(3);
        row[0] = parseInt($("#profile" + idx + "\\:height").val());
        row[1] = parseInt($("#profile" + idx + "\\:length").val());
        row[2] = parseInt($("#profile" + idx + "\\:angle").val());
        data[idx] = row;
    }
    
    return data;
}

function buildWaterArray()
{
    var data =  new Array(/*INDEX.*/num_profile_segments);
    for (var idx = 0; idx < /*INDEX.*/num_profile_segments + 1; idx++)
    {
        data[idx] = parseInt($("#waterDepth" + idx +"\\:depth").val());
    }
    
    return data;
}