var args = arguments[0] || {};
var current_landslide_type = args.landslide_type ;
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
            $.navigationWindowLandslideLandslideType.close() ;
        }
        else
        {
            $.baeaModeLandslideLandslideTypeWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Slide checkbox event handler
function OnSlide_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 0 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Fall checkbox event handler
function OnFall_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 1 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Flow checkbox event handler
function OnFlow_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 2 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Spread checkbox event handler
function OnSpread_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 3 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Topple checkbox event handler
function OnTopple_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 4 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Complex checkbox event handler
function OnComplex_Change( e )
{
    try
    {
        current_landslide_type = Alloy.Globals.replaceCharAt( 5 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
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
        current_landslide_type = Alloy.Globals.replaceCharAt( 6 , current_landslide_type , $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_landslide:landslide_type_changed' , { value: current_landslide_type } ) ;
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
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.init( L( 'generic_slide_text_msg' ) , current_landslide_type.charAt( 0 ) , OnSlide_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSlide.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.init( L( 'generic_fall_text_msg' ) , current_landslide_type.charAt( 1 ) , OnFall_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFall.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.init( L( 'generic_flow_text_msg' ) , current_landslide_type.charAt( 2 ) , OnFlow_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeFlow.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.init( L( 'generic_spread_text_msg' ) , current_landslide_type.charAt( 3 ) , OnSpread_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeSpread.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.init( L( 'generic_topple_text_msg' ) , current_landslide_type.charAt( 4 ) , OnTopple_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeTopple.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.init( L( 'generic_complex_text_msg' ) , current_landslide_type.charAt( 5 ) , OnComplex_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeComplex.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.init( L( 'generic_other_text_msg' ) , current_landslide_type.charAt( 6 ) , OnOther_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLandslideLandslideTypeOther.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLandslideLandslideType.open() ;
    }
    else
    {
        $.baeaModeLandslideLandslideTypeWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
