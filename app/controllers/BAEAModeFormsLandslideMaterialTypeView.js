var args = arguments[0] || {};
var current_material_type = args.material_type ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowLandslideMaterialType.close() ;
        }
        else
        {
            $.baeaModeLandslideMaterialTypeWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// AlluviumSoilFill checkbox event handler
function OnAlluviumSoilFill_Change( e )
{
    try
    {
        current_material_type = Alloy.Globals.replaceCharAt( 0 , current_material_type , $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:material_type_changed' , { value: current_material_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// SedimentaryRock checkbox event handler
function OnSedimentaryRock_Change( e )
{
    try
    {
        current_material_type = Alloy.Globals.replaceCharAt( 1 , current_material_type , $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:material_type_changed' , { value: current_material_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// CrystallineRock checkbox event handler
function OnCrystallineRock_Change( e )
{
    try
    {
        current_material_type = Alloy.Globals.replaceCharAt( 2 , current_material_type , $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:material_type_changed' , { value: current_material_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.init( L( 'generic_alluvium_soil_fill_text_msg' ) , current_material_type.charAt( 0 ) , OnAlluviumSoilFill_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.init( L( 'generic_sedimentary_rock_text_msg' ) , current_material_type.charAt( 1 ) , OnSedimentaryRock_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.init( L( 'generic_crystalline_rock_text_msg' ) , current_material_type.charAt( 2 ) , OnCrystallineRock_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLandslideMaterialType.open() ;
    }
    else
    {
        $.baeaModeLandslideMaterialTypeWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
