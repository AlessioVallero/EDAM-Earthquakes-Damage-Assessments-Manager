var args = arguments[0] || {};
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
            $.navigationWindowDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.close() ;
        }
        else
        {
            $.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConnectionBetweenThePierAndIndustrialFloor checkbox event handler
function OnConnectionBetweenThePierAndIndustrialFloor_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 193 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConsolidationOfTheFoundationByLowPressureCementMixtures checkbox event handler
function OnConsolidationOfTheFoundationByLowPressureCementMixtures_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 194 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// RestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting checkbox event handler
function OnRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 195 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConfinementAtTheBaseOfThePillars checkbox event handler
function OnConfinementAtTheBaseOfThePillars_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 196 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// LocalStrengtheningWithMetalNecktie checkbox event handler
function OnLocalStrengtheningWithMetalNecktie_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 197 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ContainmentAndStrengtheningOfTheBasicOfThePier checkbox event handler
function OnContainmentAndStrengtheningOfTheBasicOfThePier_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( 198 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.init( L( 'generic_connection_between_the_pier_and_industrial_floor_text_msg' ) , measuresOfEmergency.charAt( 193 ) , OnConnectionBetweenThePierAndIndustrialFloor_Change , "/images/Help/connection_between_the_pier_and_industrial_floor.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.init( L( 'generic_consolidation_of_the_foundation_by_low_pressure_cement_mixtures_text_msg' ) , measuresOfEmergency.charAt( 194 ) , OnConsolidationOfTheFoundationByLowPressureCementMixtures_Change , "/images/Help/consolidation_of_the_foundation_by_low_pressure_cement_mixtures.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.set_label_height( 80 ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.init( L( 'generic_restoring_the_filling_interspace_between_the_pier_and_glass_by_manual_casting_text_msg' ) , measuresOfEmergency.charAt( 195 ) , OnRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting_Change , "/images/Help/restoring_the_filling_interspace_between_the_pier_and_glass_by_manual_casting.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.set_label_height( 80 ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.init( L( 'generic_confinement_at_the_base_of_the_pillars_text_msg' ) , measuresOfEmergency.charAt( 196 ) , OnConfinementAtTheBaseOfThePillars_Change , "/images/Help/confinement_at_the_base_of_the_pillars.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.init( L( 'generic_local_strengthening_with_metal_necktie_text_msg' ) , measuresOfEmergency.charAt( 197 ) , OnLocalStrengtheningWithMetalNecktie_Change , "/images/Help/local_strengthening_with_metal_necktie.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.init( L( 'generic_containment_and_strengthening_of_the_basic_of_the_pier_text_msg' ) , measuresOfEmergency.charAt( 198 ) , OnContainmentAndStrengtheningOfTheBasicOfThePier_Change , "/images/Help/containment_and_strengthening_of_the_basic_of_the_pier.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.open() ;
    }
    else
    {
        $.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
