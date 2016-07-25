var args = arguments[0] || {};
var current_external_danger = args.external_danger_id ;
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
            $.navigationWindowSectionSixPotentialCause.close() ;
        }
        else
        {
            $.aedesModeSectionSixPotentialCauseWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DangerOfBuilding checkbox event handler
function OnDangerOfBuilding_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_external_danger * 5 , Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] , $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.get_value() ) ;
        Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DangerOfAccessRoad checkbox event handler
function OnDangerOfAccessRoad_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_external_danger * 5 + 1 , Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] , $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.get_value() ) ;
        Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DangerOfInland checkbox event handler
function OnDangerOfInland_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_external_danger * 5 + 2 , Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] , $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.get_value() ) ;
        Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DenialOfAccess checkbox event handler
function OnDenialOfAccess_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_external_danger * 5 + 3 , Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] , $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.get_value() ) ;
        Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue ;
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
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_external_danger * 5 + 4 , Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] , $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.get_value() ) ;
        Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionSixPotentialCauseFatherTitle.setText( current_father_title ) ;

    var potentialCauseValue = Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.init( L( 'generic_danger_of_building_text_msg' ) , potentialCauseValue.charAt( current_external_danger * 5 ) , OnDangerOfBuilding_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.init( L( 'generic_danger_of_access_road_text_msg' ) , potentialCauseValue.charAt( current_external_danger * 5 + 1 ) , OnDangerOfAccessRoad_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.init( L( 'generic_danger_of_inland_text_msg' ) , potentialCauseValue.charAt( current_external_danger * 5 + 2 ) , OnDangerOfInland_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.init( L( 'generic_measures_of_emergency_denial_of_access_text_msg' ) , potentialCauseValue.charAt( current_external_danger * 5 + 3 ) , OnDenialOfAccess_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.set_label_height( 80 ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.init( L( 'generic_measures_of_emergency_steps_protection_text_msg' ) , potentialCauseValue.charAt( current_external_danger * 5 + 4 ) , OnStepsProtection_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.set_label_height( 80 ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionSixPotentialCause.open() ;
    }
    else
    {
        $.aedesModeSectionSixPotentialCauseWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
