var args = arguments[0] || {};
var current_measures_of_emergency = args.measures_of_emergency_id ;
var current_father_title = args.father_title ;
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
            $.navigationWindowSectionEightMeasuresOfEmergency.close() ;
        }
        else
        {
            $.aedesModeSectionEightMeasuresOfEmergencyWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Limited checkbox event handler
function OnLimited_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 2 , Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.get_value() ) ;
        Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Extended checkbox event handler
function OnExtended_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 2 + 1 , Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.get_value() ) ;
        Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionEightMeasuresOfEmergencyFatherTitle.setText( current_father_title ) ;

    var measuresOfEmergencyValue = Alloy.Globals.AeDESModeSectionEight["MEASURES_OF_EMERGENCY"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.init( L( 'generic_limited_text_msg' ) , measuresOfEmergencyValue.charAt( current_measures_of_emergency * 2 ) , OnLimited_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyLimited.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.init( L( 'generic_extended_text_msg' ) , measuresOfEmergencyValue.charAt( current_measures_of_emergency * 2 + 1 ) , OnExtended_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionEightMeasuresOfEmergencyExtended.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionEightMeasuresOfEmergency.open() ;
    }
    else
    {
        $.aedesModeSectionEightMeasuresOfEmergencyWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
