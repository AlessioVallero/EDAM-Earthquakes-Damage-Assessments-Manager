var args = arguments[0] || {};
var current_communication = args.communication ;
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
            $.navigationWindowLifelinesCommunication.close() ;
        }
        else
        {
            $.baeaModeLifelinesCommunicationWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TelephoneTelegraphMobilePhone checkbox event handler
function OnTelephoneTelegraphMobilePhone_Change( e )
{
    try
    {
        current_communication = Alloy.Globals.replaceCharAt( 0 , current_communication , $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:communication_changed' , { value: current_communication } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// RadioAndTelevision checkbox event handler
function OnRadioAndTelevision_Change( e )
{
    try
    {
        current_communication = Alloy.Globals.replaceCharAt( 1 , current_communication , $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:communication_changed' , { value: current_communication } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// NewspaperAndMagazines checkbox event handler
function OnNewspaperAndMagazines_Change( e )
{
    try
    {
        current_communication = Alloy.Globals.replaceCharAt( 2 , current_communication , $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.get_value() ) ;

        Ti.App.fireEvent( 'baea_mode_lifelines:communication_changed' , { value: current_communication } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.init( L( 'generic_telephone_telegraph_mobilephone_text_msg' ) , current_communication.charAt( 0 ) , OnTelephoneTelegraphMobilePhone_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationTelephoneTelegraphMobilePhone.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.init( L( 'generic_radio_and_television_text_msg' ) , current_communication.charAt( 1 ) , OnRadioAndTelevision_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationRadioAndTelevision.enabled( view_enabled ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.init( L( 'generic_newspaper_and_magazines_text_msg' ) , current_communication.charAt( 2 ) , OnNewspaperAndMagazines_Change ) ;
    $.widgetAppCheckBoxBAEAModeFormsLifelinesCommunicationNewspaperAndMagazines.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLifelinesCommunication.open() ;
    }
    else
    {
        $.baeaModeLifelinesCommunicationWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
