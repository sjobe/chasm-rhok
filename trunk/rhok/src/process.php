<html>
<body>
<?php
include_once "profile.php";

class Chasm_Input_Parser
{

    const INFO = "info";
    const NAME = "name";
    const LATITUDE = "latitude";
    const LONGITUDE = "longitude";

    const PROFILE = "profile";
    const PROFILE_HEIGHT = "height";
    const PROFILE_LENGTH = "length";
    const PROFILE_ANGLE = "angle";
    
    const SOIL = "soilStrata";
    const SOIL_TYPE = "type";
    const SOIL_C ="c";
    const SOIL_PHI = "phi";
    const SOIL_KS = "ks";
    const SOIL_DEPTH = "depth";
    
    const WATER_DEPTH = "waterDepth";
    const WATER_UPSLOPE_RECHARGE = "waterUpslopeRecharge";
    
    const RAIN = "rain";
    const RAIN_FREQUENCY = "frequency";
    const RAIN_DURATION = "duration";
    const RAIN_VOLUME = "volume";
        
    public static function validateInfoInput( $info )
    {
    }
    
    public static function validateProfileInput( $profile )
    {
    }
    
    public static function validateWaterInput( $profile, $water, $waterUpslopeRecharge )
    {
    }
    
    public static function validateSoilInput( $profile, $soil )
    {
    }
    
    public static function validateRainInput( $rain )
    {
    }
}
?>
<pre>
<?php
//    print_r($_REQUEST);  
    $profileGeometry = $_REQUEST[Chasm_Input_Parser::PROFILE];
                    
    $soil1Depths = $_REQUEST[Chasm_Input_Parser::SOIL][0][Chasm_Input_Parser::SOIL_DEPTH];
	    									
    $soil2Depths = $_REQUEST[Chasm_Input_Parser::SOIL][1][Chasm_Input_Parser::SOIL_DEPTH];
	
    $soil3Depths = $_REQUEST[Chasm_Input_Parser::SOIL][2][Chasm_Input_Parser::SOIL_DEPTH];
    
    $soil4Depths = $_REQUEST[Chasm_Input_Parser::SOIL][3][Chasm_Input_Parser::SOIL_DEPTH];
    

    
	$waterDepths = $_REQUEST[Chasm_Input_Parser::WATER_DEPTH];
	
    $segment = Chasm_Profile_Parser::generateXYPoints( $profileGeometry );

    $max_height = $segment[0][Chasm_Profile_Parser::Y];
    $max_width = $segment[ count( $segment ) - 1][Chasm_Profile_Parser::X];

    $soilLayers = array();
	$idx = 0;	
	$max_depth = 0;
	
	do {
		$soilDepths = $_REQUEST[Chasm_Input_Parser::SOIL][ $idx ][Chasm_Input_Parser::SOIL_DEPTH];
		$max_depth += array_sum( $soilDepths );
		$soilLayers[ $idx ] =  Chasm_Profile_Parser::generateLayerXYPoints( $segment, $soilDepths );
 	} while ( $soilLayers[ $idx++ ] != $segment);

 	for ( $idx = 0; $idx < count( $soilLayers ); $idx++ ) {
 		$soilLayers[ $idx ][Chasm_Profile_Parser::SOIL_TYPE] = $idx; 
 	}
 	 	
    $soil1 = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $soil1Depths );
    $soil1[Chasm_Profile_Parser::SOIL_TYPE] = 0;
    
    $soil2 = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $soil2Depths );
    $soil2[Chasm_Profile_Parser::SOIL_TYPE] = 1;
    
    $soil3 = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $soil3Depths );
    $soil3[Chasm_Profile_Parser::SOIL_TYPE] = 2;
    
    $soil4 = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $soil4Depths );  
    $soil4[Chasm_Profile_Parser::SOIL_TYPE] = 3;

    $bottomDepths = array_fill(0, count( $segment ), $max_height + $max_depth);
    $bottom = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $bottomDepths );
    $bottom[Chasm_Profile_Parser::SOIL_TYPE] = 2;
    
    $water = Chasm_Profile_Parser::generateLayerXYPoints( $segment, $waterDepths );
    
    $cells = Chasm_Profile_Parser::generateCells($segment, $soil1, $soil2, $bottom, $bottom );

    $width = $segment[count($segment)-1][Chasm_Profile_Parser::X];
    
	$water_columns = Chasm_Profile_Parser::generateWaterColumns( $width, $water );
	Chasm_Profile_Parser::generateFile( $cells, $water_columns );    
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