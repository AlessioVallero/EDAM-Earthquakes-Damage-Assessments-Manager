// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.widgetAppButtonDone.get_button() ) ;

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
        controls = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowEditProfile.close() ;
        }
        else
        {
            $.editProfileWindow.close() ;
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
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                var loader = Titanium.Network.createHTTPClient() ;
                loader.validatesSecureCertificate = false ;

                // Runs the function when the data is ready to process
                loader.onload = function() 
                {
                    EndAsyncBusyAction( $.activity_indicator , controls ) ;

                    var json = this.responseText ;
                    var response = JSON.parse( json ) ;
                    if( response.OK == true )
                    {
                        var sPassword = $.widgetAppTextFieldEditProfilePassword.get_text_value() ;
                        Alloy.Globals.RememberMePassword = sPassword ;
                        Alloy.Globals.SetRememberMePassword( sPassword ) ;
                        var sGroup = response.Group ;
                        Alloy.Globals.SessionGroup = sGroup ;
                        Ti.App.Properties.setString( 'session_group' , sGroup ) ;

                        Back() ;
                    }
                    else
                    {
                       switch( response.ErrorType )
                        {
                            case "EditProfileIncomplete":
                            {
                                alert( L( 'edit_profile_edit_profile_incomplete_text_msg' ) ) ;
                            }
                            break ;

                            case "InvalidUsername":
                            {
                                alert( L( 'edit_profile_invalid_username_text_msg' ) ) ;
                            }
                            break ;

                            case "InvalidOldPassword":
                            {
                                alert( L( 'edit_profile_invalid_old_password_text_msg' ) ) ;
                            }
                            break ;

                            case "PasswordDontMatch":
                            {
                                alert( L( 'edit_profile_password_dont_match_text_msg' ) ) ;
                            }
                            break ;

                            case "EmailAlreadyExist":
                            {
                                alert( L( 'edit_profile_email_already_exist_text_msg' ) ) ;
                            }
                            break ;

                            case "EmailNotValid":
                            {
                                alert( L( 'edit_profile_email_not_valid_text_msg' ) ) ;
                            }
                            break ;

                            case "ConnectionError":
                            {
                                alert( L( 'edit_profile_connection_error_text_msg' ) ) ;
                            }
                            break ;

                            case "UnexpectedError":
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( 'edit_profile_unexpected_error_text_msg' ) ) ;
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
                    // Username
                    username: Alloy.Globals.SessionUsername ,
                    // Old password
                    old_pass: $.widgetAppTextFieldEditProfileOldPassword.get_text_value() ,
                    // New password
                    pass: $.widgetAppTextFieldEditProfilePassword.get_text_value() ,
                    // New password confirm
                    pass2: $.widgetAppTextFieldEditProfilePasswordConfirm.get_text_value() ,
                    // Name
                    name: $.widgetAppTextFieldEditProfileName.get_text_value() ,
                    // Group
                    group: $.widgetAppTextFieldEditProfileGroup.get_text_value() ,
                    // Email
                    email: $.widgetAppTextFieldEditProfileEmail.get_text_value()
                } ;

                loader.timeout = Alloy.Globals.LoginRegistrationTimeoutMillisecs ;
                loader.open( "POST" , "https://www.edam.resiltronics.org/Login_Registration/Login_Registration.php?type=edit_profile" ) ;

                loader.send( params ) ;

                bRet = true ;

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
    // Init controls
    // Init app labels
    var sEditProfileUsernameText = Alloy.Globals.SessionUsername ;
    if( Alloy.Globals.SessionGroup )
    {
        sEditProfileUsernameText = sEditProfileUsernameText + " - " + Alloy.Globals.SessionGroup ;
    }
    $.lblEditProfileUsername.setText( sEditProfileUsernameText ) ;
    // Init app textfields
    $.widgetAppTextFieldEditProfileOldPassword.initPassword( L( 'generic_old_password_txt_hint' ) ) ;
    $.widgetAppTextFieldEditProfilePassword.initPassword( L( 'generic_new_password_txt_hint' ) ) ;
    $.widgetAppTextFieldEditProfilePasswordConfirm.initPassword( L( 'generic_new_password_confirm_txt_hint' ) ) ;
    $.widgetAppTextFieldEditProfileName.init( L( 'generic_name_txt_hint' ) ) ;
    $.widgetAppTextFieldEditProfileGroup.init( L( 'generic_group_txt_hint' ) ) ;
    $.widgetAppTextFieldEditProfileEmail.init( L( 'generic_email_txt_hint' ) ) ;
    // Init app buttons
    $.widgetAppButtonDone.init( '/images/done_normal.png' , '/images/done_pressed.png' , '/images/done_disabled.png' , L( 'generic_done_btn_title' ) , OnBtnDone_Click ) ;

    RegisterHideKeyboard( $.editProfileWindow ,
    [
        $.widgetAppTextFieldEditProfileOldPassword.get_text_field() ,
        $.widgetAppTextFieldEditProfilePassword.get_text_field() ,
        $.widgetAppTextFieldEditProfilePasswordConfirm.get_text_field() ,
        $.widgetAppTextFieldEditProfileName.get_text_field() ,
        $.widgetAppTextFieldEditProfileGroup.get_text_field() ,
        $.widgetAppTextFieldEditProfileEmail.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowEditProfile.open() ;
    }
    else
    {
        $.editProfileWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
