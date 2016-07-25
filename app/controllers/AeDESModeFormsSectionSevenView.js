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
            $.navigationWindowSectionSeven.close() ;
        }
        else
        {
            $.aedesModeSectionSevenWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// MorphologySite picker event handler
function OnMorphologySite_Change( e )
{
    Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] = e.id ;
}

// SlopesLooming picker event handler
function OnSlopesLooming_Change( e )
{
    Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] = e.id ;
}

// Subsoil picker event handler
function OnSubsoil_Change( e )
{
    Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var morphologySiteParentView = null ;
    var slopesLoomingParentView = null ;
    var subsoilParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        morphologySiteParentView = mainView ;
        slopesLoomingParentView = mainView ;
        subsoilParentView = mainView ;
    }
    else
    {
        morphologySiteParentView = $.viewAppComboBoxAeDESModeFormsSectionSevenMorphologySite ;
        slopesLoomingParentView = $.viewAppComboBoxAeDESModeFormsSectionSevenSlopesLooming ;
        subsoilParentView = $.viewAppComboBoxAeDESModeFormsSectionSevenSubsoil ;
    }
    // Init app comboboxes
    var morphologySite =
    {
        0: { title: L( 'generic_morphology_site_plain' ) } ,
        1: { title: L( 'generic_morphology_site_slight_slope' ) } ,
        2: { title: L( 'generic_morphology_site_strong_slope' ) } ,
        3: { title: L( 'generic_morphology_site_crest' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.init( L( 'generic_morphology_site_text_msg' ) , morphologySite , OnMorphologySite_Change , null , morphologySiteParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionSevenMorphologySite.set_selected_index( Alloy.Globals.AeDESModeSectionSeven["MORPHOLOGY_SITE"] ) ;
    }

    var slopesLoomingValues =
    {
        0: { title: L( 'generic_slopes_looming_absent' ) } ,
        1: { title: L( 'generic_slopes_looming_generated_by_the_earthquake' ) } ,
        2: { title: L( 'generic_slopes_looming_exacerbated_by_the_earthquake' ) } ,
        3: { title: L( 'generic_slopes_looming_pre_existing' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.init( L( 'generic_slopes_looming_text_msg' ) , slopesLoomingValues , OnSlopesLooming_Change , null , slopesLoomingParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSlopesLooming.set_selected_index( Alloy.Globals.AeDESModeSectionSeven["SLOPES_LOOMING"] ) ;
    }

    var subsoilValues =
    {
        0: { title: L( 'generic_subsoil_absent' ) } ,
        1: { title: L( 'generic_subsoil_generated_by_the_earthquake' ) } ,
        2: { title: L( 'generic_subsoil_exacerbated_by_the_earthquake' ) } ,
        3: { title: L( 'generic_subsoil_pre_existing' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.init( L( 'generic_subsoil_text_msg' ) , subsoilValues , OnSubsoil_Change , null , subsoilParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionSevenSubsoil.set_selected_index( Alloy.Globals.AeDESModeSectionSeven["SUBSOIL"] ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionSeven.open() ;
    }
    else
    {
        $.aedesModeSectionSevenWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
