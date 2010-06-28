<?php 

print('hello rhok!<br>');

error_reporting(E_ALL);
ini_set("display_errors",1);

$abs_path_prefix="/home/khripunov2/public_html/dev/rhok/chasm/";
$PanelProfile="profile";
$PanelProfileHeight="height";
$PanelProfileLength="length";
$PanelProfileAngle="angle";

$PanelInfo="info";
$PanelInfoSlopeName="name";
$PanelInfoLatitude="latitude";
$PanelInfoLongitude="long";
$PanelSoil="soil";
$PanelWater="water";
$PanelRain="rain";
$PanelWordSeperator="_";
require 'createHLTheta.php';
require 'columns.php';

session_start();
$lat;
$lon;
$profile_name;
$canvas_size;
$profileDataPoints =array();
$formProcessedPoints =array('-1');
if(sizeof($_POST)>0) {

	foreach($_POST as $name=>$value) {
		print('Var Name/value:  '.$name.' / '.$value.'<br>');
 		if($name=="info_name") {$profile_name=$value;}
		else if ($name== 'info_latitude') {$lat=$value;}
		else if ($name=='info_long') {$long=$value;}
		else if ($name=='canvas_size') {$canvas_size=$value;}
		//TODO not sure where this is from
		else if (stristr($name,$PanelProfile)) {
		$i = $name[strlen($name)-1];
		if(!array_key_exists($i, $formProcessedPoints) && strlen($value)>0){
			array_push($profileDataPoints, createDataPoint(
				$_POST[$PanelProfile.$PanelWordSeperator.$PanelProfileHeight.$PanelWordSeperator.$i],
				$_POST[$PanelProfile.$PanelWordSeperator.$PanelProfileLength.$PanelWordSeperator.$i],
				$_POST[$PanelProfile.$PanelWordSeperator.$PanelProfileAngle.$PanelWordSeperator.$i]));
		    array_push($formProcessedPoints, $i);
		}
		
		}
		else if (stristr($name,'soil_')) {
			//pull soil geometry vars
		}
 		else if (stristr($name,'water_')) {
			//pull water table vars
		}
		else if ($name=='rain_freq') {
			$rain_freq=$value;
		}
		else if ($name=='rain_duration') {
			$rain_duration=$value;
		}
		else if ($name=='rain_total_volume') {
			$rain_total_volume=$value;
		}
	}
	$convertedToXYDataPoints = generateXYPoints($profileDataPoints);
	$maxWidth=getMaxWidth($convertedToXYDataPoints);
	print('max width is : '.$maxWidth);
	$blankSoil = array(array('0','0'), array($maxWidth,'0'));
	$cells = generateCells($convertedToXYDataPoints, $blankSoil, $blankSoil, $blankSoil, $blankSoil );
	$water_columns = generateWater($maxWidth, $blankSoil);
	generateFile($cells, $water_columns);
$canvas_size="0";
$rain_duration="1";
$rain_total_volume="1";
        $file_prefix=$profile_name.$lat.$long;


 	//mkdir($abs_path_prefix.'/'.$file_prefix);
        $steering_file=$abs_path_prefix.$file_prefix.'/03.steering';
	$profile_details_file=$abs_path_prefix.$file_prefix.'/profile_details.txt';
	$geometry_file=$abs_path_prefix.$file_prefix.'/03geometry.txt';
        $soilsdb_file=$abs_path_prefix.$file_prefix.'/grade6_soil.txt';
        $stability_file=$abs_path_prefix.$file_prefix.'/03stability.txt';
	$boundary_file=$abs_path_prefix.$file_prefix.'/1in5_24rain.txt';
	$duration=360;
	$time_step=60;           
         
        $steering_file_data="geometry file:".$geometry_file."\r\n".
                            "soils database file:".$soilsdb_file."\r\n".
                            "stability file:".$stability_file."\r\n".
                            "boundary conditions file:".$boundary_file."\r\n".
                            "#reinforcment file:reinforcment.txt"."\r\n".
                            "#stochastic parameters: stochastic.txt"."\r\n".
                            "vegetation file: veg.txt"."\r\n".
                            "\r\n".
			    "output files:1 1"."\r\n".
			    "output variables: 1 0 0 0 0"."\r\n".
                            "duration of the simulation (h): ".$duration."\r\n".
                            "time step (s): 60"."\r\n";

	$profile_details_data="profile name:".$profile_name."\r\n".
			      "latitude:".$lat."\r\n".
                              "longitude:".$long."\r\n".
			      "canvas_size:".$canvas_size;
	
	$end_hour=168+$rain_duration;
	$endvolume=($rain_total_volume/$rain_duration)/100;

	$boundary_file_data="0"."\r\n".
			    "0.01 5e-07"."\r\n".
			    "168 ".$end_hour."\r\n"."\r\n".
			    $endvolume." ".$endvolume." ".$endvolume." ".$endvolume." ".$endvolume."\r\n".
			    $endvolume." ".$endvolume." ".$endvolume." ".$endvolume." ".$endvolume."\r\n".
			    $endvolume." ".$endvolume." ".$endvolume." ".$endvolume." ".$endvolume."\r\n".
			    $endvolume." ".$endvolume." ".$endvolume." ".$endvolume." ".$endvolume."\r\n".
                            $endvolume." ".$endvolume." ".$endvolume." ".$endvolume."\r\n";        


	//populate text files from form input
		//steering file
//		$handle=fopen($steering_file,'w+');
//		fwrite($handle,$steering_file_data);
//		fclose($handle);					

		//various project data - name ,lat/lon, size,owner,etc...
//		$handle=fopen($profile_details_file,'w+');
// 		fwrite($handle,$profile_details_data);
//		fclose($handle);	

		//geometry file

		//soils DB

		//stability file

		//rain / boundary conditions file				
//		$handle=fopen($boundary_file,'w+');
//		fwrite($handle,$boundary_file_data);
//		fclose($handle);

        //run chasm w/ above input
	$cmd='/home/khripunov2/public_html/dev/rhok/chasm/chasm_unix '.$steering_file; 
	//print($cmd);
	//exec($cmd,$outArray,$result);
	print_r($outArray);
	print($steering_file_data);
}
else {print('no parameters passed.');}

?>
