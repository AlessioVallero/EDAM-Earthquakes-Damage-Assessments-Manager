var args = arguments[0] || {} ;
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
            $.navigationWindowDetailedEvaluation.close() ;
        }
        else
        {
            $.atc20ModeDetailedEvaluationWindow.close() ;
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
    Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] = e.id ;
}

// GeneralComments textfield change event handler
function OnGeneralComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.get_text_value() ;
}

// Table view detailed evaluation click event handler
function OnTableViewATC20ModeFormsDetailedEvaluation_Click( e )
{
    try
    {
        switch( e.index )
        {
            case 0:
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedEvaluationOverallHazards' , { is_synchronized: current_is_synchronized } ) ;
            }
            break ;

            case 1:
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedEvaluationStructuralHazards' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
            }
            break ;

            case 2:
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedEvaluationNonstructuralHazards' , { mode: current_mode , is_synchronized: current_is_synchronized } ) ;
            }
            break ;

            case 3:
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsDetailedEvaluationGeotechnicalHazards' , { is_synchronized: current_is_synchronized } ) ;
            }
            break ;

            case 4:
            {
                // If a sketch already exists, we must ask to the user if the purpose is to see the existing one or create a new one (depending on the synchronization of the form)
                if( Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] )
                {
                    if( view_enabled )
                    {
                        // OptionDialog to ask user about the type of ATC-20 form desired
                        var optionDialog = Ti.UI.createOptionDialog(
                        {
                            title: L( 'atc20_detailed_evaluation_sketch_selection_title' ) ,
                            cancel: 3 ,
                            options: [ L( 'atc20_detailed_evaluation_new_sketch_msg' ) , L( 'atc20_detailed_evaluation_view_sketch_msg' ) , L( 'atc20_detailed_evaluation_delete_sketch_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                            selectedIndex: 1
                        } ) ;
                        optionDialog.addEventListener( 'click' , function( e )
                        {
                            switch( e.index )
                            {
                                case 0:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_ATC20_Sketch" } ) ;
                                }
                                break ;

                                case 1:
                                {
                                    Alloy.Globals.createAndOpenControllerExt( 'ViewDetailedEvaluationSketchView' , { image: Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] } ) ;
                                }
                                break ;

                                case 2:
                                {
                                    // The sketch will be physically deleted only after saving
                                    Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = "" ;
                                    Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "Y" ;
                                }
                                break ;
                            }
                        } ) ;
                        // Show OptionDialog about the type of ATC-20 form
                        optionDialog.show() ;
                    }
                    else
                    {
                        // The form is synchronized, the only possibility is to see the existing sketch
                        Alloy.Globals.createAndOpenControllerExt( 'ViewDetailedEvaluationSketchView' , { image: Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] } ) ;
                    }
                }
                else
                {
                    // No previous sketch exists, the user can create a new one
                    Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_ATC20_Sketch" } ) ;
                }
            }
            break ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var estimatedBuildingDamageParentView = null ;
    // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        estimatedBuildingDamageParentView = thisView ;
    }
    else
    {
        estimatedBuildingDamageParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage ;
    }

    if( current_mode == "NEPAL" )
    {
        // Remove ESTIMATED_BUILDING_DAMAGE field
        $.scrollViewDetailedEvaluation.remove( $.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage = null ;

        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.setTop( 0 ) ;
        $.tableViewATC20ModeFormsDetailedEvaluation.setTop( 70 ) ;
        $.tableViewATC20ModeFormsDetailedEvaluation.setHeight( 200 ) ;

        $.viewAppButtonSave.setTop( 280 ) ;

        // Remove row of the Sketch from the table
        $.tableViewATC20ModeFormsDetailedEvaluation.deleteRow( 4 ) ;
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
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.init( L( 'generic_estimated_building_damage_text_msg' ) , estimatedBuildingDamageValues , OnEstimatedBuildingDamage_Change , null , estimatedBuildingDamageParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.enabled( view_enabled ) ;

        if( Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] )
        {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationEstimatedBuildingDamage.set_selected_index( Alloy.Globals.ATC20ModeDetailedEvaluation["ESTIMATED_BUILDING_DAMAGE"] ) ;
        }
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.init( L( 'generic_general_comments_txt_hint' ) , OnGeneralComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["GENERAL_COMMENTS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.enabled( view_enabled ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.atc20ModeDetailedEvaluationWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationGeneralComments.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedEvaluation.open() ;
    }
    else
    {
        $.atc20ModeDetailedEvaluationWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
