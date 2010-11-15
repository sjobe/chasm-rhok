var /*THIS.*/num_profile_segments = 0;
var /*THIS.*/num_rain_rows = 0;
var /*THIS.*/num_strata = 4;

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
+ "<td class=\"delete-segment\">"
+ "<a id=\"profile#ID#:delete\" href=\"#\">x</a>"
+ "</td>"
+ "</tr>"
;

var /*THIS.*/soil_depth_html = 
"<tr class=\"soil-depth\" id=\"soilDepth#ID#\">"
+ "<th scope=\"row\" id=\"soilDepth#ID#:id\">x#ID#</th>"
+ "<td>"
+ "<input name=\"soilStrata[0][depth][]\" id=\"soilDepth#ID#.strata0:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[1][depth][]\" id=\"soilDepth#ID#.strata1:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[2][depth][]\" id=\"soilDepth#ID#.strata2:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[3][depth][]\" id=\"soilDepth#ID#.strata3:depth\"/>"
+ "</td>"
+ "</tr>"
;

var /*THIS.*/water_row_html = 
"<tr class=\"water-row\" id=\"waterDepth#ID#\">"
+ "<th scope=\"row\" id=\"waterDepth#ID#:id\">x#ID#</th>"
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
+ "<option value=\"500\">1 in 500</option>"
+ "</select>"
;

var /*THIS.*/rainfall_row_html =
"<tr id=\"rain#ID#\">"
+ "<td>"
+ /*THIS.*/rain_frequency_select_html
+ "</td>"
+ " <td>"
+ /*THIS.*/rainfall_duration_select_html
+ "</td>"
+ "<td>"
+ "<input id=\"rain#ID#:volume\" name=\"rain[#ID#][volume]\"/>"
+ "</td>"
+ "<td id=\"rain#ID#:delete\" class=\"delete-segment delete-rainfall-row\">"
+ "<a href=\"#\" onclick=\"deleteRainfall(\\\"rain#ID#\\\")\">x</a>"
+ "</td>"
+ "</tr>"
;

var /*THIS.*/counter=0;
function /*THIS.*/getNextElemId() 
{
    var idx = /*THIS.*/counter++;
    var elem = "";

    while  ( idx - 26 > 0 ) {
        elem += "A";
        idx -= 26;
    } 
    elem = elem + String.fromCharCode( 65 + idx % 26);
    return elem;
}

function updateNumProfileSegmentsDisplay()
{
    $("#num-profile-segments").text(/*THIS.*/num_profile_segments);
}

function addSegmentRow()
{

    $("#profile"+(/*THIS.*/num_profile_segments -1)+"\\:delete").remove();
    
    var elem = /*THIS.*/getNextElemId();
    $("#profile-data").append(/*THIS.*/profile_segment_html.replace(/#ID#/g, /*THIS.*/num_profile_segments));
    /*THIS.*/addSoilDepthRow();
    /*THIS.*/addWaterRowHtml();    
    
    $("#profile-data * input").change(function(){
        var elem = $(this).attr("id").split(":", 1);
        /*THIS.*/autoCompleteProfileRow( $(this) );
        if ($("#" + elem + "\\:height").val() 
            && $("#" + elem + "\\:length").val() 
            && $("#" + elem + "\\:angle").val())
        {
            /*THIS.*/render();
        }
    });
    
    $("#profile"+/*THIS.*/num_profile_segments+"\\:delete").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        /*THIS.*/deleteSegment(num);
    });

    /*THIS.*/num_profile_segments++;
    /*THIS.*/updateNumProfileSegmentsDisplay();
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
        var calcH = getH( l, theta );
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
        var calcL = getL( h, theta );
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
        var calcTheta = getTheta( h, l );
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

function addSoilDepthRow()
{
	if( 0 === /*THIS.*/num_profile_segments)
    {
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#ID#/g, "0"));
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#ID#/g, "1"));
	}
    else
    {
		$("#soil-tbody").append(/*THIS.*/soil_depth_html.replace(/#ID#/g, /*THIS.*/num_profile_segments + 1));
	}
}

function addWaterRowHtml()
{
	if( 0 === /*THIS.*/num_profile_segments )
    {
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "0"));
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, "1"));
	}
    else
    {
		$("#water-tbody").append(/*THIS.*/water_row_html.replace(/#ID#/g, /*THIS.*/num_profile_segments + 1));
	}
}

function addRainfallRowHtml()
{
    var newId = /*THIS.*/num_rain_rows++;
	$("#rain-data").append(/*THIS.*/rainfall_row_html.replace(/#ID#/g, newId));
	$("#rain" + newId + " .delete-rainfall-row").click(function(){
		$(this).parent().remove();
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
    
    /*UI_GRAPH.*/updateGraph();
}

function renderProfile()
{
    var profileData = /*CHASM_ARRAY_UTILS.*/buildProfileArray();
    
    var xyPoints = /*TRANSLATE.*/generateXYPoints(profileData);
    if(xyPoints){
        /*UI_GRAPH.*/setGeometry(xyPoints);
    }
}

function renderSoil()
{
    var strataData = /*CHASM_ARRAY_UTILS.*/buildSoilStrataArray();
    /*UI_GRAPH.*/setSoilOffsets(strataData);
}

function renderWaterTable()
{
    var waterData = /*CHASM_ARRAY_UTILS.*/buildWaterArray();
    /*UI_GRAPH.*/setWaterTableOffsets(waterData);
}

function changeSegmentIds( oldId, newId )
{
/*
    if ( oldId < num_profile_segments )
    {
        $("#profile" + oldId).attr("id", "profile" + newId);
        $("#profile" + oldId + "\\:height").attr("name", "profile[" + newId + "][height]");
        $("#profile" + oldId + "\\:height").attr("id", "profile" + newId + ":height");
        $("#profile" + oldId + "\\:length").attr("name", "profile[" + newId + "][length]");
        $("#profile" + oldId + "\\:length").attr("id", "profile" + newId + ":length");
        $("#profile" + oldId + "\\:angle").attr("name", "profile[" + newId + "][angle]");
        $("#profile" + oldId + "\\:angle").attr("id", "profile" + newId + ":angle");
        
        document.getElementById("profile" + oldId + ":delete").onclick = function onclick(event){deleteSegment(newId);};
            
        $("#profile" + oldId + "\\:delete").attr("id", "profile" + newId + ":delete");
    }
    
    $("#soilDepth" + oldId).attr("id", "soilDepth" + newId);
    $("#soilDepth" + oldId + "\\:id").text("x" + newId);
    $("#soilDepth" + oldId + "\\:id").attr("id", "soilDepth" + newId + ":id");
    $("#soilDepth" + oldId + "\\.strata0\\:depth").attr("id", "soilDepth" + newId + ".strata0:depth");
    $("#soilDepth" + oldId + "\\.strata1\\:depth").attr("id", "soilDepth" + newId + ".strata1:depth");
    $("#soilDepth" + oldId + "\\.strata2\\:depth").attr("id", "soilDepth" + newId + ".strata2:depth");
    $("#soilDepth" + oldId + "\\.strata3\\:depth").attr("id", "soilDepth" + newId + ".strata3:depth");
    
    $("#waterDepth" + oldId).attr("id", "waterDepth" + newId);
    $("#waterDepth" + oldId + "\\:id").text("x" + newId);
    $("#waterDepth" + oldId + "\\:id").attr("id", "waterDepth" + newId + ":id");
    $("#waterDepth" + oldId + "\\:depth").attr("id", "waterDepth" + newId + ":depth");
    */
}

function deleteSegment(id){

    $("#profile"+id).remove();
    $("#soilDepth"+(id+1)).remove();
    $("#waterDepth"+(id+1)).remove();
    
    // There's one more point than segments (for soil strata/water)
    //for (var idx=id+1; idx <= num_profile_segments; idx++ )
    //{
    //    changeSegmentIds( idx, idx - 1);
    //}
    /*THIS.*/num_profile_segments--;
    /*THIS.*/updateNumProfileSegmentsDisplay();
    
    /*THIS.*/render();
}

$(document).ready(function(){
    /*THIS.*/updateNumProfileSegmentsDisplay();
    $("#tabs a").click(function(){
        if(!$(this).hasClass("selected")){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("#tab-pages ."+$(this).attr("id")).addClass("selected");
		}
		return false;
	});
    
	$(".add-profile-segment").click(function(){
        /*THIS.*/addSegmentRow();
		return false;
	});
	
	$(".add-rainfall").click(function(){
		/*THIS.*/addRainfallRowHtml();
		return false;
	});
	
	$(".soil-table select").change(function(){
		var sg = /*THIS.*/getSoilGrade($(this).val());
		var elem = $(this).attr("id").split(":", 1);
		$("#" + elem + "\\:c").val(sg.c);
		$("#" + elem + "\\:c").addClass("computed");
        $("#" + elem + "\\:phi").val(sg.phi);
        $("#" + elem + "\\:phi").addClass("computed");
        $("#" + elem + "\\:ks").val(sg.ksat);
        $("#" + elem + "\\:ks").addClass("computed");
	});
});