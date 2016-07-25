var args = arguments[0] || {} ;
var current_mode = args.mode ;
var current_is_synchronized = args.is_synchronized ;
var current_atc20_type = args.atc20_type ;
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
            $.navigationWindowFurtherActions.close() ;
        }
        else
        {
            $.atc20ModeFurtherActionsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// BarricadesNeededInTheFollowingAreas textfield change event handler
function OnBarricadesNeededInTheFollowingAreas_Change( e , type )
{
    Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"] = $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.get_text_value() ;
}

// EvaluationRecommended picker event handler
function OnEvaluationRecommended_Change( e )
{
    Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] = e.id ;
    if( e.id != 3 )
    {
        $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.set_text_value( "" ) ;
        Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] = "" ;
    }
}

// OtherEvaluationRecommended textfield change event handler
function OnOtherEvaluationRecommended_Change( e , type )
{
    var newOtherNameValue = $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.get_text_value() ;
    Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] = newOtherNameValue ;
    // If the value is not empty, we must also set the selected item of the EvaluationRecommended picker to "Other"
    if( newOtherNameValue )
    {
        $.widgetAppComboBoxATC20ModeFormsFurtherActionsEvaluationRecommended.set_selected_index( "3" ) ;
        Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] = "3" ;
    }
}

// OtherRecommendations textfield change event handler
function OnOtherRecommendations_Change( e , type )
{
    Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"] = $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.get_text_value() ;
}

// Comments textfield change event handler
function OnComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsFurtherActionsComments.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var evaluationRecommendedParentView = null ;
    // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        evaluationRecommendedParentView = thisView ;
    }
    else
    {
        evaluationRecommendedParentView = $.viewAppComboBoxATC20ModeFormsFurtherActionsEvaluationRecommended ;
    }
    // Init app comboboxes
    var evaluationRecommendedLanguageMsg = 'generic_rapid_evaluation_recommended_text_msg' ;
    if( current_atc20_type == "0" )
    {
        evaluationRecommendedLanguageMsg = 'generic_detailed_evaluation_recommended_text_msg' ;
    }

    var evaluationRecommendedValues =
    {
        0: { title: L( 'generic_evaluation_recommended_none' ) } ,
        1: { title: L( 'generic_evaluation_recommended_structural' ) } ,
        2: { title: L( 'generic_evaluation_recommended_geotechnical' ) } ,
        3: { title: L( 'generic_evaluation_recommended_other' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsFurtherActionsEvaluationRecommended.init( L( evaluationRecommendedLanguageMsg ) , evaluationRecommendedValues , OnEvaluationRecommended_Change , null , evaluationRecommendedParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsFurtherActionsEvaluationRecommended.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] )
    {
        $.widgetAppComboBoxATC20ModeFormsFurtherActionsEvaluationRecommended.set_selected_index( Alloy.Globals.ATC20ModeFurtherActions["EVALUATION_RECOMMENDED"] ) ;
    }
    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.init( L( 'generic_barricades_in_the_following_areas_txt_hint' ) , OnBarricadesNeededInTheFollowingAreas_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.set_text_value( Alloy.Globals.ATC20ModeFurtherActions["BARRICADES_IN_THE_FOLLOWING_AREAS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.enabled( view_enabled ) ;

    $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.init( L( 'generic_other_text_msg' ) , OnOtherEvaluationRecommended_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.set_text_value( Alloy.Globals.ATC20ModeFurtherActions["OTHER_EVALUATION_RECOMMENDED"] ) ;
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.enabled( view_enabled ) ;

    if( current_mode == "CA" || current_mode == "NEPAL" )
    {
        $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.init( L( 'generic_other_recommendations_text_msg' ) , OnOtherRecommendations_Change ) ;

        $.widgetAppTextFieldATC20ModeFormsFurtherActionsComments.init( L( 'generic_comments_text_msg' ) , OnComments_Change ) ;
        $.widgetAppTextFieldATC20ModeFormsFurtherActionsComments.set_text_value( Alloy.Globals.ATC20ModeFurtherActions["COMMENTS"] ) ;
        $.widgetAppTextFieldATC20ModeFormsFurtherActionsComments.enabled( view_enabled ) ;

        RegisterHideKeyboard( $.atc20ModeFurtherActionsWindow ,
        [
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsComments.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.get_text_field()
        ] ) ;
    }
    else if( current_mode == "NZ" )
    {
        $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.init( L( 'generic_other_recommendations_comments_text_msg' ) , OnOtherRecommendations_Change ) ;

        // Remove COMMENTS field
        $.scrollViewFurtherActions.remove( $.viewAppTextFieldATC20ModeFormsFurtherActionsComments ) ;
        $.viewAppTextFieldATC20ModeFormsFurtherActionsComments = null ;

        $.viewAppButtonSave.setTop( 280 ) ;

        RegisterHideKeyboard( $.atc20ModeFurtherActionsWindow ,
        [
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsBarricadesNeededInTheFollowingAreas.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherEvaluationRecommended.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.get_text_field()
        ] ) ;
    }
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.set_text_value( Alloy.Globals.ATC20ModeFurtherActions["OTHER_RECOMMENDATIONS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsFurtherActionsOtherRecommendations.enabled( view_enabled ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowFurtherActions.open() ;
    }
    else
    {
        $.atc20ModeFurtherActionsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
