var args = arguments[0] || {} ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    Back() ;
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
        // Remove the language:changed event listener, if necessary
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "language:changed" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowChangeLanguageView.close() ;
        }
        else
        {
            $.changeLanguageViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var currentLanguage = "" ;
// ChangeLanguage label click event handler
function OnChangeLanguage_Change( e )
{
    try
    {
        currentLanguage = e.id ;
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
        // AlertDialog to ask user if it's sure about changing the language
        var alertDialog = Titanium.UI.createAlertDialog(
        {
            title: L( 'change_language_title' ) ,
            message: L( 'change_language_is_done_confirm_msg' ) ,             
            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
            cancel: 1
        } ) ;
        alertDialog.addEventListener( 'click' , function( e )
        {
            if( e.index == 0 )
            {
                Alloy.Globals.CurrentLanguageSelectedIndex = currentLanguage ;
                Ti.App.Properties.setString( 'current_language' , currentLanguage ) ;

                if( OS_IOS )
                {
                    var locale = require( "com.obscure.localehelper" ) ;

                    switch( currentLanguage )
                    {
                        // English
                        case "0":
                        {
                            locale.locale = "en" ;
                        }
                        break ;

                        // Italian
                        case "1":
                        {
                            locale.locale = "it" ;
                        }
                        break ;

                        // Spanish
                        case "2":
                        {
                            locale.locale = "es" ;
                        }
                        break ;

                        // Default is english
                        default:
                        {
                            locale.locale = "en" ;
                        }
                        break ;
                    }
                }
                else
                {
                    var locale = require( "com.shareourideas.locale" ) ;

                    switch( currentLanguage )
                    {
                        // English
                        case "0":
                        {
                            locale.setLocale( "en" ) ;
                        }
                        break ;

                        // Italian
                        case "1":
                        {
                            locale.setLocale( "it" ) ;
                        }
                        break ;

                        // Spanish
                        case "2":
                        {
                            locale.setLocale( "es" ) ;
                        }
                        break ;

                        // Default is english
                        default:
                        {
                            locale.setLocale( "en" ) ;
                        }
                        break ;
                    }
                }

                // Fire the event language:changed to close the ToolsView
                Ti.App.fireEvent( "language:changed" , { changed_propagation_event_enabled: true } ) ;

                // We must close this Window too
                Back() ;
            }
        } ) ;
        // Show alert message for changing the language
        alertDialog.show() ; 
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    var changeLanguageParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        changeLanguageParentView = mainView ;
    }
    else
    {
        changeLanguageParentView = $.viewAppComboBoxChangeLanguage ;
    }

    switch( Alloy.Globals.CurrentLanguageSelectedIndex )
    {
        // English
        case "0":
        {
            // Init app comboboxes
            var changeLanguageValues =
            {
                1: { title: L( 'generic_italian_text_msg' ) } ,
                2: { title: L( 'generic_spanish_text_msg' ) }
            } ;
            currentLanguage = "1" ;
        }
        break ;

        // Italian
        case "1":
        {
            // Init app comboboxes
            var changeLanguageValues =
            {
                0: { title: L( 'generic_english_text_msg' ) } ,
                2: { title: L( 'generic_spanish_text_msg' ) }
            } ;
            currentLanguage = "0" ;
        }
        break ;

        // Spanish
        case "2":
        {
            // Init app comboboxes
            var changeLanguageValues =
            {
                0: { title: L( 'generic_english_text_msg' ) } ,
                1: { title: L( 'generic_italian_text_msg' ) }
            } ;
            currentLanguage = "0" ;
        }
        break ;

        // Default is english
        default:
        {
            // Init app comboboxes
            var changeLanguageValues =
            {
                1: { title: L( 'generic_italian_text_msg' ) } ,
                2: { title: L( 'generic_spanish_text_msg' ) }
            } ;
            currentLanguage = "1" ;
        }
        break ;
    }

    $.widgetAppComboBoxChangeLanguage.init( L( 'generic_change_language_text_msg' ) , changeLanguageValues , OnChangeLanguage_Change , null , changeLanguageParentView ) ;
    $.widgetAppComboBoxChangeLanguage.enabled( true ) ;
    $.widgetAppComboBoxChangeLanguage.set_selected_index( currentLanguage ) ;

    // Init app button
    $.widgetAppButtonDone.init( '/images/done_normal.png' , '/images/done_pressed.png' , '/images/done_disabled.png' , L( 'generic_done_btn_title' ) , OnBtnDone_Click ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    if( OS_IOS )
    {
        $.navigationWindowChangeLanguageView.open() ;
    }
    else
    {
        $.changeLanguageViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
