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
            $.usersResidentsModeInfrastructureWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Ground breaks picker event handler
function OnGroundBreaks_Change( e )
{
    Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] = e.id ;
}

// Water leaks picker event handler
function OnWaterLeaks_Change( e )
{
    Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] = e.id ;
}

// Gas leaks picker event handler
function OnGasLeaks_Change( e )
{
    Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] = e.id ;
}

// Electric current operation picker event handler
function OnElectricCurrentOperation_Change( e )
{
    Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var groundBreaksParentView = null ;
    var waterLeaksParentView = null ;
    var gasLeaksParentView = null ;
    var electricCurrentOperationParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        groundBreaksParentView = mainView ;
        waterLeaksParentView = mainView ;
        gasLeaksParentView = mainView ;
        electricCurrentOperationParentView = mainView ;
    }
    else
    {
        groundBreaksParentView = $.viewGroundBreaks ;
        waterLeaksParentView = $.viewWaterLeaks ;
        gasLeaksParentView = $.viewGasLeaks ;
        electricCurrentOperationParentView = $.viewElectricCurrentOperation ;
    }
    // Init app comboboxes
    var groundBreaksValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) } ,
        2: { title: L( 'generic_i_dont_know_text_msg' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.init( L( 'generic_ground_breaks_text_msg' ) , groundBreaksValues , OnGroundBreaks_Change , null , groundBreaksParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] )
    {
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGroundBreaks.set_selected_index( Alloy.Globals.UsersResidentsModeInfrastructure["GROUND_BREAKS"] ) ;
    }

    var waterLeaksValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) } ,
        2: { title: L( 'generic_i_dont_know_text_msg' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.init( L( 'generic_water_leaks_text_msg' ) , waterLeaksValues , OnWaterLeaks_Change , null , waterLeaksParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] )
    {
        $.widgetAppComboBoxUsersResidentsModeInfrastructureWaterLeaks.set_selected_index( Alloy.Globals.UsersResidentsModeInfrastructure["WATER_LEAKS"] ) ;
    }

    var gasLeaksValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) } ,
        2: { title: L( 'generic_i_dont_know_text_msg' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.init( L( 'generic_gas_leaks_text_msg' ) , gasLeaksValues , OnGasLeaks_Change , null , gasLeaksParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] )
    {
        $.widgetAppComboBoxUsersResidentsModeInfrastructureGasLeaks.set_selected_index( Alloy.Globals.UsersResidentsModeInfrastructure["GAS_LEAKS"] ) ;
    }

    var electricCurrentOperationValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) } ,
        2: { title: L( 'generic_i_dont_know_text_msg' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.init( L( 'generic_electric_current_operation_text_msg' ) , electricCurrentOperationValues , OnElectricCurrentOperation_Change , null , electricCurrentOperationParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"] )
    {
        $.widgetAppComboBoxUsersResidentsModeInfrastructureElectricCurrentOperation.set_selected_index( Alloy.Globals.UsersResidentsModeInfrastructure["ELECTRIC_CURRENT_OPERATION"] ) ;
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
        $.usersResidentsModeInfrastructureWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
