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
            $.navigationWindowDetailedEvaluationOverallHazards.close() ;
        }
        else
        {
            $.atc20ModeDetailedEvaluationOverallHazardsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// CollapseOrPartialCollapse picker event handler
function OnCollapseOrPartialCollapse_Change( e )
{
    try
    {
        var newOverallHazardsValue = Alloy.Globals.replaceCharAt( 0 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue ;
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
        var newOverallHazardsValue = Alloy.Globals.replaceCharAt( 1 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue ;
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
        var newOverallHazardsValue = Alloy.Globals.replaceCharAt( 2 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newOverallHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OtherName textfield change event handler
function OnOtherName_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.get_text_value() ;
}

// Comments textfield change event handler
function OnComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.get_text_value() ;
}

try
{
    var overallHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ;
    // Init controls
    var collapseOrPartialCollapseParentView = null ;
    var buildingOrStoryLeaningParentView = null ;
    var otherParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        collapseOrPartialCollapseParentView = mainView ;
        buildingOrStoryLeaningParentView = mainView ;
        otherParentView = mainView ;
    }
    else
    {
        collapseOrPartialCollapseParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse ;
        buildingOrStoryLeaningParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning ;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther ;
    }
    // Init app comboboxes
    var collapseOrPartialCollapseValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.init( L( 'generic_collapse_or_partial_collapse_text_msg' ) , collapseOrPartialCollapseValues , OnCollapseOrPartialCollapse_Change , null , collapseOrPartialCollapseParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.enabled( view_enabled ) ;

    var buildingOrStoryLeaningValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.init( L( 'generic_building_or_story_leaning_text_msg' ) , buildingOrStoryLeaningValues , OnBuildingOrStoryLeaning_Change , null , buildingOrStoryLeaningParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.enabled( view_enabled ) ;

    var otherValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.init( L( 'generic_other_text_msg' ) , otherValues , OnOther_Change , null , otherParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.enabled( view_enabled ) ;

    if( overallHazardsValue )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsCollapseOrPartialCollapse.set_selected_index( overallHazardsValue.charAt( 0 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsBuildingOrStoryLeaning.set_selected_index( overallHazardsValue.charAt( 1 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationOverallHazardsOther.set_selected_index( overallHazardsValue.charAt( 2 ) ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.init( L( 'generic_other_text_msg' ) , OnOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_OTHER"] ) ;

    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.init( L( 'generic_comments_text_msg' ) , OnComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["OVERALL_HAZARDS_COMMENTS"] ) ;

    RegisterHideKeyboard( $.atc20ModeDetailedEvaluationOverallHazardsWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsOtherName.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationOverallHazardsComments.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedEvaluationOverallHazards.open() ;
    }
    else
    {
        $.atc20ModeDetailedEvaluationOverallHazardsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
