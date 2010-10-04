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
        
    public static function validateProfileInput( $profile )
    {
    }
    
    public static function validateWaterInput( $profile, $water )
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
    print_r($_REQUEST);  
?>
</pre>
</body>
</html>