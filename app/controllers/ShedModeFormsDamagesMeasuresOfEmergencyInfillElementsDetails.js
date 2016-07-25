var args = arguments[0] || {} ;
var current_infill_elements_id = args.infill_elements_id ;
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
            $.navigationWindowDamagesMeasuresOfEmergencyInfillElementsDetails.close() ;
        }
        else
        {
            $.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConnectionOfHorizontalPanelsBySteelCables checkbox event handler
function OnConnectionOfHorizontalPanelsBySteelCables_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 130 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InclusionOfAntiDropCableForHorizontalPanels checkbox event handler
function OnInclusionOfAntiDropCableForHorizontalPanels_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 131 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConnectingThePillarsOfCurtainPanel checkbox event handler
function OnConnectingThePillarsOfCurtainPanel_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 132 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConnectionOfVerticalPanelsBySteelCables checkbox event handler
function OnConnectionOfVerticalPanelsBySteelCables_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 133 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConnectionOfVerticalPanelsBySteelSquares checkbox event handler
function OnConnectionOfVerticalPanelsBySteelSquares_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 134 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InclusionOfAntiDropCableForVerticalPanels checkbox event handler
function OnInclusionOfAntiDropCableForVerticalPanels_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 135 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InclusionOfTwoAntiDropCablesPanelCorner checkbox event handler
function OnInclusionOfTwoAntiDropCablesPanelCorner_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_infill_elements_id * 7 + 136 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.setTitle( current_father_title ) ;

    var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.init( L( 'generic_connection_of_horizontal_panels_by_steel_cables_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 130 ) , OnConnectionOfHorizontalPanelsBySteelCables_Change , "/images/Help/connection_of_horizontal_panels_by_steel_cables.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.init( L( 'generic_inclusion_of_anti_drop_cable_for_horizontal_panels_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 131 ) , OnInclusionOfAntiDropCableForHorizontalPanels_Change , "/images/Help/inclusion_of_anti_drop_cable_for_horizontal_panels.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.init( L( 'generic_connecting_the_pillars_of_curtain_panel_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 132 ) , OnConnectingThePillarsOfCurtainPanel_Change , "/images/Help/connecting_the_pillars_of_curtain_panel.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.init( L( 'generic_connection_of_vertical_panels_by_steel_cables_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 133 ) , OnConnectionOfVerticalPanelsBySteelCables_Change , "/images/Help/connection_of_vertical_panels_by_steel_cables.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.init( L( 'generic_connection_of_vertical_panels_by_steel_squares_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 134 ) , OnConnectionOfVerticalPanelsBySteelSquares_Change , "/images/Help/connection_of_vertical_panels_by_steel_squares.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.init( L( 'generic_inclusion_of_anti_drop_cable_for_vertical_panels_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 135 ) , OnInclusionOfAntiDropCableForVerticalPanels_Change , "/images/Help/inclusion_of_anti_drop_cable_for_vertical_panels.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.init( L( 'generic_inclusion_of_two_anti_drop_cables_panel_corner_text_msg' ) , measuresOfEmergency.charAt( current_infill_elements_id * 7 + 136 ) , OnInclusionOfTwoAntiDropCablesPanelCorner_Change , "/images/Help/inclusion_of_two_anti_drop_cables_panel_corner.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamagesMeasuresOfEmergencyInfillElementsDetails.open() ;
    }
    else
    {
        $.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
