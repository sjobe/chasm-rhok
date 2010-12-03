<html>
<head>
	<title>Generated Stability File</title>
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
	
	if ( empty($_REQUEST) ) {		
		$_REQUEST = Chasm_Input_Parser::debugData();
		echo "<script>alert(\"No data supplied. Using testcase 06 data\");</script>";
	}  

	echo "<div id=\"data\" style=\"display:none\">";
	print_r($_REQUEST);
	echo "<hr/>";
	echo "</div>";	

	$profileGeometry = $_REQUEST[Chasm_Input_Parser::PROFILE];
	
	$segment = Chasm_Profile_Parser::generateXYPoints( $profileGeometry );
	
	echo "Bishop" . Chasm_Profile_Parser::BR;
		
	// sanity check that there are enough coordinates
	if ( count( $segment ) < 4 )
	{
		die( "Insufficent data points");
	} 
	
	$beginPoint = $segment[ 1 ];
	$endPoint = $segment[ count( $segment ) - 3 ];
	
	// calculate slip search coordinate based on non-virtual segments
	$xCoord = round( 0.75 * ( $endPoint[ Chasm_Profile_Parser::X ]
		- $beginPoint[ Chasm_Profile_Parser::X ] ) );
			
	$yCoord = round( 0.75 * ( $beginPoint[ Chasm_Profile_Parser::Y ] 
			- $endPoint[ Chasm_Profile_Parser::Y ] ) );
				
	$dimensions = round ( ( $beginPoint[ Chasm_Profile_Parser::Y ] 
			- $endPoint[ Chasm_Profile_Parser::Y ] ) / 3.0 );
	
	// echo grid search parameters
	echo $xCoord . " " . $yCoord . " 1 1 " . $dimensions . " " . $dimensions . " 5 0.5" . Chasm_Profile_Parser::BR;
	
	echo (count( $segment ) - 1) . Chasm_Profile_Parser::BR;
	for ( $idx = 0; $idx < count( $segment ) - 1 ; $idx++ )
	{
		echo round( $segment[ $idx ][ Chasm_Profile_Parser::X ], 2 ) 
			. " " 
			. round( $segment[ $idx ][ Chasm_Profile_Parser::Y ], 2)
			. Chasm_Profile_Parser::BR;
	}
?>
</pre>
</body>
</html>