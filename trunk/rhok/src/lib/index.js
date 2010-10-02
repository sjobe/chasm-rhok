var highest_profile_segment_num = 0; 
var points_size = 0;
var num_profile_segments = 0;
var highest_rain_row_num = 0;
var profile_segment_html = "<tr id='profile_segment_row#NUM#'><td class='height'>" +
		"<input onkeypress='validate(event)' type='text' id='profile_height_#NUM#' name='profile_height_#NUM#'/></td><td class='length'><input onkeypress='validate(event)' type='text' " +
		"id='profile_length_#NUM#' name='profile_length_#NUM#'/></td><td class='angle'><input onkeypress='validate(event)' type='text' id='profile_angle_#NUM#' name='profile_angle_#NUM#'/>" +
		"</td><td class='delete-segment'><a href='#'>x</a></td></tr>";
var soil_depth_html = "<tr class='soil-depth'><td>x#NUM#</td><td><input onkeypress='validate(event)' name='soil_strata1_x#NUM#'" +
		" id='soil_strata1_x#NUM#'/></td><td><input onkeypress='validate(event)' name='soil_strata2_x#NUM#' id='soil_strata2_x#NUM#'/>" +
		"</td><td><input onkeypress='validate(event)' name='soil_strata3_x#NUM#' id='soil_strata3_x#NUM#'/></td><td><input name='soil_strata4_x#NUM#' " +
		"id='soil_strata4_x#NUM#'/></td></tr>";
var water_row_html = "<tr>x#NUM#<th></th><td><input onkeypress='validate(event)' name='water_x#NUM#' id='water_x#NUM#'/></td></tr>";

var rainfall_duration_select_html = "<select id='rain_duration_#NUM#' name='rain_duration_#NUM#'><option value='' selected='selected'></option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option>" +
		"<option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='10'>10</option>" +
		"<option value='12'>12</option><option value='24'>24</option></select>";
var rain_frequency_select_html = "<select id='rain_frequency_#NUM#' name='rain_frequency_#NUM#'><option value='' selected='selected'></option><option value='5'>1 in 5</option><option value='5'>1 in 5</option>" +
		"<option value='10'>1 in 10</option><option value='20'>1 in 20</option><option value='50'>1 in 50</option>" +
		"<option value='500'>1 in 500</option></select>";
var rainfall_row_html = "<tr id='rain_row_#NUM#'><td>"+rain_frequency_select_html+"</td><td>"+rainfall_duration_select_html+"</td><td><input onkeypress='validate(event)' id='rain_volume_#NUM#' name='rain_volume_#NUM#' type='text'/></td><td class='delete-segment delete-rainfall-row'><a href='#'>x</a></td></tr>"

function updateNumProfileSegmentsDisplay(){
	$('.num-profile-segments').text(num_profile_segments);
}

function addSoilDepthRow(){
	if(num_profile_segments == 1){
		$('#soil-depths').after(soil_depth_html.replace(/#NUM#/g, '1'));
		$('.soil-depth').after(soil_depth_html.replace(/#NUM#/g, '2'));
	}else {
		$('.soil-depth:last').after(soil_depth_html.replace(/#NUM#/g, highest_profile_segment_num+1));
	}
}

function addWaterRowHtml(){
	if(num_profile_segments == 1){
		$('.water table').append(water_row_html.replace(/#NUM#/g, '1'));
		$('.water table').append(water_row_html.replace(/#NUM#/g, '2'));
	}else {
		$('.water table').append(water_row_html.replace(/#NUM#/g, highest_profile_segment_num+1));
	}
}

function addRainfallRowHtml(){
	$('.rain table').append(rainfall_row_html.replace(/#NUM#/g, highest_rain_row_num));
	$('#rain_row_'+highest_rain_row_num+' .delete-rainfall-row').click(function(){
		$(this).parent().remove();
	});
	$('#rain_row_'+highest_rain_row_num+' select').change(function(){
		var freq = $('#rain_frequency_'+highest_rain_row_num).val();
		var dur = $('#rain_duration_'+highest_rain_row_num).val();
		if(freq != '' && dur != ''){
			$('#rain_volume_'+highest_rain_row_num).val(getTotalRainVolumeInMM(freq,dur));
		}
	});	
}

function validate(evt, type) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  if (key == 8 || key == 37 || key == 39 || key == 9 || key == 99 || key == 118) { //for backspace and arrows
    return true;
  } 
  key = String.fromCharCode( key );
  
  if (type == 'sci') {
    var regex = /[0-9]|\.|e|\-/;
  } else {
    var regex = /[0-9]|\./;
  }
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    theEvent.preventDefault();
  }
}

function renderSoil(){
  var parentNode = document.getElementById('soil-tbody');
  var data = buildStratas(parentNode, points_size);
  setSoilOffsets(data);
  updateGraph();
}

function renderWaterTable(){
  var parentNode = document.getElementById('water-tbody');
  var data = findChildValuesWithNamePrefixFromInputTypes('water_x', parentNode);
  setWaterTableOffsets(data);
  updateGraph();
}

$(document).ready(function(){
	updateNumProfileSegmentsDisplay();
  $('#tabs a').click(function(){
		if(!$(this).hasClass('selected')){
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			$('#tab-pages .'+$(this).attr('id')).addClass('selected');
		}
		return false;
	});
	$('.add-profile-segment').click(function(){
		highest_profile_segment_num++;
		num_profile_segments++;
		addSoilDepthRow();
		addWaterRowHtml();    
		updateNumProfileSegmentsDisplay();    
		$("#profile-data").append(profile_segment_html.replace(/#NUM#/g, highest_profile_segment_num));
		$('#profile_segment_row'+highest_profile_segment_num+' input').focusout(function(){
			if($('#profile_height_'+highest_profile_segment_num).val() && $('#profile_length_'+highest_profile_segment_num).val() && $('#profile_angle_'+highest_profile_segment_num).val()){
					var profileData = buildProfile("profile_height", "profile_length", "profile_angle",document.getElementById("profile-data"));
			    var xypoints = generateXYPoints(profileData);
			    if(xypoints){
			      setGeometry(xypoints);
			      updateGraph();
            points_size = xypoints.length;
			    }
			}
		});
		$('#profile_segment_row'+highest_profile_segment_num+' .delete-segment').click(function(){
			$(this).parent().remove();
			num_profile_segments--;
			updateNumProfileSegmentsDisplay();
			var profileData = buildProfile("profile_height", "profile_length", "profile_angle",document.getElementById("profile-data"));
		  var  xypoints = generateXYPoints(profileData);
		    if(xypoints){
		      setGeometry(xypoints);
		      updateGraph();
          points_size = xypoints.length;
		    }			
			//TODO: Redrwaw soil depth rows
			//TODO: Redraw water rows
		});
		return false;
	});
	
	$('.add-rainfall').click(function(){
		highest_rain_row_num++;
		addRainfallRowHtml();
		return false;
	});
	
	$('.soil-table select').change(function(){
		var sg = getSoilGrade(eval($(this).val()));
		var num = $(this).attr('name').charAt($(this).attr('name').length-1);
		$('#soil_strata'+num+'_phi').val(sg.phi);
		$('#soil_strata'+num+'_c').val(sg.c);
		$('#soil_strata'+num+'_ks').val(sg.Ksat);
	});
});