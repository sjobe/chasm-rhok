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
	var totalHeight = 0;
	var totalWidth = 0;
	
    var data = new Array(/*INDEX.*/num_profile_segments);
    for (var idx = 0; idx < /*INDEX.*/num_profile_segments; idx++)
    {
        var row = new Array(3);
        row[ CHASM.H ] = parseInt($("#profile" + idx + "\\:height").val());
        row[ CHASM.L ] = parseInt($("#profile" + idx + "\\:length").val());
        row[ CHASM.THETA ] = parseInt($("#profile" + idx + "\\:angle").val());
        data[idx] = row;
        
        totalHeight += row[ CHASM.H ];
        if ( row[ CHASM.THETA ] != 90 && row[ CHASM.THETA ] != -90 )
        {
        	totalWidth += row[ CHASM.H ] / Math.tan( TRIG.degreesToRadians( row[ CHASM.THETA ] ) );
        }
    }
    
    // add virtual segments
	var dataRow = [ 0, Math.round( 0.15 * totalWidth ), 0 ];
	
	data.unshift( dataRow );
	data.push( dataRow );
	
	dataRow = [ Math.round( 0.25 * totalHeight ), 0, 90 ];
	
	data.push( dataRow );
    
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