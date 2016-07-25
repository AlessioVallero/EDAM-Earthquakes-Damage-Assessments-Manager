var args = arguments[0] || {};
var current_type = args.type ;
var current_form_id = args.form_id ;
var current_pdf_native_path = args.pdf_native_path ;
var current_zip_filename = args.zip_filename ;
var current_email_subject_language_msg = args.email_subject_language_msg ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
    controls.push( $.btn_ios_next ) ;
}
else
{
    controls.push( $.widgetAppButtonNext.get_button() ) ;
}

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

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
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSendFormView.close() ;
        }
        else
        {
            $.viewSendFormViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Next button click event handler
function OnBtnNext_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            if( Alloy.Globals.SendFormPreview && Alloy.Globals.SendFormPreview == "1" )
            {
                // On iOS devices will be used the native documentViewer, on Android will be used an intent that open PDF reader instead
                // Also the top margin of the TableView must be different depending on the device type
                if( OS_IOS )
                {
                    // Create a document viewer to preview a PDF file
                    var docViewer = Ti.UI.iOS.createDocumentViewer(
                    {
                        url: current_pdf_native_path
                    } ) ;
                    docViewer.addEventListener( 'unload' , function()
                    {
                        SendForm() ;
                    } ) ;
                    docViewer.show( { animated: true } ) ;
                }
                else
                {
                    var intent = Ti.Android.createIntent(
                    {
                        action: Ti.Android.ACTION_VIEW ,
                        type: "application/pdf" ,
                        data: current_pdf_native_path
                    } ) ;

                    try
                    {
                        $.viewSendFormViewWindow.getActivity().startActivityForResult( intent , function( e )
                        {
                            if( e.error )
                            {
                                alert( L( 'form_preview_not_possible_msg' ) ) ;

                                SendForm() ;
                            }
                            else
                            {
                                SendForm() ;
                            }
                        } ) ;
                    }
                    catch( exception )
                    {
                        alert( L( 'form_preview_not_possible_msg' ) ) ;

                        SendForm() ;
                    }
                }
            }
            else
            {
                SendForm() ;
            }

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Function to send the form
function SendForm()
{
    try
    {
        bIsWorkInProgress = true ;

        BeginAsyncBusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            var zipContent = new Array() ;
            zipContent.push( current_pdf_native_path ) ;

            var all_media_found = true ;
            if( Alloy.Globals.SendFormMediaContents && Alloy.Globals.SendFormMediaContents == "1" )
            {
                // Preparing pictures and videos
                switch( current_type )
                {
                    case 'UsersResidents':
                    {
                        var Utils = require( '/UsersResidentsModeUtils' ) ;
                    }
                    break ;

                    case 'AeDES':
                    {
                        var Utils = require( '/AeDESModeUtils' ) ;
                    }
                    break ;

                    case 'Shed':
                    {
                        var Utils = require( '/ShedModeUtils' ) ;
                    }
                    break ;

                    case 'ATC20':
                    {
                        var Utils = require( '/ATC20ModeUtils' ) ;
                    }
                    break ;
                }

                var media_array = Utils.CreateMediaArray( current_form_id , false ) ;

                if( media_array && media_array.length > 0 )
                {
                    for( var i = 1 ; i <= media_array.length ; i++ )
                    {
                        var media = media_array[i-1] ;

                        all_media_found &= media.media_found ;

                        if( media.media_found )
                        {
                            // Adding the media file to the zip archive
                            zipContent.push( media.media ) ;
                            // Create data file for this media
                            var fileName = null ;
                            if( media.type == "PIC" )
                            {
                                fileName = media.path.replace( ".png" , "" ) ;
                            }
                            else if( media.type == "VID" )
                            {
                                fileName = media.path.replace( ".3gp" , "" ) ;
                            }
                            else
                            {
                                fileName = "" ;
                            }

                            var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , fileName + "_data.dat" ) ;
                            if( newFile.exists() )
                            {
                                // A previous .dat will be dropped
                                newFile.deleteFile() ;
                            }
                            newFile.write( "Latitude: " + media.latitude + "\nLongitude: " + media.longitude + "\nAddress: " + media.address + "\nHeading: " + media.heading + "\nDamages level: " + media.damages_level + "\nDamages area: " + media.damages_area + "\nComment: " + media.comment ) ;
                            // Adding the media file data to the zip archive
                            zipContent.push( newFile.getNativePath() ) ;
                        }
                    }
                }
            }

            // Creating the zip archive
            var formZipArchive = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , current_zip_filename ) ;
            if( formZipArchive.exists() )
            {
                // A previous zip file will be dropped
                formZipArchive.deleteFile() ;
            }
            var compressedZipArchive = require( 'ti.compression' ) ;
            var result = compressedZipArchive.zip( formZipArchive.getNativePath() , zipContent ) ;

            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

            if( all_media_found )
            {
                var emailDialog = Ti.UI.createEmailDialog() ;
                if( emailDialog.isSupported() )
                {
                    emailDialog.subject = L( current_email_subject_language_msg ) ;
                    emailDialog.addAttachment( formZipArchive ) ;
                    emailDialog.addEventListener( 'complete' , function( e )
                    {
                        // Check the mail is completely sent or not
                        if( e.result == emailDialog.SENT )
                        {
                            Back() ;
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
                // AlertDialog to ask user if want to synchronize with missing media contents
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_missing_media_contents_title' ) ,
                    message: L( 'missing_media_contents_default_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        var emailDialog = Ti.UI.createEmailDialog() ;
                        if( emailDialog.isSupported() )
                        {
                            emailDialog.subject = L( current_email_subject_language_msg ) ;
                            emailDialog.addAttachment( formZipArchive ) ;
                            emailDialog.addEventListener( 'complete' , function( e )
                            {
                                // Check the mail is completely sent or not
                                if( e.result == emailDialog.SENT )
                                {
                                    Back() ;
                                }
                            } ) ;
                            emailDialog.open() ;
                        }
                        else
                        {
                            alert( L( 'no_email_client_configured_msg' ) ) ;
                        }
                    }
                } ) ;
                // Show alert message
                alertDialog.show() ;
            }

            bRet = true ;

            return bRet ;
        } , EndAsyncBusyAction_CallBack ) ;
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
}

// Preview checkbox event handler
function OnPreview_Change( e )
{
    try
    {
        var newPreviewValue = $.widgetAppCheckBoxSendFormViewPreview.get_value() ;
        Alloy.Globals.SendFormPreview = newPreviewValue ;
        Ti.App.Properties.setString( 'send_form_preview' , newPreviewValue ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// MediaContents checkbox event handler
function OnMediaContents_Change( e )
{
    try
    {
        var newMediaContentsValue = $.widgetAppCheckBoxSendFormViewMediaContents.get_value() ;
        Alloy.Globals.SendFormMediaContents = newMediaContentsValue ;
        Ti.App.Properties.setString( 'send_form_media_contents' , newMediaContentsValue ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    var previewValue = "0" ;
    if( Alloy.Globals.SendFormPreview )
    {
        previewValue = Alloy.Globals.SendFormPreview ;
    }
    var mediaContentsValue = "0" ;
    if( Alloy.Globals.SendFormMediaContents )
    {
        mediaContentsValue = Alloy.Globals.SendFormMediaContents ;
    }

    $.widgetAppCheckBoxSendFormViewPreview.init( L( 'generic_preview_text_msg' ) , previewValue , OnPreview_Change ) ;
    $.widgetAppCheckBoxSendFormViewMediaContents.init( L( 'generic_send_media_contents_text_msg' ) , mediaContentsValue , OnMediaContents_Change ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSendFormView.open() ;
    }
    else
    {
        $.widgetAppButtonNext.init( '/images/next_normal.png' , '/images/next_pressed.png' , '/images/next_disabled.png' , L( 'generic_next_btn_title' ) , OnBtnNext_Click ) ;

        $.viewSendFormViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
