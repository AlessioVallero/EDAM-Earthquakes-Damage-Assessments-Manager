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
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "form:save_from_section" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSectionThree.close() ;
        }
        else
        {
            $.aedesModeSectionThreeWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Coverage picker event handler
function OnCoverage_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["COVERAGE"] = e.id ;
}

// PlanAndElevation picker event handler
function OnPlanAndElevation_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] = e.id ;
}

// InfillDisposal picker event handler
function OnInfillDisposal_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] = e.id ;
}

// IsolatedColumns picker event handler
function OnIsolatedColumns_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] = e.id ;
}

// Mixed picker event handler
function OnMixed_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["MIXED"] = e.id ;
}

// Reinforced picker event handler
function OnReinforced_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["REINFORCED"] = e.id ;
}

// ReinforcedConcreteFrames checkbox event handler
function OnReinforcedConcreteFrames_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.get_value() ;
}

// ReinforcedConcreteWalls checkbox event handler
function OnReinforcedConcreteWalls_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.get_value() ;
}

// SteelFrames checkbox event handler
function OnSteelFrames_Change( e )
{
    Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.get_value() ;
}

// Table view masonry structures click event handler
function OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click( e )
{
    try
    {
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionThreeMasonryStructures' , { masonry_structure_id: e.index , father_title: e.row.children[0].text , is_synchronized: current_is_synchronized } ) ;
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
    var coverageParentView = null ;
    var planAndElevationParentView = null ;
    var infillDisposalParentView = null ;
    var isolatedColumnsParentView = null ;
    var mixedParentView = null ;
    var reinforcedView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        coverageParentView = mainView ;
        planAndElevationParentView = mainView ;
        infillDisposalParentView = mainView ;
        isolatedColumnsParentView = mainView ;
        mixedParentView = mainView ;
        reinforcedView = mainView ;
    }
    else
    {
        coverageParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeCoverage ;
        planAndElevationParentView = $.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation ;
        infillDisposalParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal ;
        isolatedColumnsParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns ;
        mixedParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeMixed ;
        reinforcedView = $.viewAppComboBoxAeDESModeFormsSectionThreeReinforced ;
    }
    // Init app comboboxes
    var coverageValues =
    {
        0: { title: L( 'generic_coverage_pushing_heavy' ) } ,
        1: { title: L( 'generic_coverage_not_pushing_heavy' ) } ,
        2: { title: L( 'generic_coverage_pushing_light' ) } ,
        3: { title: L( 'generic_coverage_not_pushing_light' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.init( L( 'generic_coverage_text_msg' ) , coverageValues , OnCoverage_Change , null , coverageParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["COVERAGE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.set_selected_index( Alloy.Globals.AeDESModeSectionThree["COVERAGE"] ) ;
    }

    var planAndElevationValues =
    {
        0: { title: L( 'generic_plan_and_elevation_not_regular' ) } ,
        1: { title: L( 'generic_plan_and_elevation_regular' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.init( L( 'generic_plan_and_elevation_text_msg' ) , planAndElevationValues , OnPlanAndElevation_Change , null , planAndElevationParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.set_selected_index( Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] ) ;
    }

    var infillDisposalValues =
    {
        0: { title: L( 'generic_infill_disposal_not_regular' ) } ,
        1: { title: L( 'generic_infill_disposal_regular' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.init( L( 'generic_infill_disposal_text_msg' ) , infillDisposalValues , OnInfillDisposal_Change , null , infillDisposalParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.set_selected_index( Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] ) ;
    }

    var isolatedColumnsValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.init( L( 'generic_isolated_columns_text_msg' ) , isolatedColumnsValues , OnIsolatedColumns_Change , null , isolatedColumnsParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.set_selected_index( Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] ) ;
    }

    var mixedValues =
    {
        0: { title: L( 'generic_no_msg' ) } ,
        1: { title: 'G1' } ,
        2: { title: 'G2' } ,
        3: { title: 'G3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.init( L( 'generic_mixed_text_msg' ) , mixedValues , OnMixed_Change , null , mixedParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["MIXED"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.set_selected_index( Alloy.Globals.AeDESModeSectionThree["MIXED"] ) ;
    }

    var reinforcedValues =
    {
        0: { title: L( 'generic_no_msg' ) } ,
        1: { title: 'H1' } ,
        2: { title: 'H2' } ,
        3: { title: 'H3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.init( L( 'generic_reinforced_text_msg' ) , reinforcedValues , OnReinforced_Change , null , reinforcedView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionThree["REINFORCED"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.set_selected_index( Alloy.Globals.AeDESModeSectionThree["REINFORCED"] ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.init( L( 'generic_reinforced_concrete_frames_text_msg' ) , Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] , OnReinforcedConcreteFrames_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.init( L( 'generic_reinforced_concrete_walls_text_msg' ) , Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] , OnReinforcedConcreteWalls_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.init( L( 'generic_steel_frames_text_msg' ) , Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] , OnSteelFrames_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionThree.open() ;
    }
    else
    {
        $.aedesModeSectionThreeWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
