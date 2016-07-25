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
controls.push( $.widgetAppButtonCreateSign1.get_button() ) ;
controls.push( $.widgetAppButtonViewSign1.get_button() ) ;
controls.push( $.widgetAppButtonCreateSign2.get_button() ) ;
controls.push( $.widgetAppButtonViewSign2.get_button() ) ;
controls.push( $.widgetAppButtonCreateSign3.get_button() ) ;
controls.push( $.widgetAppButtonViewSign3.get_button() ) ;

// This ids are the ShedPD id column value, so this Controller can show only the correct data
var id1 = null ;
var id2 = null ;
var id3 = null ;

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
            $.navigationWindowSPD.close() ;
        }
        else
        {
            $.shedPersonalDataWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Create sign 1 button click event handler
function OnBtnCreateSign1_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'CreateSignPaintView' , { component_number: 1 , mode: "Shed" } ) ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// View sign 1 button click event handler
function OnBtnViewSign1_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            var view_sign_param = null ;
            // The current sign blob (if setted) it's the most updated sign
            // Otherwise we'll check if the sign is on the DB 
            if( Alloy.Globals.ShedCurrentSign1 )
            {
                view_sign_param = Alloy.Globals.ShedCurrentSign1 ;
            }
            else
            {
                if( Alloy.Globals.ShedCurrentSignPath1 )
                {
                    var file = Alloy.Globals.getFileForRead( Alloy.Globals.ShedCurrentSignPath1 ) ;
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

// Create sign 2 button click event handler
function OnBtnCreateSign2_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'CreateSignPaintView' , { component_number: 2 , mode: "Shed" } ) ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// View sign 2 button click event handler
function OnBtnViewSign2_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            var view_sign_param = null ;
            // The current sign blob (if setted) it's the most updated sign
            // Otherwise we'll check if the sign is on the DB 
            if( Alloy.Globals.ShedCurrentSign2 )
            {
                view_sign_param = Alloy.Globals.ShedCurrentSign2 ;
            }
            else
            {
                if( Alloy.Globals.ShedCurrentSignPath2 )
                {
                    var file = Alloy.Globals.getFileForRead( Alloy.Globals.ShedCurrentSignPath2 ) ;
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

// Create sign 3 button click event handler
function OnBtnCreateSign3_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'CreateSignPaintView' , { component_number: 3 , mode: "Shed" } ) ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// View sign 3 button click event handler
function OnBtnViewSign3_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            var view_sign_param = null ;
            // The current sign blob (if setted) it's the most updated sign
            // Otherwise we'll check if the sign is on the DB 
            if( Alloy.Globals.ShedCurrentSign3 )
            {
                view_sign_param = Alloy.Globals.ShedCurrentSign3 ;
            }
            else
            {
                if( Alloy.Globals.ShedCurrentSignPath3 )
                {
                    var file = Alloy.Globals.getFileForRead( Alloy.Globals.ShedCurrentSignPath3 ) ;
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

                    // If the array isn't null or empty, we have the details of the Section one
                    if( Alloy.Globals.ShedCurrentSign1 )
                    {
                        Ti.API.info( '\nFirst team component:\n' ) ;

                        // Storing the image1 on the filesystem
                        if( Alloy.Globals.ShedCurrentSignPath1 )
                        {
                            // We'll use the old path
                        }
                        else
                        {
                            // We'll compute the path
                            Alloy.Globals.ShedCurrentSignPath1 = new Date().getTime() + "_sign1.png" ;
                        }
    
                        // The time now, concatenated with _sign1
                        var file = Alloy.Globals.getFileForWrite( Alloy.Globals.ShedCurrentSignPath1 ) ;
                        if( file.exists() )
                        {
                            // A previous image will be dropped
                            file.deleteFile() ;
                        }
                        if( file.write( Alloy.Globals.ShedCurrentSign1 ) )
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
                        var recoverShedPD = Alloy.createCollection( 'ShedPD' ) ;
                        recoverShedPD.fetch(
                        {
                            query: "SELECT * FROM ShedPD where ID = " + id1
                        } ) ;
                        if( recoverShedPD.length > 0 )
                        {
                            var currentShedPD = recoverShedPD.at( 0 ) ;
                            currentShedPD.set( { SIGN_PATH: Alloy.Globals.ShedCurrentSignPath1 , NAME: $.widgetAppTextFieldName1.get_text_value() } ) ;
                            currentShedPD.save() ;
                            currentShedPD = null ;
                        }
                        else
                        {
                            var shedPDModel = Alloy.createModel( "ShedPD" ,
                            {
                                COMPONENT_NUMBER: 1 ,
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath1 ,
                                NAME: $.widgetAppTextFieldName1.get_text_value()
                            } ) ;
                            shedPDModel.save() ;
                            shedPDModel = null ;
                        }
                        recoverShedPD = null ;

                        // If the array isn't null or empty, we have the details of the Section one
                        if( Alloy.Globals.ShedCurrentSign2 )
                        {
                            Ti.API.info( '\nSecond team component:\n' ) ;

                            // Storing the image2 on the filesystem
                            if( Alloy.Globals.ShedCurrentSignPath2 )
                            {
                                // We'll use the old path
                            }
                            else
                            {
                                // We'll compute the path
                                Alloy.Globals.ShedCurrentSignPath2 = new Date().getTime() + "_sign2.png" ;
                            }
        
                            // The time now, concatenated with _sign2
                            var file = Alloy.Globals.getFileForWrite( Alloy.Globals.ShedCurrentSignPath2 ) ;
                            if( file.exists() )
                            {
                                // A previous image will be dropped
                                file.deleteFile() ;
                            }
                            if( file.write( Alloy.Globals.ShedCurrentSign2 ) )
                            {
                                // OK
                            }
                            else
                            {
                                Alloy.Globals.AlertUserAndLogAsync( L( "image_saving_error_msg" ) ) ;
        
                                bError = true ;
                            }
                        }

                        var recoverShedPD = Alloy.createCollection( 'ShedPD' ) ;
                        recoverShedPD.fetch(
                        {
                            query: "SELECT * FROM ShedPD where ID = " + id2
                        } ) ;
                        if( recoverShedPD.length > 0 )
                        {
                            var currentShedPD = recoverShedPD.at( 0 ) ;
                            currentShedPD.set( { SIGN_PATH: Alloy.Globals.ShedCurrentSignPath2 , NAME: $.widgetAppTextFieldName2.get_text_value() } ) ;
                            currentShedPD.save() ;
                            currentShedPD = null ;
                        }
                        else
                        {
                            var shedPDModel = Alloy.createModel( "ShedPD" ,
                            {
                                COMPONENT_NUMBER: 2 ,
                                SIGN_PATH: Alloy.Globals.ShedCurrentSignPath2 ,
                                NAME: $.widgetAppTextFieldName2.get_text_value()
                            } ) ;
                            shedPDModel.save() ;
                            shedPDModel = null ;
                        }
                        recoverShedPD = null ;

                        if( !bError )
                        {
                            // If the array isn't null or empty, we have the details of the Section one
                            if( Alloy.Globals.ShedCurrentSign3 )
                            {
                                Ti.API.info( '\nThird team component:\n' ) ;

                                // Storing the image3 on the filesystem
                                if( Alloy.Globals.ShedCurrentSignPath3 )
                                {
                                    // We'll use the old path
                                }
                                else
                                {
                                    // We'll compute the path
                                    Alloy.Globals.ShedCurrentSignPath3 = new Date().getTime() + "_sign3.png" ;
                                }
            
                                // The time now, concatenated with _sign3
                                var file = Alloy.Globals.getFileForWrite( Alloy.Globals.ShedCurrentSignPath3 ) ;
                                if( file.exists() )
                                {
                                    // A previous image will be dropped
                                    file.deleteFile() ;
                                }
                                if( file.write( Alloy.Globals.ShedCurrentSign3 ) )
                                {
                                    // OK
                                }
                                else
                                {
                                    Alloy.Globals.AlertUserAndLogAsync( L( "image_saving_error_msg" ) ) ;
            
                                    bError = true ;
                                }
                            }

                            if( bError )
                            {
                                Ti.API.info( 'ERROR.\nEND' ) ;
                            }
                            else
                            {
                                var recoverShedPD = Alloy.createCollection( 'ShedPD' ) ;
                                recoverShedPD.fetch(
                                {
                                    query: "SELECT * FROM ShedPD where ID = " + id3
                                } ) ;
                                if( recoverShedPD.length > 0 )
                                {
                                    var currentShedPD = recoverShedPD.at( 0 ) ;
                                    currentShedPD.set( { SIGN_PATH: Alloy.Globals.ShedCurrentSignPath3 , NAME: $.widgetAppTextFieldName3.get_text_value() } ) ;
                                    currentShedPD.save() ;
                                    currentShedPD = null ;
                                }
                                else
                                {
                                    var shedPDModel = Alloy.createModel( "ShedPD" ,
                                    {
                                        COMPONENT_NUMBER: 3 ,
                                        SIGN_PATH: Alloy.Globals.ShedCurrentSignPath3 ,
                                        NAME: $.widgetAppTextFieldName3.get_text_value()
                                    } ) ;
                                    shedPDModel.save() ;
                                    shedPDModel = null ;
                                }
                                recoverShedPD = null ;

                                // Resets the model's state from the database
                                Alloy.Collections.ShedModePD.fetch( { query: "SELECT * FROM ShedPD" } ) ;

                                if( Alloy.Collections.ShedModePD.length > 0 )
                                {
                                    for( var i = 0 ; i < Alloy.Collections.ShedModePD.length ; i++ )
                                    {
                                        var personalData = Alloy.Collections.ShedModePD.at( i ) ;
                                        // Storing in memory the generated id
                                        switch( personalData.get( "COMPONENT_NUMBER" ) )
                                        {
                                            case 1:
                                            {
                                                id1 = personalData.get( "ID" ) ;
                                            }
                                            break ;

                                            case 2:
                                            {
                                                id2 = personalData.get( "ID" ) ;
                                            }
                                            break ;

                                            case 3:
                                            {
                                                id3 = personalData.get( "ID" ) ;
                                            }
                                            break ;
                                        }
                                    }
                                }
                    
                                bRet = true ;
                            }
                        }
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
    Alloy.Globals.ShedCurrentSignPath1 = "" ;
    Alloy.Globals.ShedCurrentSignPath2 = "" ;
    Alloy.Globals.ShedCurrentSignPath3 = "" ;

    // Extraction of the Team component data
    Alloy.Collections.ShedModePD.fetch( { query: "SELECT * FROM ShedPD" } ) ;

    // If there are the rows, we fill all the text field with the data inside this row
    // If the rows are not present, this is the first time that the we fill the Team Personal Data
    if( Alloy.Collections.ShedModePD.length > 0 )
    {
        for( var i = 0 ; i < Alloy.Collections.ShedModePD.length ; i++ )
        {
            var personalData = Alloy.Collections.ShedModePD.at( i ) ;
            switch( personalData.get( "COMPONENT_NUMBER" ) )
            {
                case 1:
                {
                    $.widgetAppTextFieldName1.set_text_value( personalData.get( "NAME" ) ) ;
                    id1 = personalData.get( "ID" ) ;
                    Alloy.Globals.ShedCurrentSignPath1 = personalData.get( "SIGN_PATH" ) ;
                }
                break ;

                case 2:
                {
                    $.widgetAppTextFieldName2.set_text_value( personalData.get( "NAME" ) ) ;
                    id2 = personalData.get( "ID" ) ;
                    Alloy.Globals.ShedCurrentSignPath2 = personalData.get( "SIGN_PATH" ) ;
                }
                break ;

                case 3:
                {
                    $.widgetAppTextFieldName3.set_text_value( personalData.get( "NAME" ) ) ;
                    id3 = personalData.get( "ID" ) ;
                    Alloy.Globals.ShedCurrentSignPath3 = personalData.get( "SIGN_PATH" ) ;
                }
                break ;
            }
        }
    }

    Alloy.Globals.ShedCurrentSign1 = null ;
    Alloy.Globals.ShedCurrentSign2 = null ;
    Alloy.Globals.ShedCurrentSign3 = null ;

    // Init app textfields
    $.widgetAppTextFieldName1.init( L( 'generic_name_1_txt_hint' ) ) ;
    $.widgetAppTextFieldName2.init( L( 'generic_name_2_txt_hint' ) ) ;
    $.widgetAppTextFieldName3.init( L( 'generic_name_3_txt_hint' ) ) ;

    // Init app buttons
    $.widgetAppButtonCreateSign1.init( '/images/create_sign_normal.png' , '/images/create_sign_pressed.png' , '/images/create_sign_disabled.png' , L( 'generic_create_sign_1_btn_title' ) , OnBtnCreateSign1_Click ) ;
    $.widgetAppButtonViewSign1.init( '/images/view_sign_normal.png' , '/images/view_sign_pressed.png' , '/images/view_sign_disabled.png' , L( 'generic_view_sign_1_btn_title' ) , OnBtnViewSign1_Click ) ;

    $.widgetAppButtonCreateSign2.init( '/images/create_sign_normal.png' , '/images/create_sign_pressed.png' , '/images/create_sign_disabled.png' , L( 'generic_create_sign_2_btn_title' ) , OnBtnCreateSign2_Click ) ;
    $.widgetAppButtonViewSign2.init( '/images/view_sign_normal.png' , '/images/view_sign_pressed.png' , '/images/view_sign_disabled.png' , L( 'generic_view_sign_2_btn_title' ) , OnBtnViewSign2_Click ) ;

    $.widgetAppButtonCreateSign3.init( '/images/create_sign_normal.png' , '/images/create_sign_pressed.png' , '/images/create_sign_disabled.png' , L( 'generic_create_sign_3_btn_title' ) , OnBtnCreateSign3_Click ) ;
    $.widgetAppButtonViewSign3.init( '/images/view_sign_normal.png' , '/images/view_sign_pressed.png' , '/images/view_sign_disabled.png' , L( 'generic_view_sign_3_btn_title' ) , OnBtnViewSign3_Click ) ;

    RegisterHideKeyboard( $.shedPersonalDataWindow ,
    [
        $.widgetAppTextFieldName1.get_text_field() ,
        $.widgetAppTextFieldName2.get_text_field() ,
        $.widgetAppTextFieldName3.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the other controls must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSPD.open() ;
    }
    else
    {
        // Init app buttons (Android)
        $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' ,  '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;

        // Opening the Window
        $.shedPersonalDataWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
