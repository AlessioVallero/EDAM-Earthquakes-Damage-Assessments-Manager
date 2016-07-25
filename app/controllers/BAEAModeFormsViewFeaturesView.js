var args = arguments[0] || {} ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

var bCanClickOnTableView = true ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
    {
        Back() ;
    }
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Back function
function Back()
{
    try
    {
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode:view_features_with_login" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowViewFeatures.close() ;
        }
        else
        {
            $.baeaModeViewFeaturesWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_maps_type = "0" ; // Type of maps

// Manage the maps
function ManageMaps()
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , ManageMaps ) ;

    Ti.App.fireEvent( "baea_mode:view_features_with_login" , { auth_done: true } ) ;

    try
    {
        var viewUsersLocationsTitle = "" ;
        switch( current_maps_type )
        {
            // Past Hour
            case 0:
            {
                viewUsersLocationsTitle = L( "generic_past_hour_text_msg" ) ;
            }
            break ;

            // Past Day
            case 1:
            {
                viewUsersLocationsTitle = L( "generic_past_day_text_msg" ) ;
            }
            break ;

            // Past Week
            case 2:
            {
                viewUsersLocationsTitle = L( "generic_past_week_text_msg" ) ;
            }
            break ;

            // Past Month
            case 3:
            {
                viewUsersLocationsTitle = L( "generic_past_month_text_msg" ) ;
            }
            break ;

            // All
            case 4:
            {
                viewUsersLocationsTitle = L( "generic_all_text_msg" ) ;
            }
            break ;
        }

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
                        Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: response.USERS_LOCATIONS , mode: "BAEA" , title: viewUsersLocationsTitle } ) ;
                    }
                    else
                    {
                        var dialog = Ti.UI.createAlertDialog(
                        {
                            message: L( 'no_observations_available_msg' ) ,
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

                    case "InvalidUsername":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_invalid_user_err_msg' ) ) ;
                    }
                    break ;

                    case "UnexpectedError":
                    {
                        Alloy.Globals.LogMessage( L( 'generic_unexpected_error_err_msg' ) ) ;
                    }
                    break ;
                }
            }
        } ;
         // Function called when an error occurs, including a timeout
        loader.onerror = function( event )
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + event.error ) ;
        } ;

        var params =
        {
            // Key
            key: "EDAM" ,
            // Session ID
            SID: Alloy.Globals.SessionId ,
            // Which interval for the map?
            TYPE: current_maps_type.toString() ,
            // Export of All users data?
            ALL_USERS: $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.get_value() == "1" ? "false" : "true"
        } ;

        loader.timeout = Alloy.Globals.ViewUsersLocationsTimeoutMillisecs ;
        loader.open( "POST" , "https://www.edam.resiltronics.org/LoadObservations.php" ) ;

        loader.send( params ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
    }
}

// Function to view the last records from the server
function Maps( need_authentication , type )
{
    try
    {
        if( need_authentication )
        {
            Ti.App.fireEvent( "baea_mode:view_features_with_login" , { auth_done: false } ) ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                current_maps_type = type ;

                if( need_authentication )
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , ManageMaps ) ;
                    Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
                }
                else
                {
                    ManageMaps() ;
                }

            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view maps click event handler
function OnTableViewBAEAModeFormsViewMaps_Click( e )
{
    try
    {
        var bContinue = false ;

        if( bCanClickOnTableView )
        {
            if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
            {
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
                BeginAsyncBusyAction( $.activity_indicator , controls , function()
                {
                    var bRet = false ;

                    bCanClickOnTableView = false ;
                    bIsWorkInProgress = true ;

                    // If a local session exist, we will ask to the server if it's still valid
                    if( Alloy.Globals.ExistSession() )
                    {
                        var loader = Titanium.Network.createHTTPClient() ;
                        loader.validatesSecureCertificate = false ;

                        // Runs the function when the data is ready for us to process
                        loader.onload = function() 
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            Maps( this.responseText == "Expired" , e.index ) ;
                        } ;
                         // Function called when an error occurs, including a timeout
                        loader.onerror = function( e )
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

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
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        Maps( true , e.index ) ;
                    }

                    return bRet ;
                } , EndAsyncBusyAction_CallBack ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        bCanClickOnTableView = true ;
        bIsWorkInProgress = false ;
    }
}

var current_download_type = "0" ; // Type of file

// Manage the download
function ManageDownload()
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , ManageDownload ) ;

    Ti.App.fireEvent( "baea_mode:view_features_with_login" , { auth_done: true } ) ;

    try
    {
        var fileExtension = "" ;
        var emailSubject = "" ;
        var emailMessageBody = "" ;
        var httpAddress = "" ;
        switch( current_download_type )
        {
            // Export CSV All
            case 0:
            {
                fileExtension = ".csv" ;
                emailSubject = L( "send_export_csv_dlg_subject" ) ;
                emailMessageBody = L( "generic_export_csv_your_export_text_msg" ) ;
                httpAddress = "https://www.edam.resiltronics.org/BAEAExportCSV.php" ;
            }
            break ;

            // Google Earth Past Month
            case 1:
            {
                fileExtension = ".kml" ;
                emailSubject = L( "send_google_earth_past_month_dlg_subject" ) ;
                emailMessageBody = L( "generic_google_earth_past_month_your_kml_file_text_msg" ) ;
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGoogleEarth.php" ;
            }
            break ;

            // Google Earth All
            case 2:
            {
                fileExtension = ".kml" ;
                emailSubject = L( "send_google_earth_all_dlg_subject" ) ;
                emailMessageBody = L( "generic_google_earth_all_your_kml_file_text_msg" ) ;
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGoogleEarth.php" ;
            }
            break ;

            // GeoJSON Past Month
            case 3:
            {
                fileExtension = ".json" ;
                emailSubject = L( "send_geojson_past_month_dlg_subject" ) ;
                emailMessageBody = L( "generic_geojson_past_month_your_geojson_file_text_msg" ) ;
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGeoJSON.php" ;
            }
            break ;

            // GeoJSON All
            case 4:
            {
                fileExtension = ".json" ;
                emailSubject = L( "send_geojson_all_dlg_subject" ) ;
                emailMessageBody = L( "generic_geojson_all_your_geojson_file_text_msg" ) ;
                httpAddress = "https://www.edam.resiltronics.org/BAEADownloadGeoJSON.php" ;
            }
            break ;
        }

        var loader = Titanium.Network.createHTTPClient() ;
        loader.validatesSecureCertificate = false ;

        // Runs the function when the data is ready for us to process
        loader.onload = function() 
        {
            if( this.responseText && this.responseText.substring( 0 , 6 ) != "ERROR_" )
            {
                // The file will be stored in the temporary directory 
                var fileDownloaded = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , "fieldnotes" + fileExtension ) ;

                if( fileDownloaded.exists() )
                {
                    // Delete old file if it exists
                    fileDownloaded.deleteFile() ;
                }
                // Write the file data
                if( current_download_type == 0 )
                {
                    fileDownloaded.write( this.responseData ) ;
                }
                else
                {
                    fileDownloaded.write( this.responseText ) ;
                }

                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                // Sending the file by email
                var emailDialog = Ti.UI.createEmailDialog() ;
                if( emailDialog.isSupported() )
                {
                    emailDialog.subject = emailSubject ;
                    emailDialog.addAttachment( fileDownloaded ) ;
                    emailDialog.messageBody = emailMessageBody ;
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

                switch( this.responseText )
                {
                    case "ERROR_CODE_1":
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) ) ;
                    }
                    break ;

                    case "ERROR_CODE_2":
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_expired_err_msg' ) ) ;
                    }
                    break ;

                    case "ERROR_CODE_3":
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_connection_error_err_msg' ) ) ;
                    }
                    break ;

                    case "ERROR_CODE_4":
                    {
                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_invalid_user_err_msg' ) ) ;
                    }
                    break ;
                }
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
            // Which file download?
            TYPE: current_download_type.toString() ,
            // Export of All users data?
            ALL_USERS: $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.get_value() == "1" ? "false" : "true"
        } ;

        loader.timeout = Alloy.Globals.BAEADownloadTimeoutMillisecs ;
        loader.open( "POST" , httpAddress ) ;

        loader.send( params ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
    }
}

// Function to get the file from the server
function Download( need_authentication , type )
{
    try
    {
        if( need_authentication )
        {
            Ti.App.fireEvent( "baea_mode:view_features_with_login" , { auth_done: false } ) ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                current_download_type = type ;

                if( need_authentication )
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , ManageDownload ) ;
                    Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
                }
                else
                {
                    ManageDownload() ;
                }

            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view downloads click event handler
function OnTableViewBAEAModeFormsViewFeaturesDownloads_Click( e )
{
    try
    {
        if( bCanClickOnTableView )
        {
            if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
            {
                alert( L( 'generic_no_network_msg' ) ) ;
            }
            else
            {
                BeginAsyncBusyAction( $.activity_indicator , controls , function()
                {
                    var bRet = false ;

                    bCanClickOnTableView = false ;
                    bIsWorkInProgress = true ;

                    // If a local session exist, we will ask to the server if it's still valid
                    if( Alloy.Globals.ExistSession() )
                    {
                        var loader = Titanium.Network.createHTTPClient() ;
                        loader.validatesSecureCertificate = false ;

                        // Runs the function when the data is ready for us to process
                        loader.onload = function() 
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            Download( this.responseText == "Expired" , e.index ) ;
                        } ;
                         // Function called when an error occurs, including a timeout
                        loader.onerror = function( e )
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

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
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        Download( true , e.index ) ;
                    }

                    return bRet ;
                } , EndAsyncBusyAction_CallBack ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        bCanClickOnTableView = true ;
        bIsWorkInProgress = false ;
    }
}

// Callback for EndAsyncBusyAction
function EndAsyncBusyAction_CallBack()
{
    bCanClickOnTableView = true ;
    bIsWorkInProgress = false ;
}

try
{
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxBAEAModeFormsViewFeaturesOnlyMyObservations.init( L( 'generic_only_my_observations_text_msg' ) , "0" ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowViewFeatures.open() ;
    }
    else
    {
        $.baeaModeViewFeaturesWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
