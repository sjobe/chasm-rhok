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
	 
	if ( empty($_REQUEST) ) {		
		$_REQUEST = Chasm_Input_Parser::debugData();
		echo "<script>alert(\"No data supplied. Using testcase 06 data\");</script>";
	}  

	echo "<div id=\"data\" style=\"display:none\">";
	print_r($_REQUEST);
	echo "<hr/>";
	echo "</div>";	
	
    $profileGeometry = $_REQUEST[Chasm_Input_Parser::PROFILE];
                       
	$waterDepths = $_REQUEST[Chasm_Input_Parser::WATER_DEPTH];
	
    $segment = Chasm_Profile_Parser::generateXYPoints( $profileGeometry );

    $max_height = $segment[0][Chasm_Profile_Parser::Y];
    $max_width = $segment[ count( $segment ) - 1][Chasm_Profile_Parser::X];

    $max_depth = 0;
    $soilLayers = array();
    for ( $depthIdx = 0; $depthIdx < count( $_REQUEST[Chasm_Input_Parser::SOIL] ) - 1; $depthIdx++ )
    {
    	$soilLayer = Chasm_Profile_Parser::generateLayerXYPoints( $segment, 
    		$_REQUEST[Chasm_Input_Parser::SOIL][ $depthIdx ][Chasm_Input_Parser::SOIL_DEPTH] );    	
    	$soilLayer[Chasm_Profile_Parser::SOIL_TYPE] =  $depthIdx;
    	    	
    	array_push( $soilLayers,  $soilLayer);
    	
    	$max_depth += array_sum($_REQUEST[Chasm_Input_Parser::SOIL][ $depthIdx ][Chasm_Input_Parser::SOIL_DEPTH]);
    }
    
    $bottomDepths = array_fill(0, count( $segment ), $max_height + $max_depth);
    $bottom = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $bottomDepths );
    $bottom[Chasm_Profile_Parser::SOIL_TYPE] = count( $soilLayers );
    
    
    array_push( $soilLayers, $bottom );
    
    $water = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $waterDepths );
    
    
//	echo "<table border=\"1\">";
//	echo "<tr><th>col</th><th>x_coord</th><th>y_coord</th><th>water y</th><th>soil 1 y</th><th>soil 2 y</th></tr>";   
//    for ( $i = 0; $i < count( $segment ); $i++ )
//    {
//    	echo "<tr>";
//		echo "<td>" . $i . "</td>";
//		echo "<td>" . ($segment[$i][Chasm_Profile_Parser::X]) . "</td>";
//		echo "<td>" . $segment[$i][Chasm_Profile_Parser::Y] . "</td>";
//		echo "<td>" . $water[$i][Chasm_Profile_Parser::Y] . "</td>";
//		echo "<td>" . $soilLayers[0][$i][Chasm_Profile_Parser::Y] . "</td>";
//		echo "<td>" . $soilLayers[1][$i][Chasm_Profile_Parser::Y] . "</td>";
//    	echo "</tr>";
//    }
//    echo "</table>";
    
    $cells = Chasm_Profile_Parser::generateCellsArr($segment, $soilLayers);
    
//    $profile = Chasm_Profile_Parser::generateWaterColumns( $max_width, $segment );
//    $soil1 = Chasm_Profile_Parser::generateWaterColumns( $max_width, $soilLayers[0] );
//    $soil2 = Chasm_Profile_Parser::generateWaterColumns( $max_width, $soilLayers[1] );
	$water_columns = Chasm_Profile_Parser::generateWaterColumns( $max_width, $water );
//	
//	echo "<table border=\"1\">";
//	echo "<tr><th>col</th><th>x_coord</th><th>y_coord</th><th>water y</th><th>soil 1 y</th><th>soil 2 y</th></tr>";   
//    for ( $i = 0; $i < count( $water_columns ); $i++ )
//    {
//    	echo "<tr>";
//		echo "<td>" . ($i + 1) . "</td>";
//		echo "<td>" . ($i + 0.5) . "</td>";
//		echo "<td>" . $profile[$i] . "</td>";
//		echo "<td>" . $water_columns[$i] . "</td>";
//		echo "<td>" . $soil1[$i] . "</td>";
//		echo "<td>" . $soil2[$i] . "</td>";
//    	echo "</tr>";
//    }
//    echo "</table>";
    
	if ( !empty( $_REQUEST[ Chasm_Input_Parser::WATER_INITIAL_SLOPE_SUCTION ] ) )
	{
//		echo 'using default slope suction: ' . $_REQUEST[ Chasm_Input_Parser::WATER_INITIAL_SLOPE_SUCTION ];
		Chasm_Profile_Parser::generateFile( $cells, $water_columns, 
			$_REQUEST[ Chasm_Input_Parser::WATER_INITIAL_SLOPE_SUCTION ] );	
	}
	else
	{
//		echo 'using default slope suction: -0.5';
		Chasm_Profile_Parser::generateFile( $cells, $water_columns );
	}

?>
</pre>

<!--
<pre>
Array
(
    [info] => Array
        (
            [name] => 
            [latitude] => 
            [longitude] => 
        )

    [profile] => Array
        (
            [0] => Array
                (
                    [height] => 0
                    [length] => 8
                    [angle] => 0
                )

            [1] => Array
                (
                    [height] => 9
                    [length] => 24.02520446298613
                    [angle] => 22
                )

            [2] => Array
                (
                    [height] => 17
                    [length] => 34.00000000000001
                    [angle] => 30
                )

            [3] => Array
                (
                    [height] => 11
                    [length] => 21.35764429051392
                    [angle] => 31
                )

            [4] => Array
                (
                    [height] => 10
                    [length] => 24.585933355742384
                    [angle] => 24
                )

            [5] => Array
                (
                    [height] => 1
                    [length] => 1.5557238268604126
                    [angle] => 40
                )

            [6] => Array
                (
                    [height] => 0
                    [length] => 8
                    [angle] => 0
                )

            [7] => Array
                (
                    [height] => 0
                    [length] => 16.45
                    [angle] => 0
                )

        )

    [soilStrata] => Array
        (
            [0] => Array
                (
                    [type] => 6
                    [c] => 10
                    [phi] => 23
                    [ks] => 5e-05
                    [depth] => Array
                        (
                            [0] => 3
                            [1] => 5
                            [2] => 6
                            [3] => 7
                            [4] => 8
                            [5] => 10
                            [6] => 9.5
                            [7] => 11
                            [8] => 14
                        )

                )

            [1] => Array
                (
                    [type] => 4
                    [c] => 25
                    [phi] => 33
                    [ks] => 5e-6
                    [depth] => Array
                        (
                            [0] => 4
                            [1] => 6
                            [2] => 8
                            [3] => 10
                            [4] => 12
                            [5] => 14
                            [6] => 13.5
                            [7] => 16
                            [8] => 20
                        )

                )

            [2] => Array
                (
                    [type] => 2
                    [c] => 40
                    [phi] => 50
                    [ks] => 1e-08
                    [depth] => Array
                        (
                            [0] => 
                            [1] => 
                            [2] => 
                            [3] => 
                            [4] => 
                            [5] => 
                            [6] => 
                            [7] => 
                            [8] => 
                        )

                )

            [3] => Array
                (
                    [type] => 
                    [c] => 
                    [phi] => 
                    [ks] => 
                    [depth] => Array
                        (
                            [0] => 
                            [1] => 
                            [2] => 
                            [3] => 
                            [4] => 
                            [5] => 
                            [6] => 
                            [7] => 
                            [8] => 
                        )

                )

        )

    [waterDepth] => Array
        (
            [0] => 20
            [1] => 20
            [2] => 15
            [3] => 8
            [4] => 4
            [5] => 4
            [6] => 3
            [7] => 3
            [8] => 3
        )

    [water_upslope_recharge] => 0
    [rain] => Array
        (
            [0] => Array
                (
                    [frequency] => 50
                    [duration] => 24
                    [volume] => 288
                )

        )

)
</pre>
-->
</body>
</html>