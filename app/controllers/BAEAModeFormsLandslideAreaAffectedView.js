var args = arguments[0] || {};
var current_area_affected = args.area_affected ;
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
            $.navigationWindowLandslideAreaAffected.close() ;
        }
        else
        {
            $.baeaModeLandslideAreaAffectedWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// LessThanTen checkbox event handler
function OnLessThanTen_Change( e )
{
    try
    {
        current_area_affected = Alloy.Globals.replaceCharAt( 0 , current_area_affected , $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:area_affected_changed' , { value: current_area_affected } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TenToHundred checkbox event handler
function OnTenToHundred_Change( e )
{
    try
    {
        current_area_affected = Alloy.Globals.replaceCharAt( 1 , current_area_affected , $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:area_affected_changed' , { value: current_area_affected } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// HundredToThousand checkbox event handler
function OnHundredToThousand_Change( e )
{
    try
    {
        current_area_affected = Alloy.Globals.replaceCharAt( 2 , current_area_affected , $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:area_affected_changed' , { value: current_area_affected } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ThousandToTenThousand checkbox event handler
function OnThousandToTenThousand_Change( e )
{
    try
    {
        current_area_affected = Alloy.Globals.replaceCharAt( 3 , current_area_affected , $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:area_affected_changed' , { value: current_area_affected } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// GreaterThanTenThousand checkbox event handler
function OnGreaterThanTenThousand_Change( e )
{
    try
    {
        current_area_affected = Alloy.Globals.replaceCharAt( 4 , current_area_affected , $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:area_affected_changed' , { value: current_area_affected } ) ;
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
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.init( '<10' , current_area_affected.charAt( 0 ) , OnLessThanTen_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.init( '10-100' , current_area_affected.charAt( 1 ) , OnTenToHundred_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.init( '100-1000' , current_area_affected.charAt( 2 ) , OnHundredToThousand_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.init( '1000-10000' , current_area_affected.charAt( 3 ) , OnThousandToTenThousand_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.init( '>10000' , current_area_affected.charAt( 4 ) , OnGreaterThanTenThousand_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLandslideAreaAffected.open() ;
    }
    else
    {
        $.baeaModeLandslideAreaAffectedWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
