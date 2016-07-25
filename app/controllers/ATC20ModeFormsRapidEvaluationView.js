var args = arguments[0] || {};
var current_mode = args.mode ;
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
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "form:save_from_section" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowRapidEvaluation.close() ;
        }
        else
        {
            $.atc20ModeRapidEvaluationWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// EstimatedBuildingDamage picker event handler
function OnEstimatedBuildingDamage_Change( e )
{
    Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] = e.id ;
}

// GeneralComments textfield change event handler
function OnGeneralComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.get_text_value() ;
}

// CollapsePartialCollapseOrBuildingOffFoundation picker event handler
function OnCollapsePartialCollapseOrBuildingOffFoundation_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 0 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BuildingOrStoryLeaning picker event handler
function OnBuildingOrStoryLeaning_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 1 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// RackingDamageToWallsOtherStructuralDamage picker event handler
function OnRackingDamageToWallsOtherStructuralDamage_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 2 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ChimneyParapetOrOtherFallingHazard picker event handler
function OnChimneyParapetOrOtherFallingHazard_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 3 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// GroundSlopeMovementOrCracking picker event handler
function OnGroundSlopeMovementOrCracking_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 4 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Other picker event handler
function OnOther_Change( e )
{
    try
    {
        var newRapidEvaluationValue = Alloy.Globals.replaceCharAt( 5 , Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] = newRapidEvaluationValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OtherName textfield change event handler
function OnOtherName_Change( e , type )
{
    Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] = $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    var rapidEvaluationValue = Alloy.Globals.ATC20ModeRapidEvaluation["EVALUATION"] ;
    // Init controls
    var estimatedBuildingDamageParentView = null ;
    var collapsePartialCollapseOrBuildingOffFoundationParentView = null ;
    var buildingOrStoryLeaningParentView = null ;
    var rackingDamageToWallsOtherStructuralDamageParentView = null ;
    var chimneyParapetOrOtherFallingHazardParentView = null ;
    var groundSlopeMovementOrCrackingParentView = null ;
    var otherParentView = null ;
    // On iOS devices the parentView must be the thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        estimatedBuildingDamageParentView = thisView ;
        collapsePartialCollapseOrBuildingOffFoundationParentView = thisView ;
        buildingOrStoryLeaningParentView = thisView ;
        rackingDamageToWallsOtherStructuralDamageParentView = thisView ;
        chimneyParapetOrOtherFallingHazardParentView = thisView ;
        groundSlopeMovementOrCrackingParentView = thisView ;
        otherParentView = thisView ;
    }
    else
    {
        estimatedBuildingDamageParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage ;
        collapsePartialCollapseOrBuildingOffFoundationParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation ;
        buildingOrStoryLeaningParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning ;
        rackingDamageToWallsOtherStructuralDamageParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage ;
        chimneyParapetOrOtherFallingHazardParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard ;
        groundSlopeMovementOrCrackingParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking ;
        otherParentView = $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther ;
    }

    if( current_mode == "NEPAL" )
    {
        // Remove ESTIMATED_BUILDING_DAMAGE field
        $.scrollViewRapidEvaluation.remove( $.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage = null ;

        $.viewAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.setTop( 0 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.setTop( 70 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.setTop( 170 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.setTop( 240 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.setTop( 340 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.setTop( 440 ) ;
        $.viewAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.setTop( 540 ) ;
        $.viewAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.setTop( 610 ) ;
        $.viewAppButtonSave.setTop( 680 ) ;
    }
    else
    {
        // Init app comboboxes
        var estimatedBuildingDamageValues =
        {
            0: { title: L( 'generic_estimated_building_damage_none' ) } ,
            1: { title: '0-1%' } ,
            2: { title: '1-10%' } ,
            3: { title: '10-30%' } ,
            4: { title: '30-60%' } ,
            5: { title: '60-100%' } ,
            6: { title: '100%' }
        } ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.init( L( 'generic_estimated_building_damage_text_msg' ) , estimatedBuildingDamageValues , OnEstimatedBuildingDamage_Change , null , estimatedBuildingDamageParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.enabled( view_enabled ) ;

        if( Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] )
        {
            $.widgetAppComboBoxATC20ModeFormsRapidEvaluationEstimatedBuildingDamage.set_selected_index( Alloy.Globals.ATC20ModeRapidEvaluation["ESTIMATED_BUILDING_DAMAGE"] ) ;
        }
    }

    var collapsePartialCollapseOrBuildingOffFoundationValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.init( L( 'generic_collapse_partial_collapse_or_building_off_foundation_text_msg' ) , collapsePartialCollapseOrBuildingOffFoundationValues , OnCollapsePartialCollapseOrBuildingOffFoundation_Change , null , collapsePartialCollapseOrBuildingOffFoundationParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.enabled( view_enabled ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.set_label_height( 80 ) ;

    var buildingOrStoryLeaningValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.init( L( 'generic_building_or_story_leaning_text_msg' ) , buildingOrStoryLeaningValues , OnBuildingOrStoryLeaning_Change , null , buildingOrStoryLeaningParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.enabled( view_enabled ) ;

    var rackingDamageToWallsOtherStructuralDamageValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.init( L( 'generic_racking_damage_to_walls_other_structural_damage_text_msg' ) , rackingDamageToWallsOtherStructuralDamageValues , OnRackingDamageToWallsOtherStructuralDamage_Change , null , rackingDamageToWallsOtherStructuralDamageParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.enabled( view_enabled ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.set_label_height( 80 ) ;

    var chimneyParapetOrOtherFallingHazardValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.init( L( 'generic_chimney_parapet_or_other_falling_hazard_text_msg' ) , chimneyParapetOrOtherFallingHazardValues , OnChimneyParapetOrOtherFallingHazard_Change , null , chimneyParapetOrOtherFallingHazardParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.enabled( view_enabled ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.set_label_height( 80 ) ;

    var groundSlopeMovementOrCrackingValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.init( L( 'generic_ground_slope_movement_or_cracking_text_msg' ) , groundSlopeMovementOrCrackingValues , OnGroundSlopeMovementOrCracking_Change , null , groundSlopeMovementOrCrackingParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.enabled( view_enabled ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.set_label_height( 80 ) ;

    var otherValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.init( L( 'generic_other_text_msg' ) , otherValues , OnOther_Change , null , otherParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.enabled( view_enabled ) ;

    if( rapidEvaluationValue )
    {
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsCollapsePartialCollapseOrBuildingOffFoundation.set_selected_index( rapidEvaluationValue.charAt( 0 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsBuildingOrStoryLeaning.set_selected_index( rapidEvaluationValue.charAt( 1 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsRackingDamageToWallsOtherStructuralDamage.set_selected_index( rapidEvaluationValue.charAt( 2 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsChimneyParapetOrOtherFallingHazard.set_selected_index( rapidEvaluationValue.charAt( 3 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsGroundSlopeMovementOrCracking.set_selected_index( rapidEvaluationValue.charAt( 4 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidEvaluationObservedConditionsOther.set_selected_index( rapidEvaluationValue.charAt( 5 ) ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.init( L( 'generic_general_comments_txt_hint' ) , OnGeneralComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.set_text_value( Alloy.Globals.ATC20ModeRapidEvaluation["GENERAL_COMMENTS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.enabled( view_enabled ) ;

    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.init( L( 'generic_other_text_msg' ) , OnOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.set_text_value( Alloy.Globals.ATC20ModeRapidEvaluation["OTHER_OBSERVED_CONDITIONS"] ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.atc20ModeRapidEvaluationWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationGeneralComments.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsRapidEvaluationObservedConditionsOtherName.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowRapidEvaluation.open() ;
    }
    else
    {
        $.atc20ModeRapidEvaluationWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
