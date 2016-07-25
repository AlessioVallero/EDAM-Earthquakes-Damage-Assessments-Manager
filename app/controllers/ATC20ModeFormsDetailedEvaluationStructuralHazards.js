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
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDetailedEvaluationStructuralHazards.close() ;
        }
        else
        {
            $.atc20ModeDetailedEvaluationStructuralHazardsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Foundations picker event handler
function OnFoundations_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 3 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// RoofsFloors picker event handler
function OnRoofsFloors_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 4 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ColumnsPilastersCorbels picker event handler
function OnColumnsPilastersCorbels_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 5 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DiaphragmsHorizontalBracing picker event handler
function OnDiaphragmsHorizontalBracing_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 6 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// WallsVerticalBracing picker event handler
function OnWallsVerticalBracing_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 7 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PrecastConnections picker event handler
function OnPrecastConnections_Change( e )
{
    try
    {
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 8 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
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
        var newStructuralHazardsValue = Alloy.Globals.replaceCharAt( 9 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newStructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OtherName textfield change event handler
function OnOtherName_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.get_text_value() ;
}

// Comments textfield change event handler
function OnComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.get_text_value() ;
}

try
{
    var structuralHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ;
    // Init controls
    var foundationsParentView = null ;
    var roofsFloorsParentView = null ;
    var columnsPilastersCorbelsParentView = null ;
    var diaphragmsHorizontalBracingParentView = null ;
    var wallsVerticalBracingParentView = null ;
    var precastConnectionsParentView = null ;
    var otherParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        foundationsParentView = mainView ;
        roofsFloorsParentView = mainView ;
        columnsPilastersCorbelsParentView = mainView ;
        diaphragmsHorizontalBracingParentView = mainView ;
        wallsVerticalBracingParentView = mainView ;
        precastConnectionsParentView = mainView ;
        otherParentView = mainView ;
    }
    else
    {
        foundationsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations ;
        roofsFloorsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors ;
        columnsPilastersCorbelsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels ;
        diaphragmsHorizontalBracingParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing ;
        wallsVerticalBracingParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing ;
        precastConnectionsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections ;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther ;
    }
    // Init app comboboxes
    var foundationsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.init( L( 'generic_foundations_text_msg' ) , foundationsValues , OnFoundations_Change , null , foundationsParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.enabled( view_enabled ) ;

    var roofsFloorsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.init( L( 'generic_roofs_floors_text_msg' ) , roofsFloorsValues , OnRoofsFloors_Change , null , roofsFloorsParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.enabled( view_enabled ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.set_label_height( 80 ) ;

    var columnsPilastersCorbelsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.init( L( 'generic_columns_pilasters_corbels_text_msg' ) , columnsPilastersCorbelsValues , OnColumnsPilastersCorbels_Change , null , columnsPilastersCorbelsParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.enabled( view_enabled ) ;

    var diaphragmsHorizontalBracingValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.enabled( view_enabled ) ;

    var precastConnectionsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.enabled( view_enabled ) ;

    if( current_mode == "CA" )
    {
        var wallsVerticalBracingValues =
        {
            0: { title: L( 'generic_minor_none_text_msg' ) } ,
            1: { title: L( 'generic_moderate_text_msg' ) } ,
            2: { title: L( 'generic_severe_text_msg' ) }
        } ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.init( L( 'generic_walls_vertical_bracing_text_msg' ) , wallsVerticalBracingValues , OnWallsVerticalBracing_Change , null , wallsVerticalBracingParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.enabled( view_enabled ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.init( L( 'generic_precast_connections_text_msg' ) , precastConnectionsValues , OnPrecastConnections_Change , null , precastConnectionsParentView ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.init( L( 'generic_diaphragms_horizontal_bracing_text_msg' ) , diaphragmsHorizontalBracingValues , OnDiaphragmsHorizontalBracing_Change , null , diaphragmsHorizontalBracingParentView ) ;
    }
    else if( current_mode == "NZ" )
    {
        // REMOVE WallsVerticalBracing
        $.scrollViewDetailedEvaluationStructuralHazards.remove( $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing = null ;

        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.setTop( 310 ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.setTop( 380 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.setTop( 450 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.setTop( 520 ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.init( L( 'generic_precast_connections_text_msg' ) , precastConnectionsValues , OnPrecastConnections_Change , null , precastConnectionsParentView ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.init( L( 'generic_diaphragms_horizontal_bracing_text_msg' ) , diaphragmsHorizontalBracingValues , OnDiaphragmsHorizontalBracing_Change , null , diaphragmsHorizontalBracingParentView ) ;
    }
    else if( current_mode == "NEPAL" )
    {
        var wallsVerticalBracingValues =
        {
            0: { title: L( 'generic_minor_none_text_msg' ) } ,
            1: { title: L( 'generic_moderate_text_msg' ) } ,
            2: { title: L( 'generic_severe_text_msg' ) }
        } ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.init( L( 'generic_walls_vertical_bracing_text_msg' ) , wallsVerticalBracingValues , OnWallsVerticalBracing_Change , null , wallsVerticalBracingParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.enabled( view_enabled ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.init( L( 'generic_rabsel_text_msg' ) , precastConnectionsValues , OnPrecastConnections_Change , null , precastConnectionsParentView ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.init( L( 'generic_roofs_supports_text_msg' ) , diaphragmsHorizontalBracingValues , OnDiaphragmsHorizontalBracing_Change , null , diaphragmsHorizontalBracingParentView ) ;
    }

    var otherValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.init( L( 'generic_other_text_msg' ) , otherValues , OnOther_Change , null , otherParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.enabled( view_enabled ) ;

    if( structuralHazardsValue )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsFoundations.set_selected_index( structuralHazardsValue.charAt( 3 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsRoofsFloors.set_selected_index( structuralHazardsValue.charAt( 4 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsColumnsPilastersCorbels.set_selected_index( structuralHazardsValue.charAt( 5 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsDiaphragmsHorizontalBracing.set_selected_index( structuralHazardsValue.charAt( 6 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsWallsVerticalBracing.set_selected_index( structuralHazardsValue.charAt( 7 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsPrecastConnections.set_selected_index( structuralHazardsValue.charAt( 8 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationStructuralHazardsOther.set_selected_index( structuralHazardsValue.charAt( 9 ) ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.init( L( 'generic_other_text_msg' ) , OnOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_OTHER"] ) ;

    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.init( L( 'generic_comments_text_msg' ) , OnComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["STRUCTURAL_HAZARDS_COMMENTS"] ) ;

    RegisterHideKeyboard( $.atc20ModeDetailedEvaluationStructuralHazardsWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsOtherName.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationStructuralHazardsComments.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedEvaluationStructuralHazards.open() ;
    }
    else
    {
        $.atc20ModeDetailedEvaluationStructuralHazardsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
