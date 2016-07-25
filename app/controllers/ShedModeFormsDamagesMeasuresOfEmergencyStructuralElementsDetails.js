var args = arguments[0] || {} ;
var current_structural_elements_id = args.structural_elements_id ;
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
            $.navigationWindowDamagesMeasuresOfEmergencyStructuralElementsDetails.close() ;
        }
        else
        {
            $.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BeamColumnConnectionThroughAxleSteel checkbox event handler
function OnBeamColumnConnectionThroughAxleSteel_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BeamColumnConnectionByPinsAndSteelPlates checkbox event handler
function OnBeamColumnConnectionByPinsAndSteelPlates_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 1 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BeamColumnConnectionInSteelByCables checkbox event handler
function OnBeamColumnConnectionInSteelByCables_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 2 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement checkbox event handler
function OnInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 3 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PrefabSystemRollOfBeam checkbox event handler
function OnPrefabSystemRollOfBeam_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 4 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PillarPillarConnectionThroughMetalProfilesOnAxisAtThePier checkbox event handler
function OnPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 5 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PillarPillarConnectionThroughMetalDishesAtTheEndOfThePier checkbox event handler
function OnPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 6 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PillarPillarConnectionThroughStrandSteel checkbox event handler
function OnPillarPillarConnectionThroughStrandSteel_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 7 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs checkbox event handler
function OnBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 8 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs checkbox event handler
function OnBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 9 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile checkbox event handler
function OnInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 10 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TileBeamConnection checkbox event handler
function OnTileBeamConnection_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 11 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.get_value() ) ;
        Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ConstructionOfBracingGroundWithSteelRopes checkbox event handler
function OnConstructionOfBracingGroundWithSteelRopes_Change( e )
{
    try
    {
        var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt( current_structural_elements_id * 13 + 12 , Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] , $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.get_value() ) ;
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
    $.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.setTitle( current_father_title ) ;

    var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.init( L( 'generic_beam_column_connection_through_axle_steel_text_msg' ) , measuresOfEmergency.charAt(  current_structural_elements_id * 13 ) , OnBeamColumnConnectionThroughAxleSteel_Change , "/images/Help/beam_column_connection_through_axle_steel.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionThroughAxleSteel.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.init( L( 'generic_beam_column_connection_by_pins_and_steel_plates_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 1 ) , OnBeamColumnConnectionByPinsAndSteelPlates_Change , "/images/Help/beam_column_connection_by_pins_and_steel_plates.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionByPinsAndSteelPlates.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.init( L( 'generic_beam_column_connection_in_steel_by_cables_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 2 ) , OnBeamColumnConnectionInSteelByCables_Change , "/images/Help/beam_column_connection_in_steel_by_cables.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamColumnConnectionInSteelByCables.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.init( L( 'generic_inclusion_of_connectors_for_steel_beam_bolted_a_pillar_with_confinement_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 3 ) , OnInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement_Change , "/images/Help/inclusion_of_connectors_for_steel_beam_bolted_a_pillar_with_confinement.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.set_label_height( 80 ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsForSteelBeamBoltedAPillarWithConfinement.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.init( L( 'generic_prefab_system_roll_of_beam_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 4 ) , OnPrefabSystemRollOfBeam_Change , "/images/Help/prefab_system_roll_of_beam.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPrefabSystemRollOfBeam.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.init( L( 'generic_pillar_pillar_connection_through_metal_profiles_on_axis_at_the_pier_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 5 ) , OnPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier_Change , "/images/Help/pillar_pillar_connection_through_metal_profiles_on_axis_at_the_pier.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalProfilesOnAxisAtThePier.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.init( L( 'generic_pillar_pillar_connection_through_metal_dishes_at_the_end_of_the_pier_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 6 ) , OnPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier_Change , "/images/Help/pillar_pillar_connection_through_metal_dishes_at_the_end_of_pier.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughMetalDishesAtTheEndOfThePier.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.init( L( 'generic_pillar_pillar_connection_through_strand_steel_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 7 ) , OnPillarPillarConnectionThroughStrandSteel_Change , "/images/Help/pillar_pillar_connection_through_strand_steel.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyPillarPillarConnectionThroughStrandSteel.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.init( L( 'generic_beam_tile_connection_through_anchored_steel_cables_on_the_sides_of_the_legs_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 8 ) , OnBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs_Change , "/images/Help/beam_tile_connection_through_anchored_steel_cables_on_the_sides_of_the_legs.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.set_label_height( 80 ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesOnTheSidesOfTheLegs.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.init( L( 'generic_beam_tile_connection_through_anchored_steel_cables_under_the_legs_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 9 ) , OnBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs_Change , "/images/Help/beam_tile_connection_through_anchored_steel_cables_under_the_legs.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.set_label_height( 80 ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyBeamTileConnectionThroughAnchoredSteelCablesUnderTheLegs.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.init( L( 'generic_inclusion_of_connectors_made_of_elements_in_a_bolted_steel_beam_and_tile_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 10 ) , OnInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile_Change , "/images/Help/inclusion_of_connectors_made_of_elements_in_a_bolted_steel_beam_and_tile.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfConnectorsMadeOfElementsInABoltedSteelBeamAndTile.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.init( L( 'generic_tile_beam_connection_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 11 ) , OnTileBeamConnection_Change , "/images/Help/tile_beam_connection.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsRowTileBeamConnection.enabled( view_enabled ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.init( L( 'generic_construction_of_bracing_ground_with_steel_ropes_text_msg' ) , measuresOfEmergency.charAt( current_structural_elements_id * 13 + 12 ) , OnConstructionOfBracingGroundWithSteelRopes_Change , "/images/Help/construction_of_bracing_ground_with_steel_ropes.png" ) ;
    $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConstructionOfBracingGroundWithSteelRopes.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamagesMeasuresOfEmergencyStructuralElementsDetails.open() ;
    }
    else
    {
        $.shedModeDamagesMeasuresOfEmergencyStructuralElementsDetailsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
