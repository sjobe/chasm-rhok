<html>
<body>
<?php
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
/*
Array
(
    [info] => Array
        (
            [name] => MyName
            [latitude] => 35.54
            [longitude] => 143.5
        )

    [profile] => Array
        (
            [0] => Array
                (
                    [height] => 3
                    [length] => 5
                    [angle] => 36.86989764584402
                )

            [1] => Array
                (
                    [height] => 10
                    [length] => 26.694671625540145
                    [angle] => 22.61986494804042617294901087668
                )

            [2] => Array
                (
                    [height] => 7
                    [length] => 25
                    [angle] => 16.26020470831196
                )

        )

    [soilStrata] => Array
        (
            [0] => Array
                (
                    [type] => 1
                    [c] => 50
                    [phi] => 60
                    [ks] => 1e-09
                    [depth] => Array
                        (
                            [0] => 5
                            [1] => 5
                            [2] => 2
                            [3] => 0
                        )

                )

            [1] => Array
                (
                    [type] => 2
                    [c] => 40
                    [phi] => 50
                    [ks] => 1e-08
                    [depth] => Array
                        (
                            [0] => 10
                            [1] => 8
                            [2] => 4
                            [3] => 0
                        )

                )

            [2] => Array
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
                        )

                )

        )

    [waterDepth] => Array
        (
            [0] => 15
            [1] => 12
            [2] => 5
            [3] => 0
        )

    [water_upslope_recharge] => 
    [rain] => Array
        (
            [0] => Array
                (
                    [frequency] => 5
                    [duration] => 2
                    [volume] => 81.28
                )

            [1] => Array
                (
                    [frequency] => 20
                    [duration] => 3
                    [volume] => 132
                )
        )
)
*/
    print_r($_REQUEST);  
?>
</pre>
</body>
</html>