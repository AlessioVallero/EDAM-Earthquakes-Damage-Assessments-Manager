var args = arguments[0] || {} ;
var current_is_logged = args.is_logged ;
 
// Array of controls to disable/enable during a busy state
var controls = new Array() ;
 
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.tableViewTools ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;
var bCanClickOnTableView = true ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
    {
        Back( { changed_propagation_event_enabled: false } ) ;
    }
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back( { changed_propagation_event_enabled: false } ) ;
}
 
// Back function
function Back( data )
{
    try
    {
        controls = null ;

        // Remove the language:changed event listener, if necessary
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "language:changed" ) ;
 
        if( data && data.changed_propagation_event_enabled )
        {
            // Fire the event language:changed_propagation to close the ToolsView
            Ti.App.fireEvent( "language:changed_propagation" ) ;
        }
        else
        {
            // Remove the language:changed_propagation event listener, if necessary
            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "language:changed_propagation" ) ;
        }

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowToolsView.close() ;
        }
        else
        {
            $.toolsViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// LoginRegisterLogout opening
function OpenLoginRegisterLogout()
{
    try
    {
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            if( current_is_logged )
            {
                // Logout
                BeginAsyncBusyAction( $.activity_indicator , controls , function()
                {
                    var loader = Titanium.Network.createHTTPClient() ;
                    loader.validatesSecureCertificate = false ;

                    // Runs the function when the data is ready for us to process
                    loader.onload = function() 
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls ) ;

                        Alloy.Globals.ResetSession() ;

                        Back() ;
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
                        SID: Alloy.Globals.SessionId
                    } ;

                    loader.timeout = Alloy.Globals.LogoutTimeoutMillisecs ;
                    loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Logout.php" ) ;

                    loader.send( params ) ;
                } ) ;
            }
            else
            {
                Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , Back ) ;
                Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// UsersLocation opening
function OpenUsersLocations()
{
    var bContinue = false ;

    if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        alert( L( 'generic_no_network_msg' ) ) ;
    }
    else
    {
        if( OS_IOS )
        {
            bContinue = true ;
        }
        else
        {
            var isGooglePlayServicesAvailable = Alloy.Globals.Map.isGooglePlayServicesAvailable() ;
            switch( isGooglePlayServicesAvailable )
            {
                case Alloy.Globals.Map.SUCCESS:
                {
                    // OK
                    bContinue = true ;
                }
                break ;
    
                case Alloy.Globals.Map.SERVICE_MISSING:
                {
                    Alloy.Globals.AlertUserAndLogAsync( L( 'google_play_service_missing_msg' ) ) ;
                }
                break ;
    
                case Alloy.Globals.Map.SERVICE_VERSION_UPDATE_REQUIRED:
                {
                    Alloy.Globals.AlertUserAndLogAsync( L( 'google_play_service_out_of_date_msg' ) ) ;
                }
                break ;
    
                case Alloy.Globals.Map.SERVICE_DISABLED:
                {
                    Alloy.Globals.AlertUserAndLogAsync( L( 'google_play_service_disabled_msg' ) ) ;
                }
                break ;
    
                case Alloy.Globals.Map.SERVICE_INVALID:
                {
                    Alloy.Globals.AlertUserAndLogAsync( L( 'google_play_service_cannot_be_authenticated_msg' ) ) ;
                }
                break ;
    
                default:
                {
                    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_unexpected_error_err_msg' ) ) ;
                }
                break ;
            }
        }
    }

    if( bContinue )
    {
        var loader = Titanium.Network.createHTTPClient() ;
        loader.validatesSecureCertificate = false ;

        // Runs the function when the data is ready for us to process
        loader.onload = function() 
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            var error_occurred = false ;

            var json = this.responseText ;
            var response = JSON.parse( json ) ;
            if( loader.status == 200 )
            {
                if( response.OK == true )
                {
                    // OK
                    if( response.USERS_LOCATIONS && response.USERS_LOCATIONS.length > 0 )
                    {
                        Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: response.USERS_LOCATIONS } ) ;
                    }
                    else
                    {
                        var dialog = Ti.UI.createAlertDialog(
                        {
                            message: L( 'no_users_locations_available_msg' ) ,
                            ok: L( 'generic_ok_msg' ) ,
                            title: L( 'generic_info_title' )
                        } ) ;
                        dialog.show() ;
                    }
                }
                else
                {
                    error_occurred = true ;
                }
            }
            else
            {
                error_occurred = true ;
            }

            if( error_occurred )
            {
                switch( response.ErrorType )
                {
                    case "ConnectionError":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_connection_error_err_msg' ) ) ;
                    }
                    break ;

                    case "UnexpectedError":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_unexpected_error_err_msg' ) ) ;
                    }
                    break ;
                }
            }

            if( backgroundTimeout !== null )
            {
                // Clear a previous timeout, if exist
                clearTimeout( backgroundTimeout ) ;

                backgroundTimeout = null ;
            }
        } ;
         // Function called when an error occurs, including a timeout
        loader.onerror = function( event )
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + event.error ) ;

            if( backgroundTimeout !== null )
            {
                // Clear a previous timeout, if exist
                clearTimeout( backgroundTimeout ) ;

                backgroundTimeout = null ;
            }
        } ;

        var params =
        {
            // Key
            key: "EDAM"
        } ;

        loader.timeout = Alloy.Globals.ViewUsersLocationsTimeoutMillisecs ;
        loader.open( "POST" , "https://www.edam.resiltronics.org/LoadUsersLocations.php" ) ;

        loader.send( params ) ;
    }
    else
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
    }
}

// ChangeLanguage opening
function OpenChangeLanguage()
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "language:changed" , Back ) ;

        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        // Controller creation for the next View
        Alloy.Globals.createAndOpenControllerExt( 'ChangeLanguageView' ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// EditProfile opening
function OpenEditProfile()
{
    try
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        // Controller creation for the next View
        Alloy.Globals.createAndOpenControllerExt( 'EditProfileView' ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// SendErrors opening
function OpenSendErrors()
{
    try
    {
        // Recovering the errors from the DB
        var recoverErrors = Alloy.createCollection( 'Errors' ) ;
        recoverErrors.fetch(
        {
            query: "SELECT * FROM Errors"
        } ) ;

        // If any errors is present, we'll send them
        if( recoverErrors.length > 0 )
        {
            var errors = "" ;
            for( var i = 0 ; i < recoverErrors.length ; i++ )
            {
                var error = recoverErrors.at( i ) ;
                errors = errors + error.get( "DATE" ) + " " + error.get( "ERR_MSG" ) + "\n" ;
            }

            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            // Sending the errors by email
            var emailDialog = Ti.UI.createEmailDialog() ;
            if( emailDialog.isSupported() )
            {
                emailDialog.subject = L( "send_errors_email_dlg_subject" ) ;
                emailDialog.messageBody = errors ;
                emailDialog.toRecipients = ['edam@resiltronics.org'] ;
                emailDialog.addEventListener( 'complete' , function( e )
                {
                    // Check the mail is completely sent or not
                    if( e.result == emailDialog.SENT )
                    {
                        // Delete all the errors
                        while( recoverErrors.length > 0 )
                        {
                            var model = recoverErrors.at( 0 ) ;
                            recoverErrors.remove( model ) ;
                            model.destroy() ;
                        }
                    }
                } ) ;
                emailDialog.open() ;
            }
            else
            {
                alert( L( 'no_email_client_configured_msg' ) ) ;
            }
        }
        else
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            alert( L( 'no_errors_to_send_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// AboutUs opening
function OpenAboutUs()
{
    try
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        // Controller creation for the next View
        Alloy.Globals.createAndOpenControllerExt( 'AboutUsView' ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView click event handler
function OnTableViewTools_Click( e )
{
    try
    {
        if( bCanClickOnTableView )
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                bCanClickOnTableView = false ;
                bIsWorkInProgress = true ;

                if( e.row )
                {
                    switch( e.index )
                    {
                        case 0:
                        {
                            OpenLoginRegisterLogout() ;
                        }
                        break ;

                        case 1:
                        {
                            OpenUsersLocations() ;
                        }
                        break ;

                        case 2:
                        {
                            OpenChangeLanguage() ;
                        }
                        break ;

                        case 3:
                        {
                            if( current_is_logged )
                            {
                                OpenEditProfile() ;
                            }
                            else
                            {
                                OpenSendErrors() ;
                            }
                        }
                        break ;

                        case 4:
                        {
                            if( current_is_logged )
                            {
                                OpenSendErrors() ;
                            }
                            else
                            {
                                OpenAboutUs() ;
                            }
                        }
                        break ;

                        case 5:
                        {
                            OpenAboutUs() ;
                        }
                        break ;
                    }
                }
     
                bRet = true ;
     
                return bRet ;
            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Callback for EndAsyncBusyAction
function EndAsyncBusyAction_CallBack()
{
    bIsWorkInProgress = false ;
    bCanClickOnTableView = true ;
}

try
{
    if( current_is_logged )
    {
        $.tableViewToolsRowLoginRegisterLogoutImg.setImage( '/images/logout.png' ) ;
        $.tableViewToolsRowLoginRegisterLogoutLbl.setText( L( 'table_tools_logout_title' ) ) ;
    }
    else
    {
        $.tableViewToolsRowLoginRegisterLogoutImg.setImage( '/images/login.png' ) ;
        $.tableViewToolsRowLoginRegisterLogoutLbl.setText( L( 'table_tools_login_register_title' ) ) ;

        // Remove the Edit Profile row from the table too
        $.tableViewTools.deleteRow( 3 ) ;

        $.tableViewTools.setHeight( 250 ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowToolsView.open() ;
    }
    else
    {
        $.toolsViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}