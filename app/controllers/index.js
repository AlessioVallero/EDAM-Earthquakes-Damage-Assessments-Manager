// Array of controls to disable/enable during a busy state
var controls = new Array() ;

controls.push( $.btn_users_residents_mode ) ;
controls.push( $.btn_professional_mode ) ;
controls.push( $.widgetAppButtonHelp.get_button() ) ;
controls.push( $.widgetAppButtonTools.get_button() ) ;

function ManageOpening( controller_name , index )
{
    EndAsyncBusyAction( $.activity_indicator , controls ) ;

    if( index == 0 )
    {
        switch( controller_name )
        {
            case 'UsersResidentsModeForms':
            {
                Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , OpenUsersResidentsMode ) ;
            }
            break ;

            case 'ProfessionalModeView':
            {
                Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , OpenProfessionalMode ) ;
            }
            break ;
        }

        Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
    }
    else
    {
        // Clicked "NO"
        Alloy.Globals.createAndOpenControllerExt( controller_name ) ;
    }
}

function OpenMode( controller_name )
{
    try
    {
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            Alloy.Globals.ResetSession() ;
            // Offline mode
            Alloy.Globals.createAndOpenControllerExt( controller_name ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                // If a local session exist, we will ask to the server if it's still valid
                if( Alloy.Globals.ExistSession() )
                {
                    var loader = Titanium.Network.createHTTPClient() ;
                    loader.validatesSecureCertificate = false ;

                    // Runs the function when the data is ready for us to process
                    loader.onload = function() 
                    {
                        if( this.responseText == "Expired" )
                        {
                            Alloy.Globals.ResetSession() ;

                            // AlertDialog to ask user about authentication
                            var alertDialog = Titanium.UI.createAlertDialog(
                            {
                                title: L( 'generic_need_authentication_title' ) ,
                                message: L( 'authentication_confirm_msg' ) ,             
                                buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                                cancel: 1
                            } ) ;
                            alertDialog.addEventListener( 'click' , function( e )
                            {
                                ManageOpening( controller_name , e.index ) ;
                            } ) ;
                            // Show alert message about authentication
                            alertDialog.show() ;
                        }
                        else
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls ) ;

                            Alloy.Globals.createAndOpenControllerExt( controller_name ) ;
                        }
                    } ;
                     // Function called when an error occurs, including a timeout
                    loader.onerror = function( e )
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls ) ;

                        // AlertDialog to ask user about authentication
                        var alertDialog = Titanium.UI.createAlertDialog(
                        {
                            title: L( 'generic_connection_problem_occurred_title' ) ,
                            message: L( 'connection_problem_occurred_text_msg' ) ,             
                            buttonNames: [ L( 'generic_not_authenticated_msg' ) , L( 'generic_retry_msg' ) ] ,
                            cancel: 1
                        } ) ;
                        alertDialog.addEventListener( 'click' , function( event )
                        {
                            if( event.index == 0 )
                            {
                                Alloy.Globals.ResetSession() ;
                                Alloy.Globals.createAndOpenControllerExt( controller_name ) ;
                            }
                            else
                            {
                                // Clicked "Retry"
                                OpenMode( controller_name ) ;
                            }
                        } ) ;
                        // Show alert message about authentication
                        alertDialog.show() ;
                    } ;

                    var params =
                    {
                        // Key
                        key: "EDAM" ,
                        // Session ID
                        SID: Alloy.Globals.SessionId ,
                        // Echo enabled
                        ECHO_ENABLED: true
                    } ;

                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs ;
                    loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php" ) ;

                    loader.send( params ) ;
                }
                else
                {
                    // AlertDialog to ask user about authentication
                    var alertDialog = Titanium.UI.createAlertDialog(
                    {
                        title: L( 'generic_need_authentication_title' ) ,
                        message: L( 'authentication_confirm_msg' ) ,             
                        buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                        cancel: 1
                    } ) ;
                    alertDialog.addEventListener( 'click' , function( e )
                    {
                        ManageOpening( controller_name , e.index ) ;
                    } ) ;
                    // Show alert message about authentication
                    alertDialog.show() ;
                }

                return bRet ;
            } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Open the UsersResidentsModeForms
function OpenUsersResidentsMode( e )
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , OpenUsersResidentsMode ) ;
    // Controller creation for the next View
    Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeForms' ) ;
}

// Open the ProfessionalModeView
function OpenProfessionalMode( e )
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , OpenProfessionalMode ) ;
    // Controller creation for the next View
    Alloy.Globals.createAndOpenControllerExt( 'ProfessionalModeView' ) ;
}

// UsersResidentsMode button click event handler
function OnBtnUsersResidentsMode_Click( e )
{
    OpenMode( 'UsersResidentsModeForms' ) ;
}

// ProfessionalMode button click event handler
function OnBtnProfessionalMode_Click( e )
{
    OpenMode( 'ProfessionalModeView' ) ;
}

// Retranslate this View
function RetranslateUI( e )
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "language:changed_propagation" , RetranslateUI ) ;

    $.lblChooseMode.setText( L( 'main_choose_mode' ) ) ;
    $.lblDevelopedBy.setText( L( 'main_developed_by' ) ) ;
    $.btn_users_residents_mode.setTitle( L( 'main_users_residents_mode' ) ) ;
    $.btn_professional_mode.setTitle( L( 'main_professional_mode' ) ) ;
    $.widgetAppButtonHelp.set_label_text( L( 'generic_app_help_title' ) ) ;
    $.widgetAppButtonTools.set_label_text( L( 'generic_tools_title' ) ) ;
}

// Help button click event handler
function OnBtnHelp_Click( e )
{
    try
    {
        Alloy.Globals.createAndOpenControllerExt( 'HelpView' ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Tools button click event handler
function OnBtnTools_Click( e )
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "language:changed_propagation" , RetranslateUI ) ;

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            Alloy.Globals.createAndOpenControllerExt( 'ToolsView' , { is_logged: false } ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                // If a local session exist, we will ask to the server if it's still valid
                if( Alloy.Globals.ExistSession() )
                {
                    var loader = Titanium.Network.createHTTPClient() ;
                    loader.validatesSecureCertificate = false ;

                    // Runs the function when the data is ready for us to process
                    loader.onload = function() 
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls ) ;

                        if( this.responseText == "Expired" )
                        {
                            Alloy.Globals.ResetSession() ;

                            Alloy.Globals.createAndOpenControllerExt( 'ToolsView' , { is_logged: false } ) ;
                        }
                        else
                        {
                            Alloy.Globals.createAndOpenControllerExt( 'ToolsView' , { is_logged: true } ) ;
                        }
                    } ;
                     // Function called when an error occurs, including a timeout
                    loader.onerror = function( e )
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls ) ;

                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                    } ;

                    var params =
                    {
                        // Key
                        key: "EDAM" ,
                        // Session ID
                        SID: Alloy.Globals.SessionId ,
                        // Echo enabled
                        ECHO_ENABLED: true
                    } ;

                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs ;
                    loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php" ) ;

                    loader.send( params ) ;
                }
                else
                {
                    EndAsyncBusyAction( $.activity_indicator , controls ) ;

                    Alloy.Globals.createAndOpenControllerExt( 'ToolsView' , { is_logged: false } ) ;
                }

                return bRet ;
            } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Init app buttons
    $.widgetAppButtonHelp.init( '/images/app_help_normal.png' , '/images/app_help_pressed.png' , '/images/app_help_disabled.png' , L( 'generic_app_help_title' ) , OnBtnHelp_Click ) ;
    $.widgetAppButtonTools.init( '/images/tools_normal.png' , '/images/tools_pressed.png' , '/images/tools_disabled.png' , L( 'generic_tools_title' ) , OnBtnTools_Click ) ;

    // Window opening
    $.mainWindow.open() ;
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
