<html>
<head>
	<title>Soils Database File</title>
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
	
	class Chasm_Soils
	{
		// soil parameter constants
		const MOISTURE_CONTENT = 0.43;
		const SAT_BULK_DENSITY = 20;
		const UNSAT_BULK_DENSITY = 18;
		
		// suction curve constants
		const SUCTION_MOISTURE_CURVE_MODEL = 0;
		const NUM_CURVE_COORDS = 12;
		const MOISTURE_CONTENT_POINTS = "0.209 0.218 0.227 0.251 0.267 0.295 0.308 0.324 0.348 0.376 0.4 0.42";
		const SUCTION_POINTS = "-10 -8 -6 -4 -3 -2 -1.6 -1.2 -0.8 -0.4 -0.2 -0.1";
		
		public static function generateSoilsDatabase( $req, $outputStream, 
				$newLine = "\n" )
		{
			$soils = $req[ Chasm_Input_Parser::SOIL ];
			
			// number of soils
			fwrite( $outputStream, count( $soils ) . $newLine );
			
			fwrite( $outputStream, $newLine );
			
			// loop through soils
			for ( $idx = 0; $idx < count( $soils ); $idx++ )
			{
				// ksat
				fwrite( $outputStream, $soils[ $idx ][ Chasm_Input_Parser::SOIL_KS ] );
				fwrite( $outputStream, " " );
				
				// sat moisture content
				fwrite( $outputStream, Chasm_Soils::MOISTURE_CONTENT );
				fwrite( $outputStream, " " );
				 
				// sat bulk density
				fwrite( $outputStream, Chasm_Soils::SAT_BULK_DENSITY );
				fwrite( $outputStream, " " );
				
				// unsat bulk density
				fwrite( $outputStream, Chasm_Soils::UNSAT_BULK_DENSITY );
				fwrite( $outputStream, " " );
				
				// effective cohesion
				fwrite( $outputStream, $soils[ $idx ][ Chasm_Input_Parser::SOIL_C ] );
				fwrite( $outputStream, " " );
				
				// effective angle of internal friction
				fwrite( $outputStream, $soils[ $idx ][ Chasm_Input_Parser::SOIL_PHI ] );
				fwrite( $outputStream, $newLine );
				
				// model
				fwrite( $outputStream, Chasm_Soils::SUCTION_MOISTURE_CURVE_MODEL );
				fwrite( $outputStream, $newLine );
				
				// num curve points
				fwrite( $outputStream, Chasm_Soils::NUM_CURVE_COORDS );
				fwrite( $outputStream, $newLine );
				
				// moisture content (x-coord)
				fwrite( $outputStream, Chasm_Soils::MOISTURE_CONTENT_POINTS );
				fwrite( $outputStream, $newLine );
				
				// suction (y-coord)
				fwrite( $outputStream, Chasm_Soils::SUCTION_POINTS );
				fwrite( $outputStream, $newLine );
				
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

	Chasm_Soils::generateSoilsDatabase( $_REQUEST, fopen( "php://output", "w"), "<br/>" );
?>
</pre>
</body>
</html>