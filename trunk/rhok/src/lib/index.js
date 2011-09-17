var num_profile_segments = 0;
var num_rain_rows = 0;
var num_strata = 0;

function initTemplates(){
	$.template("infoDataOption","<option value='${name}'>{{if name!==''}}${name} Lat:${latitude} Long:${longitude}{{else}}Please select a local file{{/if}}</option>");
	$.template("profileHeaderFooterTd",
			'<td class="${name}">'+
			'<input class="${$item.tdClass}" id="${$item.tdPrefix}:${name}" name="${$item.tdPrefix}[${ID}][${name}]"/>'+
			'</td>'
	);
	$.template('profileHeaderFooterTr',
			"<tr id='${prefix}'>"
			+"{{tmpl(row.columns, {tdPrefix:prefix,tdClass:class}) 'profileHeaderFooterTd'}}"
			+"<td></td>"
			+"<td></td>"
			+"</tr>");
	$.template("profileSegmentTd", 
			" <td class='${name}'>"
			+ "<input id='profile${ID}:${name}' name='profile[${ID}][${name}]' value='${value}'/>"
			+ "</td>");
	$.template("profileBodyTr", "<tr id='profile${ID}'>"
			+ "{{tmpl(columns) 'profileSegmentTd'}}"
			+ "<td><a class='reset-segment' id='profile${ID}:reset' title='Reset' href='#'>o</a>"
			+ "</td>"
			+ "<td>"
			+ "<a class='delete-segment' id='profile${ID}:delete' title='Delete' href='#'>x</a>"
			+ "</td>"
			+ "</tr>");
	
	$.template("soilLayerHeader","<th id='soilStrata${STRATA}:header' scope='col'>"
			+ "Strata ${NUM} <br/>"
			+ "<a class='reset-strata' id='soilStrata${STRATA}:reset' title='Reset' href='#'>o</a>"
			+ "<a class='delete-strata'id='soilStrata${STRATA}:delete' title='Delete' href='#'>x</a>"
			+ "</th>");
	$.template("soilLayerType","<td>"
			+ "<select id='soilStrata${STRATA}:type' name='soilStrata[${STRATA}][type]'>"
			+ "<option value='' selected='selected'></option>"
			+ "<option value='1'>I</option>"
			+ "<option value='2' >II</option>"
			+ "<option value='3' >III</option>"
			+ "<option value='4' >IV</option>"
			+ "<option value='5' >V</option>"
			+ "<option value='6' >VI</option>"
			+ "</select>"
			+ "</td>");
	$.template("soilLayerColor","<td><input name='soilStrata[${STRATA}][color]' id='soilStrata${STRATA}:color'/></td>");
	$.template("soilLayerC","<td><input name='soilStrata[${STRATA}][c]' id='soilStrata${STRATA}:c'/></td>");
	$.template("soilLayerPhi","<td><input name='soilStrata[${STRATA}][phi]' id='soilStrata${STRATA}:phi'/></td>");
	$.template("soilLayerKs","<td><input name='soilStrata[${STRATA}][ks]' id='soilStrata${STRATA}:ks'/></td>");
	$.template("soilLayerDepth","<td><input name='soilStrata[${STRATA}][depth][]' id='soilDepth${DEPTH}.strata${STRATA}:depth'/></td>");
	$.template("soilBeginDepth","<tr class='soil-depth' id='soilDepth0'>"
			+ "<th scope='row' id='soilDepth0:id'>begin</th>"
			+ "</tr>");
	$.template("soilEndDepth","<tr class='soil-depth' id='soilDepth${DEPTH}'>"
			+ "<th scope='row' id='soilDepth${DEPTH}:id'>end</th>"
			+ "</tr>");
	$.template("soilDepth","<tr class='soil-depth' id='soilDepth${DEPTH}'>"
			+ "<th scope='row' id='soilDepth${DEPTH}:id'>x${DEPTH}</th>"
			+ "</tr>");
	$.template("waterRow","<tr class='water-row' id='waterDepth${ID}'>"
			+ "<th scope='row' id='waterDepth${ID}:id'>${NAME}</th>"
			+ "<td>"
			+ "<input name='waterDepth[]' id='waterDepth${ID}:depth'/>"
			+ "</td>"
			+ "</tr>");
	$.template("rainFrequencySelect","<select id='rain${ID}:frequency' name='rain[${ID}][frequency]'>"
			+ "<option value='' selected='selected'></option>"
			+ "<option value='5'>1 in 5</option>"
			+ "<option value='10'>1 in 10</option>"
			+ "<option value='20'>1 in 20</option>"
			+ "<option value='50'>1 in 50</option>"
			+ "<option value='100'>1 in 100</option>"
			+ "<option value='200'>1 in 200</option>"
			+ "<option value='500'>1 in 500</option>"
			+ "</select>");
	$.template("rainfalDurationSelect","<select id='rain${ID}:duration' name='rain[${ID}][duration]'>"
			+ "<option value='' selected='selected'></option>"
			+ "<option value='1'>1</option>"
			+ "<option value='2'>2</option>"
			+ "<option value='3'>3</option>"
			+ "<option value='4'>4</option>"
			+ "<option value='5'>5</option>"
			+ "<option value='6'>6</option>"
			+ "<option value='10'>10</option>"
			+ "<option value='12'>12</option>"
			+ "<option value='24'>24</option>"
			+ "</select>");
	$.template("rainfallRow","<tr id='rain${ID}'>"
			+ "<td>${rainFrequencySelect}</td>"
			+ "<td>${rainfallDurationSelect}</td>"
			+ "<td>"
			+ "<input id='rain${ID}:volume' name='rain[${ID}][volume]'/>"
			+ "</td>"
			+ "<td id='rain${ID}:delete'>"
			+ "<a class='delete-rainfall-row' href='#'>x</a>"
			+ "</td>"
			+ "</tr>");	
}
var profile_segment_html = 
	"<tr id=\"profile#ID#\">"
	+ "<td class=\"height\">"
	+ "<input id=\"profile#ID#:height\" name=\"profile[#ID#][height]\"/>"
	+ "</td>"
	+ "<td class=\"angle\">"
	+ "<input id=\"profile#ID#:angle\" name=\"profile[#ID#][angle]\"/>"
	+ "</td>"
	+ "<td class=\"length\">"
	+ "<input id=\"profile#ID#:length\" name=\"profile[#ID#][length]\"/>"
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
var soil_layer_header_html =
"<th id=\"soilStrata#STRATA#:header\" scope=\"col\">"
+ "Strata #NUM# <br/>"
+ "<a class=\"reset-strata\" id=\"soilStrata#STRATA#:reset\" title=\"Reset\" href=\"#\">o</a>"
+ "<a class=\"delete-strata\"id=\"soilStrata#STRATA#:delete\" title=\"Delete\" href=\"#\">x</a>"
+ "</th>"
;

var soil_layer_type_html =
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
	var /*THIS.*/soil_layer_phi_html =
	"<td><input name=\"soilStrata[#STRATA#][phi]\" id=\"soilStrata#STRATA#:phi\"/></td>";

var soil_layer_color_html =
	"<td><input name=\"soilStrata[#STRATA#][color]\" id=\"soilStrata#STRATA#:color\"/></td>";

	var /*THIS.*/soil_layer_ks_html =
		"<td><input name=\"soilStrata[#STRATA#][ks]\" id=\"soilStrata#STRATA#:ks\"/></td>";
var soil_layer_c_html =
"<td><input name=\"soilStrata[#STRATA#][c]\" id=\"soilStrata#STRATA#:c\"/></td>";

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
	+ "<td id=\"rain#ID#:delete\">"
	+ "<a class=\"delete-rainfall-row\" href=\"#\">x</a>"
	+ "</td>"
	+ "</tr>"
	;

function updateNumProfileSegmentsDisplay()
{
    $("#num-profile-segments").text(num_profile_segments);
}

function addSegmentRow()
{
	if ( num_profile_segments > 1 )
	{
		$("#profile"+(num_profile_segments - 1)+"\\:delete").remove();
	}
    
    $("#profile-data").append(profile_segment_html.replace(/#ID#/g, 
    	num_profile_segments + 1));
    addSoilDepthRow();
    addWaterRowHtml();    
    
    $("#profile-data * input").change(function(){
        var elem = $(this).attr("id").split(":", 1);
        autoCompleteProfileRow( $(this) );
        if ($("#" + elem + "\\:height").val() 
            && $("#" + elem + "\\:length").val() 
            && $("#" + elem + "\\:angle").val())
        {
            renderProfile();
        }
    });
    
    $("#profile"+(num_profile_segments + 1 )+"\\:delete").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        deleteSegment(num);
    });

    $("#profile"+(num_profile_segments + 1 )+"\\:reset").click(function(){
        var num = parseInt($(this).attr("id").charAt($(this).attr("id").indexOf(":")-1));
        resetSegment(num);
    });
    
    $("#profileHorizontalBoundary").html( $("#profileHorizontalBoundary").html().replace( new RegExp( "profile\\[" + (num_profile_segments + 1) + "\\]","g"), "profile[" + (num_profile_segments + 2) + "]" ) );
    
    $("#profileVerticalBoundary").html( $("#profileVerticalBoundary").html().replace( new RegExp( "profile\\[" + (num_profile_segments + 2) + "\\]","g"), "profile[" + (num_profile_segments + 3) + "]" ) );
    
    num_profile_segments++;
    updateNumProfileSegmentsDisplay();
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
				soil_layer_header_html.replace(/#NUM#/g,
						(num_strata + 2)).replace(/#STRATA#/g, num_strata) );
    	// add type
		$("#soilStrata\\.type\\:id").append(
				soil_layer_type_html.replace(/#STRATA#/g, num_strata + 1 ) );
		
		// add change event handler to auto populate
		$(".soil-table select:last").change(function(){
			var sg = getSoilGrade($(this).val());
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
				soil_layer_c_html.replace(/#STRATA#/g, num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:c input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add phi
		$("#soilStrata\\.type\\:phi").append(
				soil_layer_phi_html.replace(/#STRATA#/g, num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:phi input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add ks
		$("#soilStrata\\.type\\:ks").append(
				soil_layer_ks_html.replace(/#STRATA#/g, num_strata + 1) );
		
		// add event handler to remove computed marker on manual change
		$("#soilStrata\\.type\\:ks input:last").change(function() {
			$(this).removeClass("computed");
		});
		
    	// add depths
		if( num_profile_segments > 0 )
	    {
	    	for ( var depthIdx=0; depthIdx <= num_profile_segments + 2; depthIdx++ )
	    	{
	    		$("#soilDepth" + depthIdx).append(
	    				soil_layer_depth_html.replace(/#STRATA#/g, 
	    						num_strata ).replace(/#DEPTH#/g, depthIdx ) );
	    	}
		}
		
		num_strata++;
		reOrderSoilTabIndexes();
}



function addSoilDepthRow()
{
	if( 0 === num_profile_segments )
    {
		$("#soil-tbody").append(soil_begin_depth_html);
		$("#soil-tbody").append(soil_depth_html.replace(/#DEPTH#/g, "1"));
		$("#soil-tbody").append(soil_depth_html.replace(/#DEPTH#/g, "2"));
		$("#soil-tbody").append(soil_end_depth_html.replace(/#DEPTH#/g, "3"));
		
		if ( num_strata > 0 )
		{
			for ( var strataIdx = 0; strataIdx < num_strata; strataIdx++ )
			{							
		    	for ( var segmentIdx=0; segmentIdx <= 3; segmentIdx++ )
		    	{
		    		$("#soilDepth" + segmentIdx).append(
		    				soil_layer_depth_html.replace(/#STRATA#/g, 
		    						strataIdx).replace(/#DEPTH#/g, segmentIdx));
		    	}
	    	}
		}
	}
    else
    {
    	var elem = "soilDepth" + (num_profile_segments + 2);
    	
    	var end = $("#soil-tbody .soil-depth:last").detach();
    	
		$("#soil-tbody").append(soil_depth_html.replace(/#DEPTH#/g, 
			num_profile_segments + 2));
		if ( num_strata > 0 )
		{
			for ( var strataIdx = 0; strataIdx < num_strata ; strataIdx++ )
			{
	    		$("#soilDepth" + (num_profile_segments + 2)).append(
	    				soil_layer_depth_html.replace(/#STRATA#/g, 
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
	if( 0 === num_profile_segments )
    {
		$("#water-tbody").append(water_row_html.replace(/#ID#/g, "0").replace(/#NAME#/g, "begin"));
		$("#water-tbody").append(water_row_html.replace(/#ID#/g, "1").replace(/#NAME#/g, "x1"));
		$("#water-tbody").append(water_row_html.replace(/#ID#/g, "2").replace(/#NAME#/g, "x2"));
		$("#water-tbody").append(water_row_html.replace(/#ID#/g, "3").replace(/#NAME#/g, "end"));
	}
    else
    {
    	var elem = "waterDepth" + (num_profile_segments + 2);
    	var end = $("#water-tbody .water-row:last").detach();
    	
		$("#water-tbody").append(water_row_html.replace(/#ID#/g, num_profile_segments + 2).replace(/#NAME#/g, "x" + ( num_profile_segments + 2 ) ) );
		
		end.attr( "id", end.attr( "id" ).replace( new RegExp(elem,"g"), "waterDepth" + (num_profile_segments + 3) ) );
		end.html( end.html().replace( new RegExp(elem,"g"), "waterDepth" + (num_profile_segments + 3 ) ) );
		
		$("#water-tbody").append( end );
	}
}

function addRainfallRowHtml()
{	
    var newId = num_rain_rows++;
	$("#rain-data").append(rainfall_row_html.replace(/#ID#/g, newId));
	$("#rain" + newId + " .delete-rainfall-row").click(function(){
		// TODO: NEED TO ACCOUNT FOR DELETION OF RAIN ROWS IN ID #s!!!
		// $(this).parent().parent().remove();
	});
	$("#rain" + newId + " select").change(function(){
        var elem = $(this).attr("id").split(":", 1);
		var freq = $("#" + elem + "\\:frequency").val();
		var dur = $("#" + elem + "\\:duration").val();
		if ("" !== freq && "" !== dur ){
			$("#" + elem + "\\:volume").val(/* RAINTABLE. */getTotalRainVolumeInMM(freq,dur));
            $("#" + elem + "\\:volume").addClass("computed");
		}
	});	
}

function validate(evt, type)
{
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    if (key == 8 || key == 37 || key == 39 || key == 9 || key == 99 || key == 118)
    { // for backspace and arrows
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
    
// CHASM.fireUpdate( );
    // /*UI_GRAPH.*/updateGraph();
}

function renderProfile()
{
    var profileData = /* CHASM_ARRAY_UTILS. */buildProfileArray();

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
    var strataData = /* CHASM_ARRAY_UTILS. */buildSoilStrataArray();
    CHASM.setSoilDepths( strataData );
}

function renderWaterTable()
{
    var waterData = /* CHASM_ARRAY_UTILS. */buildWaterArray();
// /*UI_GRAPH.*/setWaterTableOffsets(waterData);
    CHASM.setWaterDepths( waterData );
}

function deleteSegment(id){

    $("#profile"+id).remove();
    $("#soilDepth"+(id+1)).remove();
    $("#waterDepth"+(id+1)).remove();
    
    num_profile_segments--;
    updateNumProfileSegmentsDisplay();
    
    render();
}

function resetSegment(id) {
	var profileId = $("[id^='profile"+id+"']");
	profileId.val("").removeClass("computed error");
    
	renderProfile();
}

function autoCompleteProfileRow( elemTag )
{

	var elem = elemTag.attr( "id" ).split(":",1);
	var height = $("#" + elem + "\\:height");
	var length = $("#" + elem + "\\:length");
	var angle = $("#" + elem + "\\:angle");
	var h = parseInt( height.val() );
	var l = parseInt( length.val() );
	var theta = parseInt( angle.val() );

    var hasError = false;
    
    height.removeClass("computed error");
    length.removeClass("computed error");
    angle.removeClass("computed error");
    
    
    if ( h && l && theta && theta !== getTheta( h, l ) ) 
    {
        hasError = true;
    }
    else if ( l && theta && !h )
    {
        var calcH = /* translate. */getH( l, theta );
 		height.val( calcH );
        if ( isNaN( calcH ) )
        {
            hasError = true;
        }
        else
        {
            height.addClass("computed");
        }
	}
    else if ( h && theta && !l )
    {
        var calcL = /* translate. */getL( h, theta );
 		length.val( calcL );
        if ( isNaN( calcL ) )
        {
            hasError  = true;
        }
        else
        {
            length.addClass("computed");
        }
	}
    else if( h && l && !theta )
    {
        var calcTheta = /* translate. */getTheta( h, l );
 		angle.val( calcTheta );
        if (isNaN( calcTheta ) )
        {
            hasError = true;
        }
        else
        {
            angle.addClass("computed");
        }
	}
    
    if ( hasError )
    {
        height.addClass("error");
        length.addClass("error");
        angle.addClass("error");
	}
}

$(document).ready(function(){
	$.couch.urlPrefix= 'db'; //matches .htaccess in %apacheDir%/db/.htaccess
	initTemplates();
	//	RewriteEngine on
	//	RewriteRule ^(.*)$ http://localhost:5984/$1 [P]
	var infoFileList =$("#infoData\\:fileList");
	var loginLogout = $("#infoData\\:loginLogout");
	loginLogout.toggle(function(event){
		login();
	},function(event){
		logout();
	});
	infoFileList.bind("refresh", function(event, data){
    	var select = $(this).clone();
    	select.empty();
		var json =new Array();
		
		json.unshift({name:""});
		$.tmpl("infoDataOption",json).appendTo(select);
		if(json.length > 1 && select.is(":disabled")){
			select.removeAttr("disabled");	
		}
		$(this).replaceWith(select);
    });
    updateNumProfileSegmentsDisplay();
    GRAPH.ui = JXG.JSXGraph.initBoard('box', {boundingbox: [-5,100,150,-5], 
    	showNavigation: 1, snapToGrid: true, snapSizeX: 2, snapSizeY: 2, 
    	originX: 0, originY: 500, unitX: 150, unitY: 100, axis:true 
    	// , grid:true /* NEED TO DEBUG JSX GRAPH - having a grid breaks
		// function */
    	});
    CHASM.addListener( GRAPH.handleUpdate );
	

	infoFileList.trigger("refresh");
	infoFileList.change(function(event){
		var fileList = $(this);
		if(fileList.val() !== ""){
			var data = {selectedIndex: fileList.prop("selectedIndex") - 1};
			$("#form").trigger("build", data);
		}
	});
	var nameSelector = "#infoData\\:name";
	var latSelector ="#infoData\\:latitude";
	var longSelector="#infoData\\:longitude";
	var nameIdRegEx=/(\w+)\[(\d+)\]\[(\w+)\]/;
	$("#form").bind("build", function(event,data){
		var json = JSON.parse(localStorage.chasm)[data.selectedIndex];
		if(json && json.form){
			$(nameSelector).val(json.name);
			$(latSelector).val(json.latitude);
			$(longSelector).val(json.longitude);
			var nameValues = {};
			var profileColumnOrder ={size:3, order:{height:0, length:1,angle:2}};
			for(var i =0 ;i < json.form.length; i++){
				if(nameIdRegEx.test(json.form[i].name)){
					var matches = json.form[i].name.match(nameIdRegEx);
					var tab = matches[1];
					var row = matches[2];
					var column = profileColumnOrder.order[matches[3]];
					if(!nameValues.hasOwnProperty(tab)){
						nameValues[tab]=new Array();
					}
					for(var j = nameValues[tab].length; row >= nameValues[tab].length; j++){
						nameValues[tab].push({ID: j, columns : new Array(profileColumnOrder.size)});
					}
					nameValues[tab][row].ID = row; //extra, but to be clear
					nameValues[tab][row].columns[column] ={ID:row, name:matches[3], value:json.form[i].value}
				}
			}
			if(nameValues.profile ){
				var profileHeader =$("#profile-header");
				var profileFooter = $("#profile-footer");
				var profileBody = $("#profile-data");
				profileHeader.find("#profileInitialCliff").remove();
				$.tmpl("profileHeaderFooterTr",{row:nameValues.profile.shift(), prefix:'profileInitialCliff',"class":'computed'}).appendTo(profileHeader);
				profileFooter.empty();
				$.tmpl("profileHeaderFooterTr",{row:nameValues.profile.pop(), prefix:'profileVerticalBoundary',"class":'computed'}).appendTo(profileFooter);
				$.tmpl("profileHeaderFooterTr",{row:nameValues.profile.pop(), prefix:'profileHorizontalBoundary',"class":'computed'}).prependTo(profileFooter);
				
				profileBody.empty();
				$.tmpl("profileBodyTr", nameValues.profile).appendTo(profileBody);
			}
		}
	});
	//localStorage.chasm = '[{"name":"","latitude":"","longitude":"", "form":[]}]';
	$("#form").submit( function(event){
		var chasm = new Array();
		if(localStorage.chasm){
			chasm = JSON.parse(localStorage.chasm);
		}
		var name = $(nameSelector).val();
		var lat = $(latSelector).val();
		var long = $(longSelector).val();
		var form = $(this).serializeArray();
		chasm.push({"name":name, "latitude":lat, "longitude":long, "form" :form});
		localStorage.chasm = JSON.stringify(chasm);
		infoFileList.trigger("refresh");
	});
    
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
        addSegmentRow();
		return false;
	});

	// add soil layer event handler to add additional soil layer
	$(".add-soil-layer").click(function(){
        addSoilLayer();
		return false;
	});
	
	// add change event handler to auto populate
	$(".soil-table select:first").change(function(){
		var sg = getSoilGrade($(this).val());
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
		addRainfallRowHtml();
		return false;
	});
	
});