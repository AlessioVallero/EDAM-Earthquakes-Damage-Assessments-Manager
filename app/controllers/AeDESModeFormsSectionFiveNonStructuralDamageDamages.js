var args = arguments[0] || {};
var current_non_structural_element = args.non_structural_element_id ;
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
            $.navigationWindowSectionFiveNonStructuralDamage.close() ;
        }
        else
        {
            $.aedesModeSectionFiveNonStructuralDamageWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PresenceOfDamage checkbox event handler
function OnPresenceOfDamage_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Removal checkbox event handler
function OnRemoval_Change( e )
{
    try
    {
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 + 1 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
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
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 + 2 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
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
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 + 3 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
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
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 + 4 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
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
        var newDamageTypeValue = Alloy.Globals.replaceCharAt( current_non_structural_element * 6 + 5 , Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] , $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.get_value() ) ;
        Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] = newDamageTypeValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionFiveDamageTypeFatherTitle.setText( current_father_title ) ;

    var damageTypeValue = Alloy.Globals.AeDESModeSectionFive["DAMAGE_TYPES"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.init( L( 'generic_presence_of_damage_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 ) , OnPresenceOfDamage_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamagePresenceOfDamage.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.init( L( 'generic_removal_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 + 1 ) , OnRemoval_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRemoval.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.init( L( 'generic_props_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 + 2 ) , OnProps_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageProps.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.init( L( 'generic_repair_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 + 3 ) , OnRepair_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageRepair.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.init( L( 'generic_denial_of_access_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 + 4 ) , OnDenialOfAccess_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageDenialOfAccess.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.init( L( 'generic_steps_protection_text_msg' ) , damageTypeValue.charAt( current_non_structural_element * 6 + 5 ) , OnStepsProtection_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionFiveNonStructuralDamageStepsProtection.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionFiveNonStructuralDamage.open() ;
    }
    else
    {
        $.aedesModeSectionFiveNonStructuralDamageWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
