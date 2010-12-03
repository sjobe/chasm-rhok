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
	
	class Chasm_Stability
	{
		const ANALYSIS_METHOD = "Bishop";
		const X_GRID_SPACING = "1";
		const Y_GRID_SPACING = "1";
		const INITIAL_RADIUS_LENGTH = "5";
		const RADIUS_INCREASE = "0.5";
		
		public static function generateStabilityFile( $req, $outputStream, $newLine = "\n" )
		{
			$profileGeometry = $req[Chasm_Input_Parser::PROFILE];
		
			$segment = Chasm_Profile_Parser::generateXYPoints( $profileGeometry );
			
			fwrite( $outputStream, Chasm_Stability::ANALYSIS_METHOD . $newLine );
				
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
			
			// fwrite( $outputStream, grid search parameters
			fwrite( $outputStream, $xCoord . " " . $yCoord 
				. " " . Chasm_Stability::X_GRID_SPACING 
				. " " . Chasm_Stability::Y_GRID_SPACING 
				. " " . $dimensions . " " . $dimensions 
				. " " . Chasm_Stability::INITIAL_RADIUS_LENGTH
				. " " . Chasm_Stability::RADIUS_INCREASE
				. $newLine );
			
			fwrite( $outputStream, (count( $segment ) - 1) . $newLine );
			for ( $idx = 0; $idx < count( $segment ) - 1 ; $idx++ )
			{
				fwrite( $outputStream, round( $segment[ $idx ][ Chasm_Profile_Parser::X ], 2 ) 
					. " " 
					. round( $segment[ $idx ][ Chasm_Profile_Parser::Y ], 2)
					. $newLine );
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

	 Chasm_Stability::generateStabilityFile( $_REQUEST, fopen( "php://output", "w" ), "<br/>" );
?>
</pre>
</body>
</html>