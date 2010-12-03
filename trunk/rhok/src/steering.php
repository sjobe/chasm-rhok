<html>
<head>
	<title>Steering File</title>
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
	
	class Chasm_Steering
	{
		const GEOMETRY_FILE = "geometry file: ";
		const SOILS_FILE = "soils databbase file: ";
		const STABILITY_FILE = "stability file: ";
		const BOUNDARY_FILE = "boundary conditions file: ";
		const REINFORCEMENT_FILE = "reinforcement file: ";
		const VEGETATION_FILE = "vegetation file: ";
		const STOCHASTIC_FILE = "stochastic parameters: ";
		const OUTPUT_VARIABLES = "output variables: ";
		const DURATION = "duration of the simulation (h): ";
		const TIME_STEP = "time step (s): ";
	
		const REPORT_FACTOR_OF_SAFETY = "1";
		const REPORT_PRESSURE_HEAD = "0";
		const REPORT_SOIL_MOSTURE_CONTENT = "0";
		const REPORT_TOTAL_SOIL_MOISTURE_CONTENT = "0";
		const REPORT_VEGETATION_INTERCEPTION = "0";
		
		const DURATION_VALUE = 360;
		const TIME_STEP_VALUE = 60;
		
		public static function isCommentedOut( $name )
		{
			$array = array( self::REINFORCEMENT_FILE,		
				self::STOCHASTIC_FILE,
				self::VEGETATION_FILE
			);
			
			return in_array( $name, $array );
		}
		
		public static function safeFileName( $name ) 
		{
			$temp = str_replace( " ", "_", strtolower( $name ) );
			
			$newFileName = "";
		    for ( $idx = 0; $idx < strlen( $temp ); $idx++ ) {
		        if ( preg_match('([0-9]|[a-z]|_)', $temp[ $idx ] ) ) {
		            $newFileName = $newFileName . $temp[ $idx ];
		        }    
		    }
		 
		    return $newFileName;			
		}		
		
		public static function generateSteering( $req, $rainIdx = 0, 
				$outputStream, $newLine = '\n' )
		{
			$info = $req[ Chasm_Input_Parser::INFO ];
			$rain = $req[ Chasm_Input_Parser::RAIN ][ $rainIdx ]; 
		
			$filePrefix = Chasm_Steering::safeFileName( $info[ Chasm_Input_Parser::NAME ] );	
			
			$geometryFile = $filePrefix . "-geometry.txt";
			$soilsFile = $filePrefix . "-soil.txt";
			$stabilityFile = $filePrefix . "-stability.txt";
			$boundaryFile =  $filePrefix . "-1in" . $rain[ Chasm_Input_Parser::RAIN_FREQUENCY ] . ".txt";
			$reinforcementFile = $filePrefix . "-reinforcement.txt";
			$vegetationFile = $filePrefix . "-vegetation.txt";
			$stochasticFile = $filePrefix . "-stochastic.txt";
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::GEOMETRY_FILE ) )
			{
				fwrite( $outputStream, "#");
			}
			fwrite( $outputStream, Chasm_Steering::GEOMETRY_FILE . $geometryFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::SOILS_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::SOILS_FILE . $soilsFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::STABILITY_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::STABILITY_FILE . $stabilityFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::BOUNDARY_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::BOUNDARY_FILE . $boundaryFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::REINFORCEMENT_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::REINFORCEMENT_FILE . $reinforcementFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::VEGETATION_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::VEGETATION_FILE . $vegetationFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::STOCHASTIC_FILE ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::STOCHASTIC_FILE . $stochasticFile );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::OUTPUT_VARIABLES ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::OUTPUT_VARIABLES 
				. Chasm_Steering::REPORT_FACTOR_OF_SAFETY 
				. " " . Chasm_Steering::REPORT_PRESSURE_HEAD 
				. " " . Chasm_Steering::REPORT_SOIL_MOSTURE_CONTENT 
				. " " . Chasm_Steering::REPORT_TOTAL_SOIL_MOISTURE_CONTENT 
				. " " . Chasm_Steering::REPORT_VEGETATION_INTERCEPTION );
			fwrite( $outputStream, $newLine );
		
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::DURATION ) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::DURATION . Chasm_Steering::DURATION_VALUE );
			fwrite( $outputStream, $newLine );
			
			if ( Chasm_Steering::isCommentedOut( Chasm_Steering::TIME_STEP) )
			{
				fwrite( $outputStream, "#" );
			}
			fwrite( $outputStream, Chasm_Steering::TIME_STEP . Chasm_Steering::TIME_STEP_VALUE );
			fwrite( $outputStream, $newLine );			
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
	
	Chasm_Steering::generateSteering( $_REQUEST, 0, fopen( "php://output", "w" ), "<br/>");
?>
</pre>
</body>
</html>