var /*THIS.*/num_profile_segments = 0;
var /*THIS.*/num_rain_rows = 0;
var /*THIS.*/num_strata = 0;

var /*THIS.*/profile_segment_html = 
"<tr id=\"profile#ID#\">"
+ "<td class=\"height\">"
+ "<input id=\"profile#ID#:height\" name=\"profile[#ID#][height]\"/>"
+ "</td>"
+ "<td class=\"length\">"
+ "<input id=\"profile#ID#:length\" name=\"profile[#ID#][length]\"/>"
+ "</td>"
+ "<td class=\"angle\">"
+ "<input id=\"profile#ID#:angle\" name=\"profile[#ID#][angle]\"/>"
+ "</td>"
+ "<td>"
+ "<a class=\"reset-segment\" id=\"profile#ID#:reset\" title=\"Reset\" href=\"#\">o</a>"
+ "</td>"
+ "<td>"
+ "<a class=\"delete-segment\" id=\"profile#ID#:delete\" title=\"Delete\" href=\"#\">x</a>"
+ "</td>"
+ "</tr>"
;

var /*THIS.*/soil_layer_header_html =
"<th id=\"soilStrata#STRATA#:header\" scope=\"col\">"
+ "Strata #NUM# <br/>"
+ "<a class=\"reset-strata\" id=\"soilStrata#STRATA#:reset\" title=\"Reset\" href=\"#\">o</a>"
+ "<a class=\"delete-strata\"id=\"soilStrata#STRATA#:delete\" title=\"Delete\" href=\"#\">x</a>"
+ "</th>"
;

var /*THIS.*/soil_layer_type_html =
"<td>"
+ "<select id=\"soilStrata#STRATA#:type\" name=\"soilStrata[#STRATA#][type]\">"
+ "<option value=\"\" selected=\"selected\"></option>"
+ "<option value=\"1\">I</option>"
+ "<option value=\"2\" >II</option>"
+ "<option value=\"3\" >III</option>"
+ "<option value=\"4\" >IV</option>"
+ "<option value=\"5\" >V</option>"
+ "<option value=\"6\" >VI</option>"
+ "</select>"
+ "</td>"
;

var /*THIS.*/soil_layer_color_html =
	"<td><input name=\"soilStrata[#STRATA#][color]\" id=\"soilStrata#STRATA#:color\"/></td>";

var /*THIS.*/soil_layer_c_html =
"<td><input name=\"soilStrata[#STRATA#][c]\" id=\"soilStrata#STRATA#:c\"/></td>";

var /*THIS.*/soil_layer_phi_html =
"<td><input name=\"soilStrata[#STRATA#][phi]\" id=\"soilStrata#STRATA#:phi\"/></td>";

var /*THIS.*/soil_layer_ks_html =
	"<td><input name=\"soilStrata[#STRATA#][ks]\" id=\"soilStrata#STRATA#:ks\"/></td>";

var /*THIS.*/soil_layer_depth_html =
"<td><input name=\"soilStrata[#STRATA#][depth][]\" id=\"soilDepth#DEPTH#.strata#STRATA#:depth\"/></td>";	

var /*THIS.*/soil_begin_depth_html = 
	"<tr class=\"soil-depth\" id=\"soilDepth0\">"
	+ "<th scope=\"row\" id=\"soilDepth0:id\">begin</th>"
	+ "</tr>"
	;

var /*THIS.*/soil_end_depth_html = 
	"<tr class=\"soil-depth\" id=\"soilDepth#DEPTH#\">"
	+ "<th scope=\"row\" id=\"soilDepth#DEPTH#:id\">end</th>"
	+ "</tr>"
	;

var /*THIS.*/soil_depth_html = 
"<tr class=\"soil-depth\" id=\"soilDepth#DEPTH#\">"
+ "<th scope=\"row\" id=\"soilDepth#DEPTH#:id\">x#DEPTH#</th>"
+ "</tr>"
;

var /*THIS.*/water_row_html = 
"<tr class=\"water-row\" id=\"waterDepth#ID#\">"
+ "<th scope=\"row\" id=\"waterDepth#ID#:id\">#NAME#</th>"
+ "<td>"
+ "<input name=\"waterDepth[]\" id=\"waterDepth#ID#:depth\"/>"
+ "</td>"
+ "</tr>"
;

var /*THIS.*/rainfall_duration_select_html = 
"<select id=\"rain#ID#:duration\" name=\"rain[#ID#][duration]\">"
+ "<option value=\"\" selected=\"selected\"></option>"
+ "<option value=\"1\">1</option>"
+ "<option value=\"2\">2</option>"
+ "<option value=\"3\">3</option>"
+ "<option value=\"4\">4</option>"
+ "<option value=\"5\">5</option>"
+ "<option value=\"6\">6</option>"
+ "<option value=\"10\">10</option>"
+ "<option value=\"12\">12</option>"
+ "<option value=\"24\">24</option>"
+ "</select>"
;

var /*THIS.*/rain_frequency_select_html = 
"<select id=\"rain#ID#:frequency\" name=\"rain[#ID#][frequency]\">"
+ "<option value=\"\" selected=\"selected\"></option>"
+ "<option value=\"5\">1 in 5</option>"
+ "<option value=\"10\">1 in 10</option>"
+ "<option value=\"20\">1 in 20</option>"
+ "<option value=\"50\">1 in 50</option>"
+ "<option value=\"100\">1 in 100</option>"
+ "<option value=\"200\">1 in 200</option>"
+ "<option value=\"500\">1 in 500</option>"
+ "</select>"
;

var /*THIS.*/rainfall_row_html =
"<tr id=\"rain#ID#\">"
+ /*THIS.*/rain_frequency_select_html
+ "</td>"
+ " <td>"
+ /*THIS.*/rainfall_duration_select_html
+ "</td>"
+ "<td>"
+ "<input id=\"rain#ID#:volume\" name=\"rain[#ID#][volume]\"/>"
+ "</td>"
+ "<td id=\"rain#ID#:delete\">"
+ "<a class=\"delete-rainfall-row\" href=\"#\">x</a>"
+ "</td>"
+ "</tr>"
;

function updateNumProfileSegmentsDisplay()
{
    $("#num-profile-segments").text(/*THIS.*/num_profile_segments);
}

function addSegmentRow()
{
	if ( num_profile_segments > 1 )
	{
		$("#profile"+(/*THIS.*/num_profile_segments - 1)+"\\:delete").remove();
	}
    
    $("#profile-data").append(/*THIS.*/profile_segment_html.replace(/#ID#/g, 
    	/*THIS.*/num_profile_segments + 1));
    /*THIS.*/addSoilDepthRow();
    /*THIS.*/addWaterRowHtml();    
    
    $("#profile-data * input").change(function(){
        var elem = $(this).attr("id").split(":", 1);
        /*THIS.*/autoCompleteProfileRow( $(this) );
        if ($("#" + elem + "\\:height").val() 
            && $("#" + elem + "\\:length").val() 
            && $("#" + elem + "\\:angle").val())
        {
            /*THIS.*/renderProfile();
        }
    });
    
    $("#profile"+(/*THIS.*/num_profile_segments + 1 )+"\\:delete").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        /*THIS.*/deleteSegment(num);
    });

    $("#profile"+(/*THIS.*/num_profile_segments + 1 )+"\\:reset").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        /*THIS.*/resetSegment(num);
    });
    
    $("#profileHorizontalBoundary").html( $("#profileHorizontalBoundary").html().replace( new RegExp( "profile\\[" + (num_profile_segments + 1) + "\\]","g"), "profile[" + (num_profile_segments + 2) + "]" ) );
    
    $("#profileVerticalBoundary").html( $("#profileVerticalBoundary").html().replace( new RegExp( "profile\\[" + (num_profile_segments + 2) + "\\]","g"), "profile[" + (num_profile_segments + 3) + "]" ) );
    
    /*THIS.*/num_profile_segments++;
    /*THIS.*/updateNumProfileSegmentsDisplay();
}
function reOrderSoilTabIndexes(){
	var totalNumInputs =$('input','#soil-tbody').length;
	
	var numRows = $('.soil-depth','#soil-tbody').length;
	var numColumns = totalNumInputs / numRows;
	
	$('input','#soil-tbody').each(function(index,element){
		$(this).attr('tabindex',1 + (index % numColumns) + numRows * ( index % numColumns ));
	});
}
function addSoilLayer()
{
    	// add header
		$("#soilStrata\\.header").append(
				/*THIS.*/soil_layer_header_html.replace(/#NUM#/g,
						(/*THIS.*/num_strata + 2)).replace(/#STRATA#/g, /*THIS.*/num_strata) );
    	// add type
		$("#soilStrata\\.type\\:id").append(
				/*THIS.*/soil_layer_type_html.replace(/#STRATA#/g, /*THIS.*/num_strata + 1 ) );
		
		// add change event handler to auto populate
		$(".soil-table select:last").change(function(){
			var sg = /*THIS.*/getSoilGrade($(this).val());
			var elem = $(this).attr("id").split(":", 1);
			$("#" + elem + "\\:c").val(sg.c);
			$("#" + elem + "\\:c").addClass("computed");
	        $("#" + elem + "\\:phi").val(sg.phi);
	        $("#" + elem + "\\:phi").addClass("computed");
	        $("#" + elem + "\\:ks").val(sg.ksat);
	        $("#" + elem + "\\:ks").addClass("computed");
		});
		
    	// add c
		$("#soilStrata\\.type\\:c").append(
				/*THIS.*/soil_layer_c_html.replace(/#STRATA#/g, /*THIS.*/num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:c input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add phi
		$("#soilStrata\\.type\\:phi").append(
				/*THIS.*/soil_layer_phi_html.replace(/#STRATA#/g, /*THIS.*/num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:phi input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add ks
		$("#soilStrata\\.type\\:ks").append(
				/*THIS.*/soil_layer_ks_html.replace(/#STRATA#/g, /*THIS.*/num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:ks input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add depths
		if( /*THIS.*/num_profile_segments > 0 )
	    {
	    	for ( var depthIdx=0; depthIdx <= /*THIS.*/num_profile_segments + 2; depthIdx++ )
	    	{
	    		$("#soilDepth" + depthIdx).append(
	    				/*THIS.*/soil_layer_depth_html.replace(/#STRATA#/g, 
	    						num_strata ).replace(/#DEPTH#/g, depthIdx ) );
	    	}
		}
		
		num_strata++;
		reOrderSoilTabIndexes();
}



function addSoilDepthRow()
{
	if( 0 === /*THIS.*/num_profile_segments )
    {
		$("#soil-tbody").append(/*THIS.*/soil_begin_depth_html);
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#DEPTH#/g, "1"));
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#DEPTH#/g, "2"));
		$("#soil-tbody").append(/*THIS.*/soil_end_depth_html.replace(/#DEPTH#/g, "3"));
		
		if ( num_strata > 0 )
		{
			for ( var strataIdx = 0; strataIdx < num_strata; strataIdx++ )
			{							
		    	for ( var segmentIdx=0; segmentIdx <= 3; segmentIdx++ )
		    	{
		    		$("#soilDepth" + segmentIdx).append(
		    				/*THIS.*/soil_layer_depth_html.replace(/#STRATA#/g, 
		    						strataIdx).replace(/#DEPTH#/g, segmentIdx));
		    	}
	    	}
		}
	}
    else
    {
    	var elem = "soilDepth" + (num_profile_segments + 2);
    	
    	var end = $("#soil-tbody .soil-depth:last").detach();
    	
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#DEPTH#/g, 
			/*THIS.*/num_profile_segments + 2));
		if ( num_strata > 0 )
		{
			for ( var strataIdx = 0; strataIdx < num_strata ; strataIdx++ )
			{
	    		$("#soilDepth" + (num_profile_segments + 2)).append(
	    				/*THIS.*/soil_layer_depth_html.replace(/#STRATA#/g, 
	    						strataIdx).replace(/#DEPTH#/g, num_profile_segments + 2));
	    	}
		}
		
		end.attr( "id", end.attr( "id" ).replace( new RegExp(elem,"g"), "soilDepth" + (num_profile_segments + 3)) );
		end.html( end.html().replace( new RegExp(elem,"g"), "soilDepth" + (num_profile_segments + 3 ) ) );
		
		$("#soil-tbody").append( end );
	}
	reOrderSoilTabIndexes();
}

function addWaterRowHtml()
{
	if( 0 === /*THIS.*/num_profile_segments )
    {
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "0").replace(/#NAME#/g, "begin"));
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "1").replace(/#NAME#/g, "x1"));
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "2").replace(/#NAME#/g, "x2"));
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "3").replace(/#NAME#/g, "end"));
	}
    else
    {
    	var elem = "waterDepth" + (num_profile_segments + 2);
    	var end = $("#water-tbody .water-row:last").detach();
    	
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, /*THIS.*/num_profile_segments + 2).replace(/#NAME#/g, "x" + ( num_profile_segments + 2 ) ) );
		
		end.attr( "id", end.attr( "id" ).replace( new RegExp(elem,"g"), "waterDepth" + (num_profile_segments + 3) ) );
		end.html( end.html().replace( new RegExp(elem,"g"), "waterDepth" + (num_profile_segments + 3 ) ) );
		
		$("#water-tbody").append( end );
	}
}

function addRainfallRowHtml()
{
	// TODO: NEED TO ACCOUNT FOR DELETION OF RAIN ROWS IN ID #s!!!
	
    var newId = /*THIS.*/num_rain_rows++;
	$("#rain-data").append(/*THIS.*/rainfall_row_html.replace(/#ID#/g, newId));
	$("#rain" + newId + " .delete-rainfall-row").click(function(){
		$(this).parent().parent().remove();
	});
	$("#rain" + newId + " select").change(function(){
        var elem = $(this).attr("id").split(":", 1);
		var freq = $("#" + elem + "\\:frequency").val();
		var dur = $("#" + elem + "\\:duration").val();
		if ("" !== freq && "" !== dur ){
			$("#" + elem + "\\:volume").val(/*RAINTABLE.*/getTotalRainVolumeInMM(freq,dur));
            $("#" + elem + "\\:volume").addClass("computed");
		}
	});	
}

function validate(evt, type)
{
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 8 || key == 37 || key == 39 || key == 9 || key == 99 || key == 118)
    { //for backspace and arrows
        return true;
    } 
    key = String.fromCharCode( key );

    if ( "sci" === type )
    {
        var regex = /[0-9]|\.|e|\-/;
    }
    else
    {
        var regex = /[0-9]|\./;
    }
    if( !regex.test(key) )
    {
        theEvent.returnValue = false;
        theEvent.preventDefault();
    }
}

function render()
{
	
    /*THIS.*/renderProfile();
    
    /*THIS.*/renderSoil();
    
    /*THIS.*/renderWaterTable();
    
//    CHASM.fireUpdate( );
    ///*UI_GRAPH.*/updateGraph();
}

function renderProfile()
{
    var profileData = /*CHASM_ARRAY_UTILS.*/buildProfileArray();

    var initialCliff = profileData[0];
	var horizBoundary = profileData[ profileData.length - 2];
	var vertBoundary = profileData[ profileData.length - 1];
	
	$("#profileInitialCliff\\:height").val( initialCliff[ CHASM.H ] );
	$("#profileInitialCliff\\:length").val( initialCliff[ CHASM.L ] );
	$("#profileInitialCliff\\:angle").val( initialCliff[ CHASM.THETA ]);
	
	$("#profileHorizontalBoundary\\:height").val( horizBoundary[ CHASM.H ] );
	$("#profileHorizontalBoundary\\:length").val( horizBoundary[ CHASM.L ] );
	$("#profileHorizontalBoundary\\:angle").val( horizBoundary[ CHASM.THETA ] );
	
	$("#profileVerticalBoundary\\:height").val( vertBoundary[ CHASM.H ] );
	$("#profileVerticalBoundary\\:length").val( vertBoundary[ CHASM.L ] );
	$("#profileVerticalBoundary\\:angle").val( vertBoundary[ CHASM.THETA ] );    
	
	var xyPoints = CHASM.generateXYPoints( profileData );
	
   	CHASM.setProfileData( profileData );
}

function renderSoil()
{
    var strataData = /*CHASM_ARRAY_UTILS.*/buildSoilStrataArray();
    CHASM.setSoilDepths( strataData );
}

function renderWaterTable()
{
    var waterData = /*CHASM_ARRAY_UTILS.*/buildWaterArray();
//    /*UI_GRAPH.*/setWaterTableOffsets(waterData);
    CHASM.setWaterDepths( waterData );
}

function deleteSegment(id){

    $("#profile"+id).remove();
    $("#soilDepth"+(id+1)).remove();
    $("#waterDepth"+(id+1)).remove();
    
    /*THIS.*/num_profile_segments--;
    /*THIS.*/updateNumProfileSegmentsDisplay();
    
    /*THIS.*/render();
}

function resetSegment(id) {
	
    $("#profile"+id+"\\:height").val("");
	$("#profile"+id+"\\:angle").val("");
	$("#profile"+id+"\\:length").val("");
    $("#profile"+id+ "\\:height").removeClass("computed");
    $("#profile"+id+ "\\:height").removeClass("error");
    $("#profile"+id+ "\\:length").removeClass("computed");
    $("#profile"+id+ "\\:length").removeClass("error");
    $("#profile"+id+ "\\:angle").removeClass("computed");
    $("#profile"+id+ "\\:angle").removeClass("error");
	/*THIS.*/renderProfile();
}

function autoCompleteProfileRow( elemTag )
{

	var elem = elemTag.attr( "id" ).split(":",1);

	var h = parseInt( $("#" + elem + "\\:height").val() );
	var l = parseInt( $("#" + elem + "\\:length").val() );
	var theta = parseInt( $("#" + elem + "\\:angle").val() );

    var hasError = false;
    
    $("#" + elem + "\\:height").removeClass("computed");
    $("#" + elem + "\\:height").removeClass("error");
    $("#" + elem + "\\:length").removeClass("computed");
    $("#" + elem + "\\:length").removeClass("error");
    $("#" + elem + "\\:angle").removeClass("computed");
    $("#" + elem + "\\:angle").removeClass("error");
    
    
    if ( h && l && theta && theta !== getTheta( h, l ) ) 
    {
        hasError = true;
    }
    else if ( l && theta && !h )
    {
        var calcH = /*translate.*/getH( l, theta );
 		$("#" + elem + "\\:height").val( calcH );
        if ( isNaN( calcH ) )
        {
            hasError = true;
        }
        else
        {
            $("#" + elem + "\\:height").addClass("computed");
        }
	}
    else if ( h && theta && !l )
    {
        var calcL = /*translate.*/getL( h, theta );
 		$("#" + elem + "\\:length").val( calcL );
        if ( isNaN( calcL ) )
        {
            hasError  = true;
        }
        else
        {
            $("#" + elem + "\\:length").addClass("computed");
        }
	}
    else if( h && l && !theta )
    {
        var calcTheta = /*translate.*/getTheta( h, l );
 		$("#" + elem + "\\:angle").val( calcTheta );
        if (isNaN( calcTheta ) )
        {
            hasError = true;
        }
        else
        {
            $("#" + elem + "\\:angle").addClass("computed");
        }
	}
    
    if ( hasError )
    {
        $("#" + elem + "\\:height").addClass("error");
        $("#" + elem + "\\:length").addClass("error");
        $("#" + elem + "\\:angle").addClass("error");
	}
}

function populateColorChoosers()
{
	$(".color-chooser").empty();
	
	var colors = CHASM.getSoilColors();
	for ( var idx=0; idx < colors.length; idx++ )
	{
		$(".color-chooser").append("<option value=\"" + colors[idx] + "\" style=\"background-color: " + colors[idx] + ";\"></option>");
	}
}

$(document).ready(function(){
    /*THIS.*/updateNumProfileSegmentsDisplay();
    GRAPH.ui = JXG.JSXGraph.initBoard('box', {boundingbox: [-5,100,150,-5], 
    	showNavigation: 1, snapToGrid: true, snapSizeX: 2, snapSizeY: 2, 
    	originX: 0, originY: 500, unitX: 150, unitY: 100, axis:true 
    	// , grid:true /* NEED TO DEBUG JSX GRAPH - having a grid breaks function */ 
    	});
    CHASM.addListener( GRAPH.handleUpdate );
    
	// add tab event handler to select tab
    $("#tabs a").click(function(){
        if(!$(this).hasClass("selected")){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("#tab-pages ."+$(this).attr("id")).addClass("selected");
		}
		return false;
	});
    
	// add segment row event handler to add additional profile segment
	$(".add-profile-segment").click(function(){
        /*THIS.*/addSegmentRow();
		return false;
	});

	// add soil layer event handler to add additional soil layer
	$(".add-soil-layer").click(function(){
        /*THIS.*/addSoilLayer();
		return false;
	});
	
	// add change event handler to auto populate
	$(".soil-table select:first").change(function(){
		var sg = /*THIS.*/getSoilGrade($(this).val());
		var elem = $(this).attr("id").split(":", 1);
		$("#" + elem + "\\:c").val(sg.c);
		$("#" + elem + "\\:c").addClass("computed");
        $("#" + elem + "\\:phi").val(sg.phi);
        $("#" + elem + "\\:phi").addClass("computed");
        $("#" + elem + "\\:ks").val(sg.ksat);
        $("#" + elem + "\\:ks").addClass("computed");
	});
	
	// add c event handler to remove computed marker on manual change
	$("#soilStrata\\.type\\:c input:last").change(function() {
		$(this).removeClass("computed");
	});
	
	// add phi event handler to remove computed marker on manual change
	$("#soilStrata\\.type\\:phi input:last").change(function() {
		$(this).removeClass("computed");
	});
	
	// add ks event handler to remove computed marker on manual change
	$("#soilStrata\\.type\\:ks input:last").change(function() {
		$(this).removeClass("computed");
	});
	
	// add rainfall event handler to add new rainfall row
	$(".add-rainfall").click(function(){
		/*THIS.*/addRainfallRowHtml();
		return false;
	});
	
	//populateColorChoosers()
});