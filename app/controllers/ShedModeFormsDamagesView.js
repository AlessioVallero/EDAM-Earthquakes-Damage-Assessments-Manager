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
            $.navigationWindowDamages.close() ;
        }
        else
        {
            $.shedModeDamagesWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view type click event handler
function OnTableViewShedModeFormsDamagesType_Click( e )
{
    try
    {
        if( e.index == 0 )
        {
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesTypeStructuralElements' , { is_synchronized: current_is_synchronized } ) ;
        }
        else
        {
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesTypeInfillElements' , { is_synchronized: current_is_synchronized } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view measures of emergency click event handler
function OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click( e )
{
    try
    {
        if( e.index == 0 )
        {
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesMeasuresOfEmergencyStructuralElements' , { is_synchronized: current_is_synchronized } ) ;
        }
        else if( e.index == 1 )
        {
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesMeasuresOfEmergencyInfillElements' , { is_synchronized: current_is_synchronized } ) ;
        }
        else
        {
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesMeasuresOfEmergencyDamagedOrDeficientVerticalStructureElements' , { is_synchronized: current_is_synchronized } ) ;
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
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamages.open() ;
    }
    else
    {
        $.shedModeDamagesWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
