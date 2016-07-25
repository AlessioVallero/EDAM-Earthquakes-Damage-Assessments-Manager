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
            $.navigationWindowURPD.close() ;
        }
        else
        {
            $.usersResidentsPersonalDataWindow.close() ;
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
            Alloy.Globals.createAndOpenControllerExt( 'CreateSignPaintView' ) ;

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
            if( Alloy.Globals.UsersResidentsCurrentSign )
            {
                view_sign_param = Alloy.Globals.UsersResidentsCurrentSign ;
            }
            else
            {
                if( Alloy.Globals.UsersResidentsCurrentSignPath )
                {
                    var file = Alloy.Globals.getFileForRead( Alloy.Globals.UsersResidentsCurrentSignPath ) ;
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
                    if( Alloy.Globals.UsersResidentsCurrentSign )
                    {
                        if( Alloy.Globals.UsersResidentsCurrentSignPath )
                        {
                            // We'll use the old path
                        }
                        else
                        {
                            // We'll compute the path
                            Alloy.Globals.UsersResidentsCurrentSignPath = new Date().getTime() + "_sign.png" ;
                        }
    
                        // The time now, concatenated with _sign
                        var file = Alloy.Globals.getFileForWrite( Alloy.Globals.UsersResidentsCurrentSignPath ) ;
                        if( file.exists() )
                        {
                            // A previous image will be dropped
                            file.deleteFile() ;
                        }
                        if( file.write( Alloy.Globals.UsersResidentsCurrentSign ) )
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
                            var usersResidentsPDModel = Alloy.createModel( "UsersResidentsPD",
                            {
                                ID: id ,
                                SIGN_PATH: Alloy.Globals.UsersResidentsCurrentSignPath ,
                                NAME: $.widgetAppTextFieldName.get_text_value() ,
                                CELL_NUMBER: $.widgetAppTextFieldCell.get_text_value() ,
                                AGE: $.widgetAppTextFieldAge.get_text_value() ,
                                JOB: $.widgetAppTextFieldJob.get_text_value()
                            } ) ;
                        }
                        else
                        {
                            var usersResidentsPDModel = Alloy.createModel( "UsersResidentsPD",
                            {
                                SIGN_PATH: Alloy.Globals.UsersResidentsCurrentSignPath ,
                                NAME: $.widgetAppTextFieldName.get_text_value() ,
                                CELL_NUMBER: $.widgetAppTextFieldCell.get_text_value() ,
                                AGE: $.widgetAppTextFieldAge.get_text_value() ,
                                JOB: $.widgetAppTextFieldJob.get_text_value()
                            } ) ;
                        }

                        // Save model to our database. If the model already exists, the save will be an "update".
                        usersResidentsPDModel.save() ;

                        // Resets the model's state from the database
                        Alloy.Collections.UsersResidentsModePD.fetch( { query: "SELECT * FROM UsersResidentsPD" } ) ;

                        if( Alloy.Collections.UsersResidentsModePD.length > 0 )
                        {
                            var personalData = Alloy.Collections.UsersResidentsModePD.at( 0 ) ;
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
    // Extraction only of the UsersResidents data (only one row is expected)
    Alloy.Collections.UsersResidentsModePD.fetch( { query: "SELECT * FROM UsersResidentsPD" } ) ;

    // If there is the row, we fill all the text field with the data inside this row
    // If the row is not present, this is the first time that the User fill Personal Data
    if( Alloy.Collections.UsersResidentsModePD.length > 0 )
    {
        var personalData = Alloy.Collections.UsersResidentsModePD.at( 0 ) ;
        $.widgetAppTextFieldName.set_text_value( personalData.get( "NAME" ) ) ;
        $.widgetAppTextFieldCell.set_text_value( personalData.get( "CELL_NUMBER" ) ) ;
        $.widgetAppTextFieldAge.set_text_value( personalData.get( "AGE" ) ) ;
        $.widgetAppTextFieldJob.set_text_value( personalData.get( "JOB" ) ) ;

        id = personalData.get( "ID" ) ;
        Alloy.Globals.UsersResidentsCurrentSignPath = personalData.get( "SIGN_PATH" ) ;
    }
    else
    {
        Alloy.Globals.UsersResidentsCurrentSignPath = "" ;
    }

    Alloy.Globals.UsersResidentsCurrentSign = null ;

    // Init app textfields
    $.widgetAppTextFieldName.init( L( 'generic_name_txt_hint' ) ) ;
    $.widgetAppTextFieldCell.init( L( 'generic_cell_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldAge.init( L( 'generic_age_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldJob.init( L( 'generic_job_txt_hint' ) ) ;

    // Init app buttons
    $.widgetAppButtonCreateSign.init( '/images/create_sign_normal.png' , '/images/create_sign_pressed.png' , '/images/create_sign_disabled.png' , L( 'generic_create_sign_btn_title' ) , OnBtnCreateSign_Click ) ;
    $.widgetAppButtonViewSign.init( '/images/view_sign_normal.png' , '/images/view_sign_pressed.png' , '/images/view_sign_disabled.png' , L( 'generic_view_sign_btn_title' ) , OnBtnViewSign_Click ) ;

    RegisterHideKeyboard( $.usersResidentsPersonalDataWindow ,
    [
        $.widgetAppTextFieldName.get_text_field() ,
        $.widgetAppTextFieldCell.get_text_field() ,
        $.widgetAppTextFieldAge.get_text_field() ,
        $.widgetAppTextFieldJob.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the other controls must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowURPD.open() ;
    }
    else
    {
        // Init app buttons (Android)
        $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' ,  '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;

        // Opening the Window
        $.usersResidentsPersonalDataWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
