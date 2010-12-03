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
<pre>
<?php
	include_once "parse.php";
	
	class Chasm_Geometry
	{
		public static function generateFile( $req, $outputStream, $newLine ) {
	
		    $profileGeometry = $req[Chasm_Input_Parser::PROFILE];
		                       
			$waterDepths = $req[Chasm_Input_Parser::WATER_DEPTH];
			
		    $segment = Chasm_Profile_Parser::generateXYPoints( $profileGeometry );
		
		    $max_height = $segment[0][Chasm_Profile_Parser::Y];
		    $max_width = $segment[ count( $segment ) - 1][Chasm_Profile_Parser::X];
		
		    $max_depth = 0;
		    $soilLayers = array();
		    for ( $depthIdx = 0; $depthIdx < count( $req[Chasm_Input_Parser::SOIL] ) - 1; $depthIdx++ )
		    {
		    	$soilLayer = Chasm_Profile_Parser::generateLayerXYPoints( $segment, 
		    		$req[Chasm_Input_Parser::SOIL][ $depthIdx ][Chasm_Input_Parser::SOIL_DEPTH] );    	
		    	$soilLayer[Chasm_Profile_Parser::SOIL_TYPE] =  $depthIdx;
		    	    	
		    	array_push( $soilLayers,  $soilLayer);
		    	
		    	$max_depth += array_sum($req[Chasm_Input_Parser::SOIL][ $depthIdx ][Chasm_Input_Parser::SOIL_DEPTH]);
		    }
		    
		    $bottomDepths = array_fill(0, count( $segment ), $max_height + $max_depth);
		    $bottom = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $bottomDepths );
		    $bottom[Chasm_Profile_Parser::SOIL_TYPE] = count( $soilLayers );
		    array_push( $soilLayers, $bottom );
		    
		    $water = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $waterDepths );
		    
		    $cells = Chasm_Profile_Parser::generateCellsArr($segment, $soilLayers);
			$water_columns = Chasm_Profile_Parser::generateWaterColumns( $max_width, $water );
		
			if ( !empty( $req[ Chasm_Input_Parser::WATER_INITIAL_SLOPE_SUCTION ] ) )
			{
				$initial_surface_suction = $req[ Chasm_Input_Parser::WATER_INITIAL_SLOPE_SUCTION ];	
			}
			else
			{
				$initial_surface_suction = -0.5;
			}

			fwrite( $outputStream, count($cells) . $newLine );
	
			for ( $row=0; $row<count($cells); $row++ ) {
				// clear invalid data
				while ( $cells[$row][0] == Chasm_Profile_Parser::INVALID_DATA ) {
					array_shift($cells[$row]);
				}
	
				$num_cells = count( $cells[$row] );
				$num_water = round ( $water_columns[$row] ) ;
				$column_width = 1;
				$column_breadth = 1;
						
				// print meta data line
				fwrite( $outputStream, $num_cells 
					. " " . $num_water 
					. " " . $column_width 
					. " " . $column_breadth 
					. " " . $initial_surface_suction . $newLine );
	
				// print column line
				$text = "1 " . $cells[$row][0];
				for ( $col=1; $col<count($cells[$row]); $col++ ) {
					$text = $text . " 1 " . $cells[$row][$col];
				}
				fwrite( $outputStream, $text . $newLine );
			}
	
			// print EOF marker
			fwrite( $outputStream, "0 " . $water_columns[count($cells) - 1] );
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
	
	Chasm_Geometry::generateFile( $_REQUEST, fopen( "php://output", "w"), "<br/>" );

?>
</pre>
</body>
</html>