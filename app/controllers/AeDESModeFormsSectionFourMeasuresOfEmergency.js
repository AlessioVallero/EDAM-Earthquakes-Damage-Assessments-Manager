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
            $.navigationWindowSectionFourMeasuresOfEmergency.close() ;
        }
        else
        {
            $.aedesModeSectionFourMeasuresOfEmergencyWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Demolitions checkbox event handler
function OnDemolitions_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 5 , Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// HoopsAndOrTies checkbox event handler
function OnHoopsAndOrTies_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 5 + 1 , Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Repair checkbox event handler
function OnRepair_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 5 + 2 , Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Props checkbox event handler
function OnProps_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 5 + 3 , Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// StepsProtection checkbox event handler
function OnStepsProtection_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_measures_of_emergency * 5 + 4 , Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionFourMeasuresOfEmergencyFatherTitle.setText( current_father_title ) ;

    var measuresOfEmergency = Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.init( L( 'generic_demolitions_text_msg' ) , measuresOfEmergency.charAt( current_measures_of_emergency * 5 ) , OnDemolitions_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.init( L( 'generic_hoops_and_or_ties_text_msg' ) , measuresOfEmergency.charAt( current_measures_of_emergency * 5 + 1 ) , OnHoopsAndOrTies_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.init( L( 'generic_repair_text_msg' ) , measuresOfEmergency.charAt( current_measures_of_emergency * 5 + 2 ) , OnRepair_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.init( L( 'generic_props_text_msg' ) , measuresOfEmergency.charAt( current_measures_of_emergency * 5 + 3 ) , OnProps_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.init( L( 'generic_steps_protection_text_msg' ) , measuresOfEmergency.charAt( current_measures_of_emergency * 5 + 4 ) , OnStepsProtection_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionFourMeasuresOfEmergency.open() ;
    }
    else
    {
        $.aedesModeSectionFourMeasuresOfEmergencyWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
