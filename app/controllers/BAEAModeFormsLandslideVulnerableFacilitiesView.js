var args = arguments[0] || {};
var current_vulnerable_facilities = args.vulnerable_facilities ;
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
            $.navigationWindowLandslideVulnerableFacilities.close() ;
        }
        else
        {
            $.baeaModeLandslideVulnerableFacilitiesWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Buildings checkbox event handler
function OnBuildings_Change( e )
{
    try
    {
        current_vulnerable_facilities = Alloy.Globals.replaceCharAt( 0 , current_vulnerable_facilities , $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:vulnerable_facilities_changed' , { value: current_vulnerable_facilities } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Utilities checkbox event handler
function OnUtilities_Change( e )
{
    try
    {
        current_vulnerable_facilities = Alloy.Globals.replaceCharAt( 1 , current_vulnerable_facilities , $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:vulnerable_facilities_changed' , { value: current_vulnerable_facilities } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Roads checkbox event handler
function OnRoads_Change( e )
{
    try
    {
        current_vulnerable_facilities = Alloy.Globals.replaceCharAt( 2 , current_vulnerable_facilities , $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:vulnerable_facilities_changed' , { value: current_vulnerable_facilities } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// None checkbox event handler
function OnNone_Change( e )
{
    try
    {
        current_vulnerable_facilities = Alloy.Globals.replaceCharAt( 3 , current_vulnerable_facilities , $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:vulnerable_facilities_changed' , { value: current_vulnerable_facilities } ) ;
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
        current_vulnerable_facilities = Alloy.Globals.replaceCharAt( 4 , current_vulnerable_facilities , $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:vulnerable_facilities_changed' , { value: current_vulnerable_facilities } ) ;
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
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.init( L( 'generic_buildings_text_msg' ) , current_vulnerable_facilities.charAt( 0 ) , OnBuildings_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.init( L( 'generic_utilities_text_msg' ) , current_vulnerable_facilities.charAt( 1 ) , OnUtilities_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.init( L( 'generic_roads_text_msg' ) , current_vulnerable_facilities.charAt( 2 ) , OnRoads_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.init( L( 'generic_none_text_msg' ) , current_vulnerable_facilities.charAt( 3 ) , OnNone_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.init( L( 'generic_other_text_msg' ) , current_vulnerable_facilities.charAt( 4 ) , OnOther_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLandslideVulnerableFacilities.open() ;
    }
    else
    {
        $.baeaModeLandslideVulnerableFacilitiesWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
