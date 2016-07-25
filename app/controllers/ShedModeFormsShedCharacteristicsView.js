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
            $.navigationWindowShedCharacteristics.close() ;
        }
        else
        {
            $.shedModeShedCharacteristicsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Site picker event handler
function OnSite_Change( e )
{
    Alloy.Globals.ShedModeShedCharacteristics["SITE"] = e.id ;
}

// NotUndergroundPlansNo picker event handler
function OnNotUndergroundPlansNo_Change( e )
{
    Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] = e.id ;
}

// Usage picker event handler
function OnUsage_Change( e )
{
    Alloy.Globals.ShedModeShedCharacteristics["USAGE"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var siteParentView = null ;
    var notUndergroundPlansNoParentView = null ;
    var usageParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        siteParentView = mainView ;
        notUndergroundPlansNoParentView = mainView ;
        usageParentView = mainView ;
    }
    else
    {
        siteParentView = $.viewSite ;
        notUndergroundPlansNoParentView = $.viewNotUndergroundPlansNo ;
        usageParentView = $.viewUsage ;
    }
    // Init app comboboxes
    var siteValues =
    {
        0: { title: L( 'generic_site_lowland' ) } ,
        1: { title: L( 'generic_site_relief' ) } ,
        2: { title: L( 'generic_site_slope' ) } ,
        3: { title: L( 'generic_site_valley' ) }
    } ;
    $.widgetAppComboBoxShedModeShedCharacteristicsSite.init( L( 'generic_site_text_msg' ) , siteValues , OnSite_Change , null , siteParentView ) ;
    $.widgetAppComboBoxShedModeShedCharacteristicsSite.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeShedCharacteristics["SITE"] )
    {
        $.widgetAppComboBoxShedModeShedCharacteristicsSite.set_selected_index( Alloy.Globals.ShedModeShedCharacteristics["SITE"] ) ;
    }

    var notUndergroundPlansNoValues =
    {
        0: { title: '1' } ,
        1: { title: '2' } ,
        2: { title: '>=3' }
    } ;
    $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.init( L( 'generic_not_underground_plans_no_text_msg' ) , notUndergroundPlansNoValues , OnNotUndergroundPlansNo_Change , null , notUndergroundPlansNoParentView ) ;
    $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] )
    {
        $.widgetAppComboBoxShedModeShedCharacteristicsNotUndergroundPlansNo.set_selected_index( Alloy.Globals.ShedModeShedCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ) ;
    }

    var usageValues =
    {
        0: { title: L( 'generic_productive_text_msg' ) } ,
        1: { title: L( 'generic_commercial_text_msg' ) } ,
        2: { title: L( 'generic_deposit_text_msg' ) } ,
        3: { title: L( 'generic_other_text_msg' ) }
    } ;
    $.widgetAppComboBoxShedModeShedCharacteristicsUsage.init( L( 'generic_usage_text_msg' ) , usageValues , OnUsage_Change , null , usageParentView ) ;
    $.widgetAppComboBoxShedModeShedCharacteristicsUsage.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeShedCharacteristics["USAGE"] )
    {
        $.widgetAppComboBoxShedModeShedCharacteristicsUsage.set_selected_index( Alloy.Globals.ShedModeShedCharacteristics["USAGE"] ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowShedCharacteristics.open() ;
    }
    else
    {
        $.shedModeShedCharacteristicsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
