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
            $.navigationWindowDetailedEvaluationGeotechnicalHazards.close() ;
        }
        else
        {
            $.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// SlopeFailureDebris picker event handler
function OnSlopeFailureDebris_Change( e )
{
    try
    {
        var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt( 19 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// GroundMovementFissures picker event handler
function OnGroundMovementFissures_Change( e )
{
    try
    {
        var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt( 20 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue ;
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
        var newGeotechnicalHazardsValue = Alloy.Globals.replaceCharAt( 21 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newGeotechnicalHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OtherName textfield change event handler
function OnOtherName_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.get_text_value() ;
}

// Comments textfield change event handler
function OnComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.get_text_value() ;
}

try
{
    var geotechnicalHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ;
    // Init controls
    var slopeFailureDebrisParentView = null ;
    var groundMovementFissuresParentView = null ;
    var otherParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        slopeFailureDebrisParentView = mainView ;
        groundMovementFissuresParentView = mainView ;
        otherParentView = mainView ;
    }
    else
    {
        slopeFailureDebrisParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris ;
        groundMovementFissuresParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures ;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther ;
    }
    // Init app comboboxes
    var slopeFailureDebrisValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.init( L( 'generic_slope_failure_debris_text_msg' ) , slopeFailureDebrisValues , OnSlopeFailureDebris_Change , null , slopeFailureDebrisParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.enabled( view_enabled ) ;

    var groundMovementFissuresValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.init( L( 'generic_ground_movement_fissures_text_msg' ) , groundMovementFissuresValues , OnGroundMovementFissures_Change , null , groundMovementFissuresParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.enabled( view_enabled ) ;

    var otherValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.init( L( 'generic_other_text_msg' ) , otherValues , OnOther_Change , null , otherParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.enabled( view_enabled ) ;

    if( geotechnicalHazardsValue )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsSlopeFailureDebris.set_selected_index( geotechnicalHazardsValue.charAt( 19 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsGroundMovementFissures.set_selected_index( geotechnicalHazardsValue.charAt( 20 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOther.set_selected_index( geotechnicalHazardsValue.charAt( 21 ) ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.init( L( 'generic_other_text_msg' ) , OnOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_OTHER"] ) ;

    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.init( L( 'generic_comments_text_msg' ) , OnComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["GEOTECHNICAL_HAZARDS_COMMENTS"] ) ;

    RegisterHideKeyboard( $.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsOtherName.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeotechnicalHazardsComments.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedEvaluationGeotechnicalHazards.open() ;
    }
    else
    {
        $.atc20ModeDetailedEvaluationGeotechnicalHazardsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
