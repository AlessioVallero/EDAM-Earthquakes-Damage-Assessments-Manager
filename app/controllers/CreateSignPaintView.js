var args = arguments[0] || {};
var current_component_number = args.component_number ;
var current_mode = args.mode ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}
controls.push( $.paint_widget.get_done_button() ) ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowEPV.close() ;
        }
        else
        {
            $.sign_paint_view_container_window.close() ;
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
            title: L( 'sign_save_title' ) ,
            message: L( 'sign_is_done_confirm_msg' ) ,             
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
                    var image_to_save = $.paint_widget.get_current_image() ;
                    if( image_to_save )
                    {
                        // Depending on the mode, we use different global variables
                        if( current_component_number )
                        {
                            switch( current_component_number )
                            {
                                case 1:
                                {
                                    if( current_mode == "AeDES" )
                                    {
                                        Alloy.Globals.AeDESCurrentSign1 = image_to_save ;
                                    }
                                    else
                                    {
                                        Alloy.Globals.ShedCurrentSign1 = image_to_save ;
                                    }
                                }
                                break ;

                                case 2:
                                {
                                    if( current_mode == "AeDES" )
                                    {
                                        Alloy.Globals.AeDESCurrentSign2 = image_to_save ;
                                    }
                                    else
                                    {
                                        Alloy.Globals.ShedCurrentSign2 = image_to_save ;
                                    }
                                }
                                break ;

                                case 3:
                                {
                                    if( current_mode == "AeDES" )
                                    {
                                        Alloy.Globals.AeDESCurrentSign3 = image_to_save ;
                                    }
                                    else
                                    {
                                        Alloy.Globals.ShedCurrentSign3 = image_to_save ;
                                    }
                                }
                                break ;
                            }
                        }
                        else
                        {
                            if( current_mode == "ATC20NZ" )
                            {
                                Alloy.Globals.ATC20NZCurrentSign = image_to_save ;
                            }
                            else
                            {
                                Alloy.Globals.UsersResidentsCurrentSign = image_to_save ;
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
                        $.navigationWindowEPV.close() ;
                    }
                    else
                    {
                        $.paint_view_container_window.close() ;
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
    $.paint_widget.init( OnBtnDone_Click ) ;
    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the PaintView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowEPV.open() ;
    }
    else
    {
        $.paint_view_container_window.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
