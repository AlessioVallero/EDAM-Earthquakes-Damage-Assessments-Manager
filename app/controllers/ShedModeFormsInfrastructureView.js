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
            $.navigationWindowInfrastructure.close() ;
        }
        else
        {
            $.shedModeInfrastructureWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Primary girders picker event handler
function OnPrimaryGirders_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] = e.id ;
}

// Thickness of the tiles picker event handler
function OnThicknessOfTheTiles_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] = e.id ;
}

// Typical lights picker event handler
function OnTypicalLights_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] = e.id ;
}

// Coverage picker event handler
function OnCoverage_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["COVERAGE"] = e.id ;
}

// Inclination of the roof picker event handler
function OnInclinationOfTheRoof_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] = e.id ;
}

// Infill elements picker event handler
function OnInfillElements_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] = e.id ;
}

// Vertical walls picker event handler
function OnVerticalWalls_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] = e.id ;
}

// Shelving picker event handler
function OnShelving_Change( e )
{
    Alloy.Globals.ShedModeInfrastructure["SHELVING"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var primaryGirdersParentView = null ;
    var thicknessOfTheTilesParentView = null ;
    var typicalLightsParentView = null ;
    var coverageParentView = null ;
    var inclinationOfTheRoofParentView = null ;
    var infillElementsParentView = null ;
    var verticalWallsParentView = null ;
    var shelvingParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        primaryGirdersParentView = mainView ;
        thicknessOfTheTilesParentView = mainView ;
        typicalLightsParentView = mainView ;
        coverageParentView = mainView ;
        inclinationOfTheRoofParentView = mainView ;
        infillElementsParentView = mainView ;
        verticalWallsParentView = mainView ;
        shelvingParentView = mainView ;
    }
    else
    {
        primaryGirdersParentView = $.viewPrimaryGirders ;
        thicknessOfTheTilesParentView = $.viewThicknessOfTheTiles ;
        typicalLightsParentView = $.viewTypicalLights ;
        coverageParentView = $.viewCoverage ;
        inclinationOfTheRoofParentView = $.viewInclinationOfTheRoof ;
        infillElementsParentView = $.viewInfillElements ;
        verticalWallsParentView = $.viewVerticalWalls ;
        shelvingParentView = $.viewShelving ;
    }
    // Init app comboboxes
    var primaryGirdersValues =
    {
        0: { title: L( 'generic_inverted_t_text_msg' ) } ,
        1: { title: 'L' } ,
        2: { title: L( 'generic_parallel_borders_text_msg' ) } ,
        3: { title: L( 'generic_other_text_msg' ) }
    } ;
    $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.init( L( 'generic_primary_girders_text_msg' ) , primaryGirdersValues , OnPrimaryGirders_Change , null , primaryGirdersParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] )
    {
        $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.set_selected_index( Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] ) ;
    }

    var thicknessOfTheTilesValues =
    {
        0: { title: '<=5cm' } ,
        1: { title: '6cm' } ,
        2: { title: '7cm' } ,
        3: { title: '8cm' } ,
        4: { title: '9cm' } ,
        5: { title: '>=10cm' }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.init( L( 'generic_thickness_of_the_tiles_text_msg' ) , thicknessOfTheTilesValues , OnThicknessOfTheTiles_Change , null , thicknessOfTheTilesParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.set_selected_index( Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] ) ;
    }

    var typicalLightsValues =
    {
        0: { title: '<=10cm' } ,
        1: { title: '11cm' } ,
        2: { title: '12cm' } ,
        3: { title: '13cm' } ,
        4: { title: '14cm' } ,
        5: { title: '>=15cm' }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureTypicalLights.init( L( 'generic_typical_lights_text_msg' ) , typicalLightsValues , OnTypicalLights_Change , null , typicalLightsParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureTypicalLights.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureTypicalLights.set_selected_index( Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] ) ;
    }

    var coverageValues =
    {
        0: { title: L( 'generic_ribbed_dual_slope_text_msg' ) } ,
        1: { title: L( 'generic_reinforced_concrete_slope_text_msg' ) } ,
        2: { title: L( 'generic_special_elements_skylight_text_msg' ) } ,
        3: { title: L( 'generic_special_elements_shed_configuration_text_msg' ) } ,
        4: { title: L( 'generic_ribbed_flat_roof_text_msg' ) } ,
        5: { title: L( 'generic_shed_beams_knee_text_msg' ) } ,
        6: { title: L( 'generic_shed_inclined_beams_text_msg' ) }
    } ;
    var coverageHelps =
    [
        "/images/Help/ribbed_dual_slope_coverage.png" ,
        "/images/Help/reinforced_concrete_dual_slope_coverage.png" ,
        "/images/Help/special_elements_skylight_coverage.png" ,
        "/images/Help/special_elements_shed_configuration_coverage.png" ,
        "/images/Help/ribbed_flat_roof_coverage.png" ,
        "/images/Help/shed_beam_knee_coverage.png" ,
        "/images/Help/shed_inclined_beams_coverage.png"
    ] ;
    $.widgetAppComboBoxShedModeInfrastructureCoverage.init( L( 'generic_coverage_text_msg' ) , coverageValues , OnCoverage_Change , coverageHelps , coverageParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureCoverage.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["COVERAGE"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureCoverage.set_selected_index( Alloy.Globals.ShedModeInfrastructure["COVERAGE"] ) ;
    }

    var inclinationOfTheRoofValues =
    {
        0: { title: '<=10%' } ,
        1: { title: '>=15%' }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.init( L( 'generic_inclination_of_the_roof_text_msg' ) , inclinationOfTheRoofValues , OnInclinationOfTheRoof_Change , null , inclinationOfTheRoofParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.set_selected_index( Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] ) ;
    }

    var infillElementsValues =
    {
        0: { title: L( 'generic_internal_of_pillar_text_msg' ) } ,
        1: { title:L( 'generic_external_of_pillar_text_msg' ) }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureInfillElements.init( L( 'generic_infill_elements_text_msg' ) , infillElementsValues , OnInfillElements_Change , null , infillElementsParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureInfillElements.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureInfillElements.set_selected_index( Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] ) ;
    }

    var verticalWallsValues =
    {
        0: { title: L( 'generic_masonry_blocks_text_msg' ) } ,
        1: { title: L( 'generic_vertical_prefabricated_panels_text_msg' ) } ,
        2: { title: L( 'generic_horizontal_prefabricated_panels_text_msg' ) } ,
        3: { title: L( 'generic_mixed_text_msg' ) } ,
        4: { title: L( 'generic_other_text_msg' ) }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.init( L( 'generic_vertical_walls_text_msg' ) , verticalWallsValues , OnVerticalWalls_Change , null , verticalWallsParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.set_selected_index( Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] ) ;
    }

    var shelvingValues =
    {
        0: { title: L( 'generic_indoor_sdi_text_msg' ) } ,
        1: { title:L( 'generic_sa_text_msg' ) } ,
        2: { title: L( 'generic_other_text_msg' ) }
    } ;
    $.widgetAppComboBoxShedModeInfrastructureShelving.init( L( 'generic_shelving_text_msg' ) , shelvingValues , OnShelving_Change , null , shelvingParentView ) ;
    $.widgetAppComboBoxShedModeInfrastructureShelving.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeInfrastructure["SHELVING"] )
    {
        $.widgetAppComboBoxShedModeInfrastructureShelving.set_selected_index( Alloy.Globals.ShedModeInfrastructure["SHELVING"] ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowInfrastructure.open() ;
    }
    else
    {
        $.shedModeInfrastructureWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
