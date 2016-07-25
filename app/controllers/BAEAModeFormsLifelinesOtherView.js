var args = arguments[0] || {};
var current_other = args.other ;
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
            $.navigationWindowLifelinesOther.close() ;
        }
        else
        {
            $.baeaModeLifelinesOtherWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// WaterWastewater checkbox event handler
function OnWaterWastewater_Change( e )
{
    try
    {
        current_other = Alloy.Globals.replaceCharAt( 0 , current_other , $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:other_changed' , { value: current_other } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// GasAndFuelLines checkbox event handler
function OnGasAndFuelLines_Change( e )
{
    try
    {
        current_other = Alloy.Globals.replaceCharAt( 1 , current_other , $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:other_changed' , { value: current_other } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Transportation checkbox event handler
function OnTransportation_Change( e )
{
    try
    {
        current_other = Alloy.Globals.replaceCharAt( 2 , current_other , $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:other_changed' , { value: current_other } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Other checkbox event handler
function OnOther_Change( e )
{
    try
    {
        current_other = Alloy.Globals.replaceCharAt( 3 , current_other , $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:other_changed' , { value: current_other } ) ;
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
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.init( L( 'generic_water_wastewater_text_msg' ) , current_other.charAt( 0 ) , OnWaterWastewater_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.init( L( 'generic_gas_and_fuel_lines_text_msg' ) , current_other.charAt( 1 ) , OnGasAndFuelLines_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.init( L( 'generic_transportation_text_msg' ) , current_other.charAt( 2 ) , OnTransportation_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.init( L( 'generic_other_text_msg' ) , current_other.charAt( 3 ) , OnOther_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLifelinesOther.open() ;
    }
    else
    {
        $.baeaModeLifelinesOtherWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
