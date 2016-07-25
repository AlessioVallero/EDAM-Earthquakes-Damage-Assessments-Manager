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
            $.navigationWindowBuildingCharacteristics.close() ;
        }
        else
        {
            $.usersResidentsModeBuildingCharacteristicsWindow.close() ;
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
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] = e.id ;
}

// UndergroundPlansNo picker event handler
function OnUndergroundPlansNo_Change( e )
{
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] = e.id ;
}

// NotUndergroundPlansNo picker event handler
function OnNotUndergroundPlansNo_Change( e )
{
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] = e.id ;
}

// Usage picker event handler
function OnUsage_Change( e )
{
    Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] = e.id ;
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
    var undergroundPlansNoParentView = null ;
    var notUndergroundPlansNoParentView = null ;
    var usageParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        siteParentView = thisView ;
        undergroundPlansNoParentView = thisView ;
        notUndergroundPlansNoParentView = thisView ;
        usageParentView = thisView ;
    }
    else
    {
        siteParentView = $.viewSite ;
        undergroundPlansNoParentView = $.viewUndergroundPlansNo ;
        notUndergroundPlansNoParentView = $.viewNotUndergroundPlansNo ;
        usageParentView = $.viewUsage ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;
    // Init app comboboxes
    var siteValues =
    {
        0: { title: L( 'generic_site_lowland' ) } ,
        1: { title: L( 'generic_site_relief' ) } ,
        2: { title: L( 'generic_site_slope' ) } ,
        3: { title: L( 'generic_site_valley' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.init( L( 'generic_site_text_msg' ) , siteValues , OnSite_Change , null , siteParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] )
    {
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsSite.set_selected_index( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["SITE"] ) ;
    }

    var undergroundPlansNoValues =
    {
        0: { title: '0' } ,
        1: { title: '1' } ,
        2: { title: '2' } ,
        3: { title: '>2' }
    } ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.init( L( 'generic_underground_plans_no_text_msg' ) , undergroundPlansNoValues , OnUndergroundPlansNo_Change , null , undergroundPlansNoParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] )
    {
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUndergroundPlansNo.set_selected_index( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["UNDERGROUND_PLANS_NO"] ) ;
    }

    var notUndergroundPlansNoValues =
    {
        0: { title: '0' } ,
        1: { title: '1' } ,
        2: { title: '2' } ,
        3: { title: '3' } ,
        4: { title: '4' } ,
        5: { title: '5' } ,
        6: { title: '6' } ,
        7: { title: '7' } ,
        8: { title: '8' } ,
        9: { title: '9' } ,
        10: { title: '10' } ,
        11: { title: '11' } ,
        12: { title: '12' } ,
        12: { title: '>12' }
    } ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.init( L( 'generic_not_underground_plans_no_text_msg' ) , notUndergroundPlansNoValues , OnNotUndergroundPlansNo_Change , null , notUndergroundPlansNoParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] )
    {
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsNotUndergroundPlansNo.set_selected_index( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["NOT_UNDERGROUND_PLANS_NO"] ) ;
    }

    var usageValues =
    {
        0: { title: L( 'generic_housing_text_msg' ) } ,
        1: { title: L( 'generic_productive_text_msg' ) } ,
        2: { title: L( 'generic_commercial_text_msg' ) } ,
        3: { title: L( 'generic_offices_text_msg' ) } ,
        4: { title: L( 'generic_public_services_text_msg' ) } ,
        5: { title: L( 'generic_deposit_text_msg' ) } ,
        6: { title: L( 'generic_other_text_msg' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.init( L( 'generic_usage_text_msg' ) , usageValues , OnUsage_Change , null , usageParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] )
    {
        $.widgetAppComboBoxUsersResidentsModeBuildingCharacteristicsUsage.set_selected_index( Alloy.Globals.UsersResidentsModeBuildingCharacteristics["USAGE"] ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBuildingCharacteristics.open() ;
    }
    else
    {
        $.usersResidentsModeBuildingCharacteristicsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
