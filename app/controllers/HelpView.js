var args = arguments[0] || {} ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.tableViewHelp ) ;

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

// Back button click event handler
function Back()
{
    try
    {
        controls = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowHelp.close() ;
        }
        else
        {
            $.helpWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView click event handler
function OnTableViewHelp_Click( e )
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

                var currentLocale = "" ;
                if( Ti.Locale.currentLanguage == "es" )
                {
                    currentLocale = "es" ;
                }
                else if( Ti.Locale.currentLanguage == "it" )
                {
                    currentLocale = "it" ;
                }
                else
                {
                    currentLocale = "en" ;
                }

                var current_pdf_native_path = "" ;
                var current_pdf_name = "" ;
                switch( e.index )
                {
                    case 0:
                    {
                        current_pdf_native_path = "http://www.edam.resiltronics.org/Manuals/EDAM_EERI_LFE_mobile_" + currentLocale + ".pdf" ;
                        current_pdf_name = "EDAM_EERI_LFE_mobile_" + currentLocale + ".pdf" ;
                    }
                    break ;

                    case 1:
                    {
                        current_pdf_native_path = "http://www.edam.resiltronics.org/Manuals/EDAM_ATC-20_Nepal_mobile_" + currentLocale + ".pdf" ;
                        current_pdf_name = "EDAM_ATC-20_Nepal_mobile_" + currentLocale + ".pdf" ;
                    }
                    break ;
                }

                // Get the PDF of the manual
                var file = Ti.Filesystem.getFile( Ti.Filesystem.getTempDirectory() , current_pdf_name ) ;
                if( file.exists() )
                {
                    // AlertDialog to ask user if want to download a new version or use the previous version
                    var alertDialog = Titanium.UI.createAlertDialog(
                    {
                        title: L( 'generic_help_download_new_version_title' ) ,
                        message: L( 'help_download_new_version_confirm_msg' ) ,             
                        buttonNames: [ L( 'generic_download_again_msg' ) , L( 'generic_use_this_version_msg' ) ] ,
                        cancel: 1
                    } ) ;
                    alertDialog.addEventListener( 'click' , function( event_alert_download )
                    {
                        if( event_alert_download.index == 0 )
                        {
                            // A previous .pdf will be dropped
                            file.deleteFile() ;

                            DownloadHelpInstructionManual( current_pdf_native_path , file ) ;
                        }
                        else if( event_alert_download.index == 1 )
                        {
                            ViewPDF( file ) ;
                        }
                    } ) ;
                    // Show alert message for saving
                    alertDialog.show() ;
                }
                else
                {
                    DownloadHelpInstructionManual( current_pdf_native_path , file ) ;
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

// Download the instruction manual from the input url to the local_file
function DownloadHelpInstructionManual( current_pdf_url , local_file )
{
    if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        alert( L( 'generic_no_network_msg' ) ) ;
    }
    else
    {
        var client = Ti.Network.createHTTPClient(
        {
            onload: function()
            {
                local_file.write( this.responseData ) ;

                ViewPDF( local_file ) ;
            } ,
            onerror: function()
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                alert( L( 'manual_not_available_msg' ) ) ;
            }
        } ) ;
        client.open( 'GET' , current_pdf_url ) ;
        client.send() ;
    }
}

// View PDF from the local_file
function ViewPDF( local_file )
{
    // On iOS devices will be used the native documentViewer, on Android will be used an intent that open PDF reader instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        // Create a document viewer to preview a PDF file
        var docViewer = Ti.UI.iOS.createDocumentViewer(
        {
            url: local_file.nativePath
        } ) ;
        docViewer.show( { animated: true } ) ;
    }
    else
    {
        var intent = Ti.Android.createIntent(
        {
            action: Ti.Android.ACTION_VIEW ,
            type: "application/pdf" ,
            data: local_file.nativePath
        } ) ;

        try
        {
            $.helpWindow.getActivity().startActivityForResult( intent , function( event )
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                if( event.error )
                {
                    alert( L( 'manual_not_available_msg' ) ) ;
                }
            } ) ;
        }
        catch( exception )
        {
            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            alert( L( 'manual_not_available_msg' ) ) ;
        }
    }
}

function EndAsyncBusyAction_CallBack()
{
    bIsWorkInProgress = false ;
    bCanClickOnTableView = true ;
}

try
{
    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowHelp.open() ;
    }
    else
    {
        $.helpWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
