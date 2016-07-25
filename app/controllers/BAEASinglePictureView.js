var args = arguments[0] || {} ;
var current_image_path = args.image_path ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowBAEASinglePictureView.close() ;
        }
        else
        {
            $.baeaSinglePictureViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Setting the image on the ImageView
    if( current_image_path )
    {
        // Set the image on the ImageView
        $.baea_single_picture_view.setImage( current_image_path ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    if( OS_IOS )
    {
        $.navigationWindowBAEASinglePictureView.open() ;
    }
    else
    {
        $.baeaSinglePictureViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
