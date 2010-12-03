<html>
<head>
	<title>Generated Geometry File</title>
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
<?php
	include_once "chasm.php";
	include_once "parse.php";

	if ( empty($_REQUEST) ) {		
		$_REQUEST = Chasm_Input_Parser::debugData();
		echo "<script>alert(\"No data supplied. Using testcase 06 data\");</script>";
	}  

	echo "<div id=\"data\" style=\"display:none\">";
	print_r($_REQUEST);
	echo "<hr/>";
	echo "</div>";
	
	$req = $_REQUEST;
	
	// create a temporary directory by getting a temp file, and then 
	//  using that name to create a directory
	$tmpName = tempnam( sys_get_temp_dir(), "" );
	unlink( $tmpName );
	mkdir( $tmpName, "600", TRUE ); 
	
	$filePrefix = $tmpName . "/" 
		. Chasm_Steering::safeFileName( 
			$req[ Chasm_Input_Parser::INFO ][ Chasm_Input_Parser::NAME ] );
	
	// generate geometry file
	$geometryFile = $filePrefix . Chasm_Steering::GEOMETRY_FILE_SUFFIX;
	Chasm_Geometry::generateFile( $req, fopen( $geometryFile, "w" ) );
	
	// generate soils file
	$soilsFile = $filePrefix . Chasm_Steering::SOILS_FILE_SUFFIX;
	Chasm_Soils::generateSoilsDatabase( $req, fopen( $soilsFile, "w" ) );
	
	// generate stability file
	$stabilityFile = $filePrefix . Chasm_Steering::STABILITY_FILE_SUFFIX;
	Chasm_Stability::generateStabilityFile( $req, fopen( $stabilityFile, "w" ) );
	
	// Not generating reinforcement, vegetation, or stochastic file
//	$reinforcementFile = $filePrefix 
//		. Chasm_Steering::REINFORCEMENT_FILE_SUFFIX;
//	$vegetationFile = $filePrefix 
//		. Chasm_Steering::VEGETATION_FILE_SUFFIX;
//	$stochasticFile = $filePrefix 
//		. Chasm_Steering::STOCHASTIC_FILE_SUFFIX; 

	
	// for each rain fall
	$rains = $req[ Chasm_Input_Parser::RAIN ];
	for ( $rainIdx = 0; $rainIdx < count( $rains ); $rainIdx++ )
	{
		$rain = $rains[ $rainIdx ];
		
		// generate boundary file
		$boundaryFile =  $filePrefix . Chasm_Steering::BOUNDARY_FILE_PREFIX 
			. $rain[ Chasm_Input_Parser::RAIN_FREQUENCY ] 
			. Chasm_Steering::BOUNDARY_FILE_SUFFIX;		
		Chasm_Boundary_Conditions::generateBoundaryConditions( $req, $rainIdx,
			 fopen( $boundaryFile, "w" ) );
			
		// generate steering file
		$steeringFile = $filePrefix . Chasm_Steering::BOUNDARY_FILE_PREFIX 
			. $rain[ Chasm_Input_Parser::RAIN_FREQUENCY ] 
			. Chasm_Steering::STEERING_FILE_SUFFIX;
		Chasm_Steering::generateSteering( $req, $rainIdx, fopen( $steeringFile, "w" ) );
	}
	
	echo "Generated in: " . $tmpName;
?>

<h1>Files</h1>
<table>
	<tr>
		<td>Geometry File</td>
		<td><a href="geometry.php"></a></td>
	</tr>
</table>
</body>
</html>