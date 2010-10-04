var num_profile_segments = 0;
var num_rain_rows = 0;
var num_strata = 4;

var profile_segment_html = 
"<tr id=\"profile#NUM#\">"
+ "<td class=\"height\">"
+ "<input id=\"profile#NUM#:height\" name=\"profile[#NUM#][height]\"/>"
+ "</td>"
+ "<td class=\"length\">"
+ "<input id=\"profile#NUM#:length\" name=\"profile[#NUM#][length]\"/>"
+ "</td>"
+ "<td class=\"angle\">"
+ "<input id=\"profile#NUM#:angle\" name=\"profile[#NUM#][angle]\"/>"
+ "</td>"
+ "<td class=\"delete-segment\">"
+ "<a id=\"profile#NUM#:delete\" href=\"#\">x</a>"
+ "</td>"
+ "</tr>"
;

var soil_depth_html = 
"<tr class=\"soil-depth\" id=\"soilDepth#NUM#\">"
+ "<th scope=\"row\" id=\"soilDepth#NUM#:id\">x#NUM#</th>"
+ "<td>"
+ "<input name=\"soilStrata[0][depth][]\" id=\"soilDepth#NUM#.strata0:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[1][depth][]\" id=\"soilDepth#NUM#.strata1:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[2][depth][]\" id=\"soilDepth#NUM#.strata2:depth\"/>"
+ "</td>"
+ "<td>"
+ "<input name=\"soilStrata[3][depth][]\" id=\"soilDepth#NUM#.strata3:depth\"/>"
+ "</td>"
+ "</tr>"
;

var water_row_html = 
"<tr class=\"water-row\" id=\"waterDepth#NUM#\">"
+ "<th scope=\"row\" id=\"waterDepth#NUM#:id\">x#NUM#</th>"
+ "<td>"
+ "<input name=\"waterDepth[]\" id=\"waterDepth#NUM#:depth\"/>"
+ "</td>"
+ "</tr>"
;

var rainfall_duration_select_html = 
"<select id=\"rain#NUM#:duration\" name=\"rain[#NUM#][duration]\">"
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

var rain_frequency_select_html = 
"<select id=\"rain#NUM#:frequency\" name=\"rain[#NUM#][frequency]\">"
+ "<option value=\"\" selected=\"selected\"></option>"
+ "<option value=\"5\">1 in 5</option>"
+ "<option value=\"10\">1 in 10</option>"
+ "<option value=\"20\">1 in 20</option>"
+ "<option value=\"50\">1 in 50</option>"
+ "<option value=\"500\">1 in 500</option>"
+ "</select>"
;

var rainfall_row_html =
"<tr id=\"rain#NUM#\">"
+ "<td>"
+ rain_frequency_select_html
+ "</td>"
+ " <td>"
+ rainfall_duration_select_html
+ "</td>"
+ "<td>"
+ "<input id=\"rain#NUM#:volume\" name=\"rain[#NUM#][volume]\"/>"
+ "</td>"
+ "<td id=\"rain#NUM#:delete\" class=\"delete-segment delete-rainfall-row\">"
+ "<a href=\"#\" onclick=\"deleteRainfall(\\\"rain#NUM#\\\")\">x</a>"
+ "</td>"
+ "</tr>"
;

function updateNumProfileSegmentsDisplay()
{
    $("#num-profile-segments").text(num_profile_segments);
}

function addSegmentRow()
{
    $("#profile-data").append(profile_segment_html.replace(/#NUM#/g, num_profile_segments));
    addSoilDepthRow();
    addWaterRowHtml();    
    updateNumProfileSegmentsDisplay();    
    
    $("#profile-data * input").change(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        autoCompleteProfileRow( num );
        if ($("#profile" + num + "\\:height").val() 
            && $("#profile" + num + "\\:length").val() 
            && $("#profile" + num + "\\:angle").val())
        {
            render();
        }
    });
    
    $("#profile"+num_profile_segments+"\\:delete").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        deleteSegment(num);
    });

    num_profile_segments++;
}

function autoCompleteProfileRow( idx )
{
    var h = parseInt($("#profile" + idx + "\\:height").val());
	var l = parseInt($("#profile" + idx + "\\:length").val());
	var theta = parseInt($("#profile" + idx + "\\:angle").val());
	
	if ( l && theta && !h) {
 		$("#profile" + idx + "\\:height").val(getH( l, theta ));
        $("#profile" + idx + "\\:height").addClass("computed");
	} else if ( h && theta && !l ) {
 		$("#profile" + idx + "\\:length").val(getL( h, theta ));
        $("#profile" + idx + "\\:length").addClass("computed");
	} else if( h && l && !theta ) {
 		$("#profile" + idx + "\\:angle").val(getTheta( h, l ));
        $("#profile" + idx + "\\:angle").addClass("computed");
	}
}

function addSoilDepthRow()
{
	if( 0 === num_profile_segments)
    {
		$("#soil-depths").after(soil_depth_html.replace(/#NUM#/g, "0"));
		$(".soil-depth").after(soil_depth_html.replace(/#NUM#/g, "1"));
	}
    else
    {
		$(".soil-depth:last").after(soil_depth_html.replace(/#NUM#/g, num_profile_segments + 1));
	}
}

function addWaterRowHtml()
{
	if( 0 === num_profile_segments )
    {
		$(".water table").append(water_row_html.replace(/#NUM#/g, "0"));
		$(".water table").append(water_row_html.replace(/#NUM#/g, "1"));
	}
    else
    {
		$(".water table").append(water_row_html.replace(/#NUM#/g, num_profile_segments + 1));
	}
}

function addRainfallRowHtml()
{
	$("#rain-data").append(rainfall_row_html.replace(/#NUM#/g, num_rain_rows));
	$("#rain" + num_rain_rows + " .delete-rainfall-row").click(function(){
		$(this).parent().remove();
	});
	$("#rain"+num_rain_rows+" select").change(function(){
        var num = $(this).attr("id").charAt($(this).attr("id").indexOf(":")-1);
		var freq = $("#rain" + num + "\\:frequency").val();
		var dur = $("#rain" + num + "\\:duration").val();
		if ("" !== freq && "" !== dur ){
			$("#rain" + num + "\\:volume").val(getTotalRainVolumeInMM(freq,dur));
		}
	});	
    num_rain_rows++;
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
    
    renderProfile();
    
    renderSoil();
    
    renderWaterTable();
    
    updateGraph();
}

function renderProfile()
{
    var profileData = buildProfileArray();
    
    var xyPoints = generateXYPoints(profileData);
    if(xyPoints){
        setGeometry(xyPoints);
    }
}

function renderSoil()
{
    var strataData = buildSoilStrataArray();
    setSoilOffsets(strataData);
}

function renderWaterTable()
{
    var waterData = buildWaterArray();
    setWaterTableOffsets(waterData);
}

function changeSegmentIds( oldId, newId )
{
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
}

function deleteSegment(id){

    $("#profile"+id).remove();
    $("#soilDepth"+id).remove();
    $("#waterDepth"+id).remove();
    
    // There's one more point than segments (for soil strata/water)
    for (var idx=id+1; idx <= num_profile_segments; idx++ )
    {
        changeSegmentIds( idx, idx - 1);
    }
    num_profile_segments--;
    updateNumProfileSegmentsDisplay();
    
    render();
}

$(document).ready(function(){
    updateNumProfileSegmentsDisplay();
    $("#tabs a").click(function(){
        if(!$(this).hasClass("selected")){
			$(".selected").removeClass("selected");
			$(this).addClass("selected");
			$("#tab-pages ."+$(this).attr("id")).addClass("selected");
		}
		return false;
	});
    
	$(".add-profile-segment").click(function(){
        addSegmentRow();
		return false;
	});
	
	$(".add-rainfall").click(function(){
		addRainfallRowHtml();
		return false;
	});
	
	$(".soil-table select").change(function(){
		var sg = getSoilGrade($(this).val());
		var num = $(this).attr("name").charAt($(this).attr("name").indexOf("]")-1);
		$("#soilStrata" + num + "\\:c").val(sg.c);
        $("#soilStrata" + num + "\\:phi").val(sg.phi);
        $("#soilStrata" + num + "\\:ks").val(sg.ksat);
	});
});