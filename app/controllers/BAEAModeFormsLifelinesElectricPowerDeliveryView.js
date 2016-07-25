var args = arguments[0] || {};
var current_electric_power_delivery = args.electric_power_delivery ;
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
            $.navigationWindowLifelinesElectricPowerDelivery.close() ;
        }
        else
        {
            $.baeaModeLifelinesElectricPowerDeliveryWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OverheadAndBuriedTransmissionLines checkbox event handler
function OnOverheadAndBuriedTransmissionLines_Change( e )
{
    try
    {
        current_electric_power_delivery = Alloy.Globals.replaceCharAt( 0 , current_electric_power_delivery , $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:electric_power_delivery_changed' , { value: current_electric_power_delivery } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// SubstationAndSwitchyards checkbox event handler
function OnSubstationAndSwitchyards_Change( e )
{
    try
    {
        current_electric_power_delivery = Alloy.Globals.replaceCharAt( 1 , current_electric_power_delivery , $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:electric_power_delivery_changed' , { value: current_electric_power_delivery } ) ;
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
    $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.init( L( 'generic_overhead_and_buried_transmission_lines_text_msg' ) , current_electric_power_delivery.charAt( 0 ) , OnOverheadAndBuriedTransmissionLines_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.init( L( 'generic_substation_and_switchyards_text_msg' ) , current_electric_power_delivery.charAt( 1 ) , OnSubstationAndSwitchyards_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLifelinesElectricPowerDelivery.open() ;
    }
    else
    {
        $.baeaModeLifelinesElectricPowerDeliveryWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
