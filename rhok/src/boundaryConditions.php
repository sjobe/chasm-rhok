<html>
<head>
	<title>Boundary Conditions File</title>
	<script>
		var visible = false;
		function toggleDebug() {
			alert('Toggling debugging data');
			if (visible) {
				document.getElementById('data').style.display = "none";
			} else {
				document.getElementById('data').style.display = "block";
			}
			visible = !visible;
		}
	</script>
</head>
<body ondblclick="toggleDebug()">
<pre>
<?php
	include_once "parse.php";
	
	class Chasm_Boundary_Conditions
	{
		const DETENTION_CAPACITY = "0.01";
		const MAX_SOIL_EVAPORATION = "5e-07";
		
		const START_TIME = "0";
		const STOP_TIME = "359";
		
		public static function generateBoundaryConditions( $req, $rainIdx = 0, 
				$outputStream, $newLine = "\n" )
		{
			$upslopeRecharge = $req[ Chasm_Input_Parser::WATER_UPSLOPE_RECHARGE ];
	
			// upslope recharge
			fwrite( $outputStream, $upslopeRecharge . $newLine );
			
			// detention capacity / max soil evaporation
			fwrite( $outputStream, Chasm_Boundary_Conditions::DETENTION_CAPACITY 
				. " " . Chasm_Boundary_Conditions::MAX_SOIL_EVAPORATION 
				. $newLine );
			
			fwrite( $outputStream, $newLine );
			
			// storm start time / stop time
			fwrite( $outputStream, Chasm_Boundary_Conditions::START_TIME . " " 
				. Chasm_Boundary_Conditions::STOP_TIME . $newLine );
			
			fwrite( $outputStream, $newLine );
			
			// loop through 7 days pre-storm
			for ( $day = 0; $day < 7; $day++ )
			{
				$counter = 0;
				for ( $hour = 0; $hour < 24; $hour++ )
				{
					fwrite( $outputStream, "0.0 " );
					
					if ( $counter++ > 4 )
					{
						fwrite( $outputStream, $newLine );
						$counter = 0;
					}
				}
				fwrite( $outputStream, $newLine );
			}
			
			// loop through hours
			$rain = $req[ Chasm_Input_Parser::RAIN ][0];
			$hours = $rain[ Chasm_Input_Parser::RAIN_DURATION ];
			$volume = $rain[ Chasm_Input_Parser::RAIN_VOLUME ];
			
			// convert volume from mm to m
			$volume = $volume / 1000;
			
			$rainFallPerHour = $volume / $hours;
			
			$counter = 0;
			for ( $hour = 0; $hour < 24; $hour++ )
			{
				if ( $hour < $hours )
				{
					fwrite( $outputStream, $rainFallPerHour . " " );
				}
				else 
				{
					fwrite( $outputStream, "0.0 " );
				}
				
				if ( $counter++ > 4 )
				{
					fwrite( $outputStream, $newLine );
					$counter = 0;
				}
			}
			fwrite( $outputStream, $newLine );
			
			// loop through 7 days post-storm
			for ( $day = 0; $day < 7; $day++ )
			{
				$counter = 0;
				for ( $hour = 0; $hour < 24; $hour++ )
				{
					fwrite( $outputStream, "0.0 " );
					
					if ( $counter++ > 4 )
					{
						fwrite( $outputStream, $newLine );
						$counter = 0;
					}
				}
				fwrite( $outputStream, $newLine );
			}
		}
	}
	
	if ( empty($_REQUEST) ) {		
		$_REQUEST = Chasm_Input_Parser::debugData();
		echo "<script>alert(\"No data supplied. Using testcase 06 data\");</script>";
	}  

	echo "<div id=\"data\" style=\"display:none\">";
	print_r($_REQUEST);
	echo "<hr/>";
	echo "</div>";	
	
	Chasm_Boundary_Conditions::generateBoundaryConditions( $_REQUEST, 0, fopen( "php://output", "w" ), "<br/>" );
	
/*	$upslopeRecharge = $_REQUEST[ Chasm_Input_Parser::WATER_UPSLOPE_RECHARGE ];
	
	// upslope recharge
	echo $upslopeRecharge . Chasm_Profile_Parser::BR;
	
	// detention capacity / max soil evaporation
	echo "0.01 5e-07" . Chasm_Profile_Parser::BR;
	
	echo Chasm_Profile_Parser::BR;
	
	// storm start time / stop time
	echo "0 359" . Chasm_Profile_Parser::BR;
	
	echo Chasm_Profile_Parser::BR;
	
	// loop through 7 days pre-storm
	for ( $day = 0; $day < 7; $day++ )
	{
		for ( $hour = 0; $hour < 24 / 6; $hour++ )
		{
			echo "0.0 0.0 0.0 0.0 0.0 0.0" . Chasm_Profile_Parser::BR;
		}	
		echo Chasm_Profile_Parser::BR;	
	}
	
	// loop through hours
	$rain = $_REQUEST[ Chasm_Input_Parser::RAIN ][0];
	$hours = $rain[ Chasm_Input_Parser::RAIN_DURATION ];
	$volume = $rain[ Chasm_Input_Parser::RAIN_VOLUME ];
	
	// convert volume from mm to m
	$volume = $volume / 1000;
	
	$rainFallPerHour = $volume / $hours;
	
	$counter = 0;
	for ( $hour = 0; $hour < 24; $hour++ )
	{
		if ( $hour < $hours )
		{
			echo $rainFallPerHour . " ";
		}
		else 
		{
			echo "0.0 ";
		}
		
		if ( $counter++ > 4 )
		{
			echo Chasm_Profile_Parser::BR;;
			$counter = 0;
		}
	}
	echo Chasm_Profile_Parser::BR;
	
	// loop through 7 days post-storm
	for ( $day = 0; $day < 7; $day++ )
	{
		for ( $hour = 0; $hour < 24 / 6; $hour++ )
		{
			echo "0.0 0.0 0.0 0.0 0.0 0.0" . Chasm_Profile_Parser::BR;
		}	
		echo Chasm_Profile_Parser::BR;
	}*/
?>
</pre>
</body>
</html>