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
            $.navigationWindowDetailedEvaluationNonstructuralHazards.close() ;
        }
        else
        {
            $.atc20ModeDetailedEvaluationNonstructuralHazardsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ParapetsOrnamentation picker event handler
function OnParapetsOrnamentation_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 10 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// CladdingGlazing picker event handler
function OnCladdingGlazing_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 11 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// CeilingsLightFixtures picker event handler
function OnCeilingsLightFixtures_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 12 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// InteriorWallsPartitions picker event handler
function OnInteriorWallsPartitions_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 13 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Elevators picker event handler
function OnElevators_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 14 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// StairsExits picker event handler
function OnStairsExits_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 15 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ElectricGas picker event handler
function OnElectricGas_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 16 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// SignificantFireSafetyConcerns picker event handler
function OnSignificantFireSafetyConcerns_Change( e )
{
    try
    {
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 17 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
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
        var newNonstructuralHazardsValue = Alloy.Globals.replaceCharAt( 18 , Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] , e.id ) ;
        Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] = newNonstructuralHazardsValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// OtherName textfield change event handler
function OnOtherName_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.get_text_value() ;
}

// Comments textfield change event handler
function OnComments_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] = $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.get_text_value() ;
}

try
{
    var nonstructuralHazardsValue = Alloy.Globals.ATC20ModeDetailedEvaluation["EVALUATION"] ;
    // Init controls
    var parapetsOrnamentationParentView = null ;
    var claddingGlazingParentView = null ;
    var ceilingsLightFixturesParentView = null ;
    var interiorWallsPartitionsParentView = null ;
    var elevatorsParentView = null ;
    var stairsExitsParentView = null ;
    var electricGasParentView = null ;
    var significantFireSafetyConcernsParentView = null ;
    var otherParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        parapetsOrnamentationParentView = mainView ;
        claddingGlazingParentView = mainView ;
        ceilingsLightFixturesParentView = mainView ;
        interiorWallsPartitionsParentView = mainView ;
        elevatorsParentView = mainView ;
        stairsExitsParentView = mainView ;
        electricGasParentView = mainView ;
        significantFireSafetyConcernsParentView = mainView ;
        otherParentView = mainView ;
    }
    else
    {
        parapetsOrnamentationParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation ;
        claddingGlazingParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing ;
        ceilingsLightFixturesParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures ;
        interiorWallsPartitionsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions ;
        elevatorsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators ;
        stairsExitsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits ;
        electricGasParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas ;
        significantFireSafetyConcernsParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns ;
        otherParentView = $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther ;
    }
    // Init app comboboxes
    var parapetsOrnamentationValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.init( L( 'generic_parapets_ornamentation_text_msg' ) , parapetsOrnamentationValues , OnParapetsOrnamentation_Change , null , parapetsOrnamentationParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.enabled( view_enabled ) ;

    var claddingGlazingValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.init( L( 'generic_cladding_glazing_text_msg' ) , claddingGlazingValues , OnCladdingGlazing_Change , null , claddingGlazingParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.enabled( view_enabled ) ;

    var ceilingsLightFixturesValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.init( L( 'generic_ceilings_light_fixtures_text_msg' ) , ceilingsLightFixturesValues , OnCeilingsLightFixtures_Change , null , ceilingsLightFixturesParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.enabled( view_enabled ) ;

    var interiorWallsPartitionsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.enabled( view_enabled ) ;

    var elevatorsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.init( L( 'generic_elevators_text_msg' ) , elevatorsValues , OnElevators_Change , null , elevatorsParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.enabled( view_enabled ) ;

    var stairsExitsValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.init( L( 'generic_stairs_exits_text_msg' ) , stairsExitsValues , OnStairsExits_Change , null , stairsExitsParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.enabled( view_enabled ) ;

    var electricGasValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.init( L( 'generic_electric_gas_text_msg' ) , electricGasValues , OnElectricGas_Change , null , electricGasParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.enabled( view_enabled ) ;

    if( current_mode == "CA" )
    {
        // REMOVE SignificantFireSafetyConcerns
        $.scrollViewDetailedEvaluationNonstructuralHazards.remove( $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = null ;

        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.setTop( 490 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.setTop( 560 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.setTop( 630 ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init( L( 'generic_interior_walls_partitions_text_msg' ) , interiorWallsPartitionsValues , OnInteriorWallsPartitions_Change , null , interiorWallsPartitionsParentView ) ;
    }
    else if( current_mode == "NZ" )
    {
        var significantFireSafetyConcernsValues =
        {
            0: { title: L( 'generic_minor_none_text_msg' ) } ,
            1: { title: L( 'generic_moderate_text_msg' ) } ,
            2: { title: L( 'generic_severe_text_msg' ) }
        } ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.init( L( 'generic_significant_fire_safety_concerns_text_msg' ) , significantFireSafetyConcernsValues , OnSignificantFireSafetyConcerns_Change , null , significantFireSafetyConcernsParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.enabled( view_enabled ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init( L( 'generic_interior_walls_partitions_text_msg' ) , interiorWallsPartitionsValues , OnInteriorWallsPartitions_Change , null , interiorWallsPartitionsParentView ) ;
    }
    else if( current_mode == "NEPAL" )
    {
        // REMOVE SignificantFireSafetyConcerns
        $.scrollViewDetailedEvaluationNonstructuralHazards.remove( $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns = null ;

        // REMOVE Elevator
        $.scrollViewDetailedEvaluationNonstructuralHazards.remove( $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators = null ;

        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.setTop( 280 ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.setTop( 350 ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.setTop( 420 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.setTop( 490 ) ;
        $.viewAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.setTop( 560 ) ;

        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.init( L( 'generic_brick_infill_partitions_text_msg' ) , interiorWallsPartitionsValues , OnInteriorWallsPartitions_Change , null , interiorWallsPartitionsParentView ) ;
    }

    var otherValues =
    {
        0: { title: L( 'generic_minor_none_text_msg' ) } ,
        1: { title: L( 'generic_moderate_text_msg' ) } ,
        2: { title: L( 'generic_severe_text_msg' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.init( L( 'generic_other_text_msg' ) , otherValues , OnOther_Change , null , otherParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.enabled( view_enabled ) ;

    if( nonstructuralHazardsValue )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsParapetsOrnamentation.set_selected_index( nonstructuralHazardsValue.charAt( 10 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCladdingGlazing.set_selected_index( nonstructuralHazardsValue.charAt( 11 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsCeilingsLightFixtures.set_selected_index( nonstructuralHazardsValue.charAt( 12 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsInteriorWallsPartitions.set_selected_index( nonstructuralHazardsValue.charAt( 13 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElevators.set_selected_index( nonstructuralHazardsValue.charAt( 14 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsStairsExits.set_selected_index( nonstructuralHazardsValue.charAt( 15 ) ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsElectricGas.set_selected_index( nonstructuralHazardsValue.charAt( 16 ) ) ;
        if( current_mode == "NZ" )
        {
            $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsSignificantFireSafetyConcerns.set_selected_index( nonstructuralHazardsValue.charAt( 17 ) ) ;
        }
        $.widgetAppComboBoxATC20ModeFormsDetailedEvaluationNonstructuralHazardsOther.set_selected_index( nonstructuralHazardsValue.charAt( 18 ) ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.init( L( 'generic_other_text_msg' ) , OnOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_OTHER"] ) ;

    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.init( L( 'generic_comments_text_msg' ) , OnComments_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.set_text_value( Alloy.Globals.ATC20ModeDetailedEvaluation["NONSTRUCTURAL_HAZARDS_COMMENTS"] ) ;

    RegisterHideKeyboard( $.atc20ModeDetailedEvaluationNonstructuralHazardsWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsOtherName.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsDetailedEvaluationNonstructuralHazardsComments.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedEvaluationNonstructuralHazards.open() ;
    }
    else
    {
        $.atc20ModeDetailedEvaluationNonstructuralHazardsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
