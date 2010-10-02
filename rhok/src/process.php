<html>
<body>
<pre>
<?php
class Chasm_Input_Parser
{

    const NAME = "info_name";
    const LATITUDE = "info_latitude";
    const LONGITUDE = "info_long";

    const PROFILE_HEIGHT = "profile_height";
    const PROFILE_LENGTH = "profile_length";
    const PROFILE_ANGLE = "profile_angle";
    
    const SOIL_TYPE = "soil_type_strata";
    const SOIL_C ="soil_c_strata";
    const SOIL_PHI = "soil_phi_strata";
    const SOIL_KS = "soil_ks_strata";
    const SOIL_DEPTH = "soil_depth_stata";
    
    const WATER_DEPTH = "water_x";
    const WATER_UPSLOPE_RECHARGE = "water_upslope_recharge";
    
    const RAIN_FREQUENCY = "rain_frequency";
    const RAIN_DURATION = "rain_duration";
    const RAIN_VOLUME = "rain_volume";
    
    public static function parseProfile()
    {
        $profile = array();
        $idx = 1;
        
        
        while ( _checkProfileInput( $idx ) )
        {
           
            $idx++;
        }
    }
    
    private static function _createProfileLine( $idx )
    {
        // TODO: utilize autocomplete functions to fill in missing data
        
        return array( );
    }
    
    private static function _checkProfileInput( $idx )
    {
        // Count how many pieces of info we have. Need at least 2 out of 3
        $count = 0;
        
        if ( $_REQUEST(PROFILE_HEIGHT . $idx) )
        {
            $count++;
        }
        
        if ( $_REQUEST(PROFILE_LENGTH . $idx) )
        {
            $count++;
        }
        
        if ( $_REQUEST(PROFILE_ANGLE . $idx) )
        {
            $count++;
        }
               
        return $count >= 2;
    }
}
/*
Array
(
    [info_name] => 
    [info_latitude] => 
    [info_long] => 
    [profile_height_1] => 35
    [profile_length_1] => 20
    [profile_angle_1] => 54
    [profile_height_2] => 20
    [profile_length_2] => 15
    [profile_angle_2] => 15
    [soil_type_strata1] => 1
    [soil_type_strata2] => 2
    [soil_type_strata3] => 
    [soil_type_strata4] => 
    [soil_strata1_c] => 50
    [soil_strata2_c] => 40
    [soil_strata3_c] => 
    [soil_strata4_c] => 
    [soil_strata1_phi] => 60
    [soil_strata2_phi] => 50
    [soil_strata3_phi] => 
    [soil_strata4_phi] => 
    [soil_strata1_ks] => 1e-09
    [soil_strata2_ks] => 1e-08
    [soil_strata3_ks] => 
    [soil_strata4_ks] => 
    [soil_strata1_x1] => 10
    [soil_strata2_x1] => 25
    [soil_strata3_x1] => 
    [soil_strata4_x1] => 
    [soil_strata1_x2] => 5
    [soil_strata2_x2] => 12
    [soil_strata3_x2] => 
    [soil_strata4_x2] => 
    [soil_strata1_x3] => 0
    [soil_strata2_x3] => 0
    [soil_strata3_x3] => 
    [soil_strata4_x3] => 
    [water_x1] => 5
    [water_x2] => 10
    [water_x3] => 0
    [water_upslope_recharge] => 
    [rain_frequency_1] => 5
    [rain_duration_1] => 2
    [rain_volume_1] => 81.28
)
*/
print_r($_POST);

?>
</pre>
</body>
</html>