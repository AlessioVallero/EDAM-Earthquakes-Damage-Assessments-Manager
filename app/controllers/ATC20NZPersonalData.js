var args = arguments[0] || {};
// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
    controls.push( $.btn_ios_Save ) ;
}
else
{
    controls.push( $.widgetAppButtonSave.get_button() ) ;
}
controls.push( $.widgetAppButtonCreateSign.get_button() ) ;
controls.push( $.widgetAppButtonViewSign.get_button() ) ;

// This id is the UsersResidentsPD id column value, so this Controller can show only the correct data
var id = null ;

// This avoid a physical back button event to occur during a saving
var bIsSavingInProgress = false ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsSavingInProgress )
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
            $.navigationWindowATC20NZPD.close() ;
        }
        else
        {
            $.atc20NZPersonalDataWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Create sign button click event handler
function OnBtnCreateSign_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'CreateSignPaintView' , { mode: 'ATC20NZ' } ) ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// View sign button click event handler
function OnBtnViewSign_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            var view_sign_param = null ;
            // The current sign blob (if setted) it's the most updated sign
            // Otherwise we'll check if the sign is on the DB 
            if( Alloy.Globals.ATC20NZCurrentSign )
            {
                view_sign_param = Alloy.Globals.ATC20NZCurrentSign ;
            }
            else
            {
                if( Alloy.Globals.ATC20NZCurrentSignPath )
                {
                    var file = Alloy.Globals.getFileForRead( Alloy.Globals.ATC20NZCurrentSignPath ) ;
                    if( file )
                    {
                        view_sign_param = file.getNativePath() ;
                    }
                }
            }

            if( view_sign_param )
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'ViewSignView' , { image: view_sign_param } ) ;
            }
            else
            {
                alert( L( 'no_sign_image_available_msg' ) ) ;
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

// Save button click event handler
function OnBtnSave_Click( e )
{
    // AlertDialog to ask user if it's sure about saving
    var alertDialog = Titanium.UI.createAlertDialog(
    {
        title: L( 'generic_save_title' ) ,
        message: L( 'save_confirm_msg' ) ,             
        buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
        cancel: 1
    } ) ;
    alertDialog.addEventListener( 'click' , function( e )
    {
        if( e.index == 0 )
        {
            BusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                try
                {
                    bIsSavingInProgress = true ;

                    var bError = false ;

                    // Clicked "YES"
                    // Storing the image on the filesystem
                    if( Alloy.Globals.ATC20NZCurrentSign )
                    {
                        if( Alloy.Globals.ATC20NZCurrentSignPath )
                        {
                            // We'll use the old path
                        }
                        else
                        {
                            // We'll compute the path
                            Alloy.Globals.ATC20NZCurrentSignPath = new Date().getTime() + "_sign.png" ;
                        }
    
                        // The time now, concatenated with _sign
                        var file = Alloy.Globals.getFileForWrite( Alloy.Globals.ATC20NZCurrentSignPath ) ;
                        if( file.exists() )
                        {
                            // A previous image will be dropped
                            file.deleteFile() ;
                        }
                        if( file.write( Alloy.Globals.ATC20NZCurrentSign ) )
                        {
                            // OK
                        }
                        else
                        {
                            Alloy.Globals.AlertUserAndLogAsync( L( "image_saving_error_msg" ) ) ;
    
                            bError = true ;
                        }
                    }
    
                    if( !bError )
                    {
                        // Creating an instance of the model for saving it on the DB
                        if( id )
                        {
                            var atc20PDModel = Alloy.createModel( "ATC20PD",
                            {
                                ID: id ,
                                SIGN_PATH: Alloy.Globals.ATC20NZCurrentSignPath ,
                                INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value() ,
                                AFFILIATION: $.widgetAppTextFieldAuthority.get_text_value() , 
                                MODE: "NZ"
                            } ) ;
                        }
                        else
                        {
                            var atc20PDModel = Alloy.createModel( "ATC20PD",
                            {
                                SIGN_PATH: Alloy.Globals.ATC20NZCurrentSignPath ,
                                INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value() ,
                                AFFILIATION: $.widgetAppTextFieldAuthority.get_text_value() ,
                                MODE: "NZ"
                            } ) ;
                        }

                        // Save model to our database. If the model already exists, the save will be an "update".
                        atc20PDModel.save() ;

                        // Resets the model's state from the database
                        Alloy.Collections.ATC20ModePD.fetch( { query: "SELECT * FROM ATC20PD WHERE MODE='NZ'" } ) ;

                        if( Alloy.Collections.ATC20ModePD.length > 0 )
                        {
                            var personalData = Alloy.Collections.ATC20ModePD.at( 0 ) ;
                            // Storing in memory the generated id
                            id = personalData.get( "ID" ) ;
                        }

                        bRet = true ;
                    }
                }
                catch( exception )
                {
                    alert( L( 'generic_exception_msg' ) + exception.message ) ;
                }
                finally
                {
                    bIsSavingInProgress = false ;
                }

                return bRet ;
            } ) ;
        }
        else if( e.index == 1 )
        {
            // Clicked "NO"
        }   
    } ) ;

    // Show alert message for saving
    alertDialog.show() ;
}

try
{
    // Extraction only of the ATC20 data (only one row is expected)
    Alloy.Collections.ATC20ModePD.fetch( { query: "SELECT * FROM ATC20PD WHERE MODE='NZ'" } ) ;

    // If there is the row, we fill all the text field with the data inside this row
    // If the row is not present, this is the first time that the User fill Personal Data
    if( Alloy.Collections.ATC20ModePD.length > 0 )
    {
        var personalData = Alloy.Collections.ATC20ModePD.at( 0 ) ;
        $.widgetAppTextFieldInspectorID.set_text_value( personalData.get( "INSPECTOR_ID" ) ) ;
        $.widgetAppTextFieldAuthority.set_text_value( personalData.get( "AFFILIATION" ) ) ;

        id = personalData.get( "ID" ) ;
        Alloy.Globals.ATC20NZCurrentSignPath = personalData.get( "SIGN_PATH" ) ;
    }
    else
    {
        Alloy.Globals.ATC20NZCurrentSignPath = "" ;
    }

    Alloy.Globals.ATC20NZCurrentSign = null ;

    // Init app textfields
    $.widgetAppTextFieldInspectorID.init( L( 'generic_inspector_id_txt_hint' ) ) ;
    $.widgetAppTextFieldAuthority.init( L( 'generic_authority_txt_hint' ) ) ;

    // Init app buttons
    $.widgetAppButtonCreateSign.init( '/images/create_sign_normal.png' , '/images/create_sign_pressed.png' , '/images/create_sign_disabled.png' , L( 'generic_create_sign_btn_title' ) , OnBtnCreateSign_Click ) ;
    $.widgetAppButtonViewSign.init( '/images/view_sign_normal.png' , '/images/view_sign_pressed.png' , '/images/view_sign_disabled.png' , L( 'generic_view_sign_btn_title' ) , OnBtnViewSign_Click ) ;

    RegisterHideKeyboard( $.atc20NZPersonalDataWindow ,
    [
        $.widgetAppTextFieldInspectorID.get_text_field() ,
        $.widgetAppTextFieldAuthority.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the other controls must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowATC20NZPD.open() ;
    }
    else
    {
        // Init app buttons (Android)
        $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' ,  '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;

        // Opening the Window
        $.atc20NZPersonalDataWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
