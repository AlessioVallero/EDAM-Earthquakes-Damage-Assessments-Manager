var args = arguments[0] || {};
var current_image = args.image ;
var current_title = args.title ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowViewHelpView.close() ;
        }
        else
        {
            $.viewHelpViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Setting the Title of the Window
    if( current_title )
    {
        $.viewHelpViewWindow.setTitle( current_title ) ;
    }

    // Setting the Help image on the ImageView
    if( current_image )
    {
        $.image_view_help.setImage( current_image ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowViewHelpView.open() ;
    }
    else
    {
        $.viewHelpViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
