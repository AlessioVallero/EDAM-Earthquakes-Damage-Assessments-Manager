var args = arguments[0] || {} ;
var current_type = args.type ;
var current_baea_section = args.baea_section ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}
controls.push( $.draft_paint_widget.get_done_button() ) ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDPV.close() ;
        }
        else
        {
            $.draft_paint_view_container_window.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Done button click event handler
function OnBtnDone_Click( e )
{
    try
    {
        // AlertDialog to ask user if it's sure about saving the sign
        var alertDialog = Titanium.UI.createAlertDialog(
        {
            title: L( 'draft_save_title' ) ,
            message: L( 'draft_is_done_confirm_msg' ) ,             
            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
            cancel: 1
        } ) ;
        alertDialog.addEventListener( 'click' , function( e )
        {
            if( e.index == 0 )
            {
                if( BusyAction( $.activity_indicator , controls , function()
                {
                    var bRet = false ;
                    // Clicked "YES"
                    // Getting the image from the PaintView (if it's empty, we don't save)
                    var image_to_save = $.draft_paint_widget.get_current_image( current_type == "Detailed_ATC20_Sketch" ) ;
                    if( image_to_save )
                    {
                        // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                        // The files in the temporary folder may not persist when the application is shut down and restarted.
                        var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
                        if( newFile.exists )
                        {
                            // A previous image will be dropped
                            newFile.deleteFile() ;
                        }
                        newFile.write( image_to_save ) ;

                        if( current_type == "Detailed_ATC20_Sketch" )
                        {
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_PATH"] = newFile.getNativePath() ;
                            Alloy.Globals.ATC20ModeDetailedEvaluation["SKETCH_MODIFIED"] = "Y" ; // Yes
                        }
                        else
                        {
                            // Inserting the image on the array of photos
                            if( current_type == "Detailed_BAEA_Sketch" )
                            {
                                // Init of the array (if it's necessary)
                                if( !Alloy.Globals.CurrentTemporaryPicsPath )
                                {
                                    Alloy.Globals.CurrentTemporaryPicsPath = new Array() ;
                                }

                                Alloy.Globals.CurrentTemporaryPicsPath.push( { media: newFile.getNativePath() , section: current_baea_section } ) ;
                            }
                            else
                            {
                                // Init of the array (if it's necessary)
                                if( !Alloy.Globals.CurrentPicsPath )
                                {
                                    Alloy.Globals.CurrentPicsPath = new Array() ;
                                }

                                Alloy.Globals.CurrentPicsPath.push( { media: newFile.getNativePath() , latitude: 0 , longitude: 0 , address: "" , heading: "" , damages_level: "0" , damages_area: "0" , comment: "" } ) ;
                            }
                        }

                        // OK
                        bRet = true ;
                    }
                    else
                    {
                        alert( L( "generic_no_image_to_save_msg" ) ) ;
                    }

                    return bRet ;
                } ) )
                {
                    // OK - Closing the Window (the NavigationWindow for iOS devices, the Window for Android devices)
                    if( OS_IOS )
                    {
                        $.navigationWindowDPV.close() ;
                    }
                    else
                    {
                        $.draft_paint_view_container_window.close() ;
                    }
                }
            }
            else if( e.index == 1 )
            {
                // Clicked "NO"
            }   
        } ) ;

        // Show alert message for saving
        alertDialog.show() ; 
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    $.draft_paint_widget.init( OnBtnDone_Click ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the PaintView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDPV.open() ;
    }
    else
    {
        $.draft_paint_view_container_window.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
