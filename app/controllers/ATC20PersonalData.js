var args = arguments[0] || {} ;
var current_mode = args.mode ;
if( typeof current_mode != "undefined" )
{
    // Nothing to do
}
else
{
    current_mode = 'CA' ;
}

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
            $.navigationWindowATC20PD.close() ;
        }
        else
        {
            $.atc20PersonalDataWindow.close() ;
        }
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
                    if( !bError )
                    {
                        // Creating an instance of the model for saving it on the DB
                        if( id )
                        {
                            var atc20PDModel = Alloy.createModel( "ATC20PD",
                            {
                                ID: id ,
                                SIGN_PATH: "" ,
                                INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value() ,
                                AFFILIATION: $.widgetAppTextFieldAffiliation.get_text_value() , 
                                MODE: current_mode
                            } ) ;
                        }
                        else
                        {
                            var atc20PDModel = Alloy.createModel( "ATC20PD",
                            {
                                SIGN_PATH: "" ,
                                INSPECTOR_ID: $.widgetAppTextFieldInspectorID.get_text_value() ,
                                AFFILIATION: $.widgetAppTextFieldAffiliation.get_text_value() ,
                                MODE: current_mode
                            } ) ;
                        }

                        // Save model to our database. If the model already exists, the save will be an "update".
                        atc20PDModel.save() ;

                        // Resets the model's state from the database
                        Alloy.Collections.ATC20ModePD.fetch( { query: "SELECT * FROM ATC20PD WHERE MODE='" + current_mode + "'" } ) ;

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
    Alloy.Collections.ATC20ModePD.fetch( { query: "SELECT * FROM ATC20PD WHERE MODE='" + current_mode + "'" } ) ;

    // If there is the row, we fill all the text field with the data inside this row
    // If the row is not present, this is the first time that the User fill Personal Data
    if( Alloy.Collections.ATC20ModePD.length > 0 )
    {
        var personalData = Alloy.Collections.ATC20ModePD.at( 0 ) ;
        $.widgetAppTextFieldInspectorID.set_text_value( personalData.get( "INSPECTOR_ID" ) ) ;
        $.widgetAppTextFieldAffiliation.set_text_value( personalData.get( "AFFILIATION" ) ) ;

        id = personalData.get( "ID" ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldInspectorID.init( L( 'generic_inspector_id_txt_hint' ) ) ;
    $.widgetAppTextFieldAffiliation.init( L( 'generic_affiliation_txt_hint' ) ) ;

    RegisterHideKeyboard( $.atc20PersonalDataWindow ,
    [
        $.widgetAppTextFieldInspectorID.get_text_field() ,
        $.widgetAppTextFieldAffiliation.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the other controls must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowATC20PD.open() ;
    }
    else
    {
        // Init app buttons (Android)
        $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' ,  '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;

        // Opening the Window
        $.atc20PersonalDataWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
