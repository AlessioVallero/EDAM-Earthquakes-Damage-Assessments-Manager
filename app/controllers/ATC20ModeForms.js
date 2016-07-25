var args = arguments[0] || {} ;
var current_mode = args.mode ;

var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.btnLogout ) ;
controls.push( $.btnExportCSV ) ;
controls.push( $.tableViewATC20ModeForms ) ;
controls.push( $.widgetAppButtonAdd.get_button() ) ;
controls.push( $.widgetAppButtonServerSynch.get_button() ) ;
controls.push( $.widgetAppButtonEID.get_button() ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

var bCanClickOnTableView = true ;

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
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
        controls = null ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowATC20ModeForms.close() ;
        }
        else
        {
            $.atc20ModeFormsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Rebuild the table
function RebuildTable( e )
{
    // If a session exist, we'll show the Forms of that User and the Forms that are not already synchronized
    if( Alloy.Globals.ExistSession() )
    {
        // Resets the model's state from the database useful if we want to ensure to have the latest database state.
        Alloy.Collections.ATC20Forms.fetch( { query: "SELECT * FROM ATC20Forms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "' and MODE='" + current_mode + "'" } ) ;
    }
    else
    {
        $.btnLogout.visible = false ;
        // Resets the model's state from the database useful if we want to ensure to have the latest database state.
        Alloy.Collections.ATC20Forms.fetch( { query: "SELECT * FROM ATC20Forms where USER is null or USER = '' and MODE='" + current_mode + "'" } ) ;
    }

    // Changing the background color of the row of this form and adding a check image on it
    if( $.tableViewATC20ModeForms.data && $.tableViewATC20ModeForms.data.length > 0 )
    {
        var detailedImg = "" ;
        var rapidImg = "" ;
        if( current_mode == "CA" || current_mode == "NEPAL" )
        {
            detailedImg = "/images/detailed.png" ;
            rapidImg = "/images/rapid.png" ;
        }
        else if( current_mode == "NZ" )
        {
            detailedImg = "/images/level2.png" ;
            rapidImg = "/images/level1.png" ;
        }

        for( var i = 0 ; i < $.tableViewATC20ModeForms.data[0].rows.length ; i++ )
        {
            var currentRow = $.tableViewATC20ModeForms.data[0].rows[i] ;
            if( currentRow.isSynchronized == "1" )
            {
                currentRow.children[0].setVisible( true ) ;
            }
            else
            {
                currentRow.children[0].setVisible( false ) ;
            }

            if( currentRow.formType == "0" )
            {
                currentRow.children[2].setImage( detailedImg ) ;
            }
            else
            {
                currentRow.children[2].setImage( rapidImg ) ;
            }
        }
        $.tableViewATC20ModeForms.setVisible( true ) ;
    }
    else
    {
        $.tableViewATC20ModeForms.setVisible( false ) ;
    }
}

// Manage the external update of authentication info
function UpdateAuthenticationInfo( auth_done )
{
    if( auth_done )
    {
        // If the Logout button is not visible, we were offline and now we must switch to online because the auth:done event is fired
        if( !$.btnLogout.visible )
        {
            $.btnLogout.visible = true ;
            current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;
            // Set welcome label text
            $.lblWelcome.setText( current_logged_username ) ;

            RebuildTable() ;
        }
    }
    else
    {
        Alloy.Globals.ResetSession() ;

        $.btnLogout.visible = false ;
        current_logged_username = L( 'generic_welcome_offline_text_msg' ) ;
        // Set welcome label text
        $.lblWelcome.setText( current_logged_username ) ;
    }
}

// Logout button click event handler
function OnBtnLogout_Click( e )
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
                var loader = Titanium.Network.createHTTPClient() ;
                loader.validatesSecureCertificate = false ;

                // Runs the function when the data is ready for us to process
                loader.onload = function() 
                {
                    EndAsyncBusyAction( $.activity_indicator , controls ) ;

                    Alloy.Globals.ResetSession() ;

                    $.btnLogout.visible = false ;
                    current_logged_username = L( 'generic_welcome_offline_text_msg' ) ;
                    // Set welcome label text
                    $.lblWelcome.setText( current_logged_username ) ;

                    RebuildTable() ;
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
                    // Session ID
                    SID: Alloy.Globals.SessionId
                } ;

                loader.timeout = Alloy.Globals.LogoutTimeoutMillisecs ;
                loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Logout.php" ) ;

                loader.send( params ) ;
            } ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Manage the export CSV
function ManageExportCSV()
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , ManageExportCSV ) ;

    UpdateAuthenticationInfo( true ) ;

    try
    {
        // AlertDialog to ask user about the type of export CSV (all users or just yourself)
        var alertDialog = Titanium.UI.createAlertDialog(
        {
            title: L( 'generic_export_csv_type_title' ) ,
            message: L( 'export_csv_type_msg' ) ,             
            buttonNames: [ L( 'generic_complete_export_csv_msg' ) , L( 'generic_current_user_export_csv_msg' ) ] ,
            cancel: 1
        } ) ;
        alertDialog.addEventListener( 'click' , function( e )
        {
            var loader = Titanium.Network.createHTTPClient() ;
            loader.validatesSecureCertificate = false ;

            // Runs the function when the data is ready for us to process
            loader.onload = function() 
            {
                if( this.responseText && this.responseText.substring( 0 , 6 ) != "ERROR_" )
                {
                    // The file will be stored in the temporary directory 
                    var fileExportCSV = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , "fieldnotes.csv" ) ;

                    if( fileExportCSV.exists() )
                    {
                        // Delete old file if it exists
                        fileExportCSV.deleteFile() ;
                    }
                    // Write the file data
                    fileExportCSV.write( this.responseData ) ;

                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    // Sending the file by email
                    var emailDialog = Ti.UI.createEmailDialog() ;
                    if( emailDialog.isSupported() )
                    {
                        emailDialog.subject = L( "send_export_csv_dlg_subject" ) ;
                        emailDialog.addAttachment( fileExportCSV ) ;
                        emailDialog.messageBody = L( "generic_export_csv_your_export_text_msg" ) ;
                        emailDialog.open() ;
                    }
                    else
                    {
                        alert( L( 'no_email_client_configured_msg' ) ) ;
                    }
                }
                else
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    switch( this.responseText )
                    {
                        case "ERROR_CODE_1":
                        {
                            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) ) ;
                        }
                        break ;

                        case "ERROR_CODE_2":
                        {
                            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_expired_err_msg' ) ) ;
                        }
                        break ;

                        case "ERROR_CODE_3":
                        {
                            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_connection_error_err_msg' ) ) ;
                        }
                        break ;

                        case "ERROR_CODE_4":
                        {
                            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_invalid_user_err_msg' ) ) ;
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
                // Session ID
                SID: Alloy.Globals.SessionId ,
                // Export of All users data?
                ALL_USERS: e.index == 0 ? "true" : "false"
            } ;

            loader.timeout = Alloy.Globals.ATC20ExportCSVTimeoutMillisecs ;
            loader.open( "POST" , "https://www.edam.resiltronics.org/ATC20NepalExportCSV.php" ) ;

            loader.send( params ) ;
        } ) ;
        // Show alert message for saving
        alertDialog.show() ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
    }
}

// Function to get the file from the server
function ExportCSV( need_authentication )
{
    try
    {
        if( need_authentication )
        {
            UpdateAuthenticationInfo( false ) ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                if( need_authentication )
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , ManageExportCSV ) ;
                    Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
                }
                else
                {
                    ManageExportCSV() ;
                }

            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// ExportCSV button click event handler
function OnBtnExportCSV_Click( e )
{
    try
    {
        if( bCanClickOnTableView )
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

                    bCanClickOnTableView = false ;
                    bIsWorkInProgress = true ;

                    // If a local session exist, we will ask to the server if it's still valid
                    if( Alloy.Globals.ExistSession() )
                    {
                        var loader = Titanium.Network.createHTTPClient() ;
                        loader.validatesSecureCertificate = false ;

                        // Runs the function when the data is ready for us to process
                        loader.onload = function() 
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            ExportCSV( this.responseText == "Expired" ) ;
                        } ;
                         // Function called when an error occurs, including a timeout
                        loader.onerror = function( e )
                        {
                            EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                        } ;

                        var params =
                        {
                            // Key
                            key: "EDAM" ,
                            // Session ID
                            SID: Alloy.Globals.SessionId ,
                            // Echo enabled
                            ECHO_ENABLED: true
                        } ;

                        loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs ;
                        loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php" ) ;

                        loader.send( params ) ;
                    }
                    else
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        ExportCSV( true ) ;
                    }

                    return bRet ;
                } , EndAsyncBusyAction_CallBack ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;

        bCanClickOnTableView = true ;
        bIsWorkInProgress = false ;
    }
}

// Window close event handler
function OnATC20ModeFormsWindow_Close()
{
    // Since we are referencing a global collection for our bindings,
    // make sure to call $.destroy() when you are done with the
    // controller/window. This will ensure that no memory is
    // leaked and that the bindings are properly released.
    $.destroy() ;
}

// TableView click event handler
function OnTableViewForms_Click( e )
{
    try
    {
        if( bCanClickOnTableView )
        {
            BusyAction( $.activity_indicator , controls , function()
            {
                var bRet = false ;

                // If it's clicked the delete button
                if( e.source.clickName == 'deleteButton' )
                {
                    if( e.row )
                    {
                        // Row in the DB
                        if( e.row.rowId )
                        {
                            // AlertDialog to ask user if is sure to delete the form, because this operation cannot be reverted in the future
                            var alertDialogDeleteForm = Titanium.UI.createAlertDialog(
                            {
                                title: L( 'generic_delete_form_title' ) ,
                                message: L( 'delete_form_msg' ) ,             
                                buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                                cancel: 1
                            } ) ;
                            alertDialogDeleteForm.addEventListener( 'click' , function( event )
                            {
                                if( event.index == 0 )
                                {
                                    // Recovering all the videos
                                    var recoverVideoGallery = Alloy.createCollection( 'ATC20FormsVideos' ) ;
                                    recoverVideoGallery.fetch(
                                    {
                                        query: "SELECT VIDEO_PATH FROM ATC20FormsVideos where FORM_ID=" + e.row.rowId
                                    } ) ;
                                    if( recoverVideoGallery.length > 0 )
                                    {
                                        // Delete related videos from the file system
                                        for( var i = 0 ; i < recoverVideoGallery.length ; i++ )
                                        {
                                            var video = recoverVideoGallery.at( i ) ;
                                            var video_path = video.get( "VIDEO_PATH" ) ;
                                            var file = Alloy.Globals.getFileForRead( video_path ) ;
                                            if( file )
                                            {
                                                // The video will be dropped
                                                file.deleteFile() ;
                                            }
                                        }
                                    }

                                    // Delete related videos from the DB
                                    var recoverVideo = Alloy.createCollection( 'ATC20FormsVideos' ) ;
                                    recoverVideo.fetch( { query:"SELECT * FROM ATC20FormsVideos where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverVideo.length > 0 )
                                    {
                                        var model = recoverVideo.at( 0 ) ;
                                        recoverVideo.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    // Recovering all the pictures
                                    var recoverPictureGallery = Alloy.createCollection( 'ATC20FormsImages' ) ;
                                    recoverPictureGallery.fetch(
                                    {
                                        query: "SELECT IMAGE_PATH FROM ATC20FormsImages where FORM_ID=" + e.row.rowId
                                    } ) ;
                                    if( recoverPictureGallery.length > 0 )
                                    {
                                        // Delete related pictures from the file system
                                        for( var i = 0 ; i < recoverPictureGallery.length ; i++ )
                                        {
                                            var image = recoverPictureGallery.at( i ) ;
                                            var image_path = image.get( "IMAGE_PATH" ) ;
                                            var file = Alloy.Globals.getFileForRead( image_path ) ;
                                            if( file )
                                            {
                                                // The picture will be dropped
                                                file.deleteFile() ;
                                            }
                                        }
                                    }

                                    // Delete related pictures from the DB
                                    var recoverPictures = Alloy.createCollection( 'ATC20FormsImages' ) ;
                                    recoverPictures.fetch( { query:"SELECT * FROM ATC20FormsImages where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverPictures.length > 0 )
                                    {
                                        var model = recoverPictures.at( 0 ) ;
                                        recoverPictures.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverBuildingDescription = Alloy.createCollection( 'ATC20FormsBuildingDescription' ) ;
                                    recoverBuildingDescription.fetch( { query: "SELECT * FROM ATC20FormsBuildingDescription where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverBuildingDescription.length > 0 )
                                    {
                                        var model = recoverBuildingDescription.at( 0 ) ;
                                        recoverBuildingDescription.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    if( e.row.formType && e.row.formType == "0" )
                                    {
                                        var recoverDetailedEvaluation = Alloy.createCollection( 'ATC20FormsDetailedEvaluation' ) ;
                                        recoverDetailedEvaluation.fetch( { query: "SELECT * FROM ATC20FormsDetailedEvaluation where FORM_ID = " + e.row.rowId } ) ;
                                        if( recoverDetailedEvaluation.length > 0 )
                                        {
                                            var model = recoverDetailedEvaluation.at( 0 ) ;

                                            // Deleting the sketch, if necessary
                                            if( model["SKETCH_PATH"] )
                                            {
                                                var file = Alloy.Globals.getFileForRead( model["SKETCH_PATH"] ) ;
                                                if( file )
                                                {
                                                    // The sketch will be dropped
                                                    file.deleteFile() ;
                                                }
                                            }

                                            recoverDetailedEvaluation.remove( model ) ;
                                            model.destroy() ;
                                        }

                                        var recoverDetailedPosting = Alloy.createCollection( 'ATC20FormsDetailedPosting' ) ;
                                        recoverDetailedPosting.fetch( { query: "SELECT * FROM ATC20FormsDetailedPosting where FORM_ID = " + e.row.rowId } ) ;
                                        if( recoverDetailedPosting.length > 0 )
                                        {
                                            var model = recoverDetailedPosting.at( 0 ) ;
                                            recoverDetailedPosting.remove( model ) ;
                                            model.destroy() ;
                                        }
                                    }
                                    else
                                    {
                                        var recoverRapidEvaluation = Alloy.createCollection( 'ATC20FormsRapidEvaluation' ) ;
                                        recoverRapidEvaluation.fetch( { query: "SELECT * FROM ATC20FormsRapidEvaluation where FORM_ID = " + e.row.rowId } ) ;
                                        if( recoverRapidEvaluation.length > 0 )
                                        {
                                            var model = recoverRapidEvaluation.at( 0 ) ;
                                            recoverRapidEvaluation.remove( model ) ;
                                            model.destroy() ;
                                        }

                                        var recoverRapidPosting = Alloy.createCollection( 'ATC20FormsRapidPosting' ) ;
                                        recoverRapidPosting.fetch( { query: "SELECT * FROM ATC20FormsRapidPosting where FORM_ID = " + e.row.rowId } ) ;
                                        if( recoverRapidPosting.length > 0 )
                                        {
                                            var model = recoverRapidPosting.at( 0 ) ;
                                            recoverRapidPosting.remove( model ) ;
                                            model.destroy() ;
                                        }
                                    }

                                    var recoverFurtherActions = Alloy.createCollection( 'ATC20FormsFurtherActions' ) ;
                                    recoverFurtherActions.fetch( { query: "SELECT * FROM ATC20FormsFurtherActions where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverFurtherActions.length > 0 )
                                    {
                                        var model = recoverFurtherActions.at( 0 ) ;
                                        recoverFurtherActions.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverForm = Alloy.createCollection( 'ATC20Forms' ) ;
                                    recoverForm.fetch( { query: "SELECT * FROM ATC20Forms where ID = " + e.row.rowId } ) ;
                                    if( recoverForm.length > 0 )
                                    {
                                        var model = recoverForm.at( 0 ) ;
                                        recoverForm.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    RebuildTable() ;
                                }
                            } ) ;
                            // Show alert message
                            alertDialogDeleteForm.show() ;
                        }
                    }
                }
                else
                {
                    var rowId = e.row.rowId ;
                    var isSynchronized = e.row.isSynchronized ;
                    if( isSynchronized == "1" )
                    {
                        var dialog = Ti.UI.createAlertDialog(
                        {
                            message: L( 'generic_form_synchronized_info_msg' ) ,
                            ok: L( 'generic_ok_msg' ) ,
                            title: L( 'generic_info_title' )
                        } ) ;
                        dialog.addEventListener( 'click', function( event )
                        {
                            Alloy.Globals.ProtectedAddEventListener( Ti.App , "atc20_mode:save" , RebuildTable ) ;
                            // Controller creation for the Next View (inited in ATC20 Mode)
                            Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsGeneralSection' , { mode: current_mode , form_id: rowId , is_synchronized: isSynchronized , atc20_type: e.row.formType } ) ;
                        } ) ;
                        dialog.show() ;
                    }
                    else
                    {
                        Alloy.Globals.ProtectedAddEventListener( Ti.App , "atc20_mode:save" , RebuildTable ) ;
                        // Controller creation for the Next View (inited in ATC20 Mode)
                        Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsGeneralSection' , { mode: current_mode , form_id: rowId , is_synchronized: isSynchronized , atc20_type: e.row.formType } ) ;
                    }
                }

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

// Add button click event handler
function OnBtnAdd_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            var optionDlgTitle = "" ;
            var detailedOption = "" ;
            var rapidOption = "" ;
            if( current_mode == "CA" )
            {
                optionDlgTitle = L( "atc20_type_selection_title" ) ;
                detailedOption = L( "atc20_detailed_msg" ) ;
                rapidOption = L( "atc20_rapid_msg" ) ;
            }
            else if( current_mode == "NZ" )
            {
                optionDlgTitle = L( "atc20_nz_type_selection_title" ) ;
                detailedOption = L( "atc20_nz_detailed_msg" ) ;
                rapidOption = L( "atc20_nz_rapid_msg" ) ;
            }
            else if( current_mode == "NEPAL" )
            {
                optionDlgTitle = L( "atc20_nepal_type_selection_title" ) ;
                detailedOption = L( "atc20_nepal_detailed_msg" ) ;
                rapidOption = L( "atc20_nepal_rapid_msg" ) ;
            }

            // OptionDialog to ask user about the type of ATC-20 form desired
            var optionDialog = Ti.UI.createOptionDialog(
            {
                title: optionDlgTitle ,
                cancel: 2 ,
                options: [ detailedOption , rapidOption , L( 'generic_cancel_btn_title' ) ] ,
                selectedIndex: 0
            } ) ;
            optionDialog.addEventListener( 'click' , function( e )
            {
                if( e.index == 2 )
                {
                    // Cancel pressed, nothing to do
                }
                else
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "atc20_mode:save" , RebuildTable ) ;
                    // Controller creation for the Next View (inited in ATC20 Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'ATC20ModeFormsGeneralSection' , { mode: current_mode , form_id: -1 , is_synchronized: "0" , atc20_type: e.index } ) ;
                }
            } ) ;
            // Show OptionDialog about the type of ATC-20 form
            optionDialog.show() ;

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        bCanClickOnTableView = true ;
    }
}

// ServerSynch button click event handler
function OnBtnServerSynch_Click( e )
{
    OnBtnServerSynch() ;
}

// Function when the ServerSynch button is pressed
function OnBtnServerSynch()
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

                bCanClickOnTableView = false ;

                // If a local session exist, we will ask to the server if it's still valid
                if( Alloy.Globals.ExistSession() )
                {
                    var loader = Titanium.Network.createHTTPClient() ;
                    loader.validatesSecureCertificate = false ;

                    // Runs the function when the data is ready for us to process
                    loader.onload = function() 
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        ServerSynch( this.responseText == "Expired" ) ;
                    } ;
                     // Function called when an error occurs, including a timeout
                    loader.onerror = function( e )
                    {
                        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + e.error ) ;
                    } ;

                    var params =
                    {
                        // Key
                        key: "EDAM" ,
                        // Session ID
                        SID: Alloy.Globals.SessionId ,
                        // Echo enabled
                        ECHO_ENABLED: true
                    } ;

                    loader.timeout = Alloy.Globals.SessioneControlloTimeoutMillisecs ;
                    loader.open( "POST" , "https://www.edam.resiltronics.org/Security/Sessione_Controllo.php" ) ;

                    loader.send( params ) ;
                }
                else
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    ServerSynch( true ) ;
                }

                return bRet ;
            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_upload_queue = null ;

// Function to synchronize forms with the server
function ServerSynch( need_authentication )
{
    try
    {
        if( need_authentication )
        {
            Alloy.Globals.ResetSession() ;

            $.btnLogout.visible = false ;
            current_logged_username = L( 'generic_welcome_offline_text_msg' ) ;
            // Set welcome label text
            $.lblWelcome.setText( current_logged_username ) ;
        }

        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            BeginAsyncBusyAction( $.activity_indicator , controls , function()
            {
                var ATC20ModeUtils = require( '/ATC20ModeUtils' ) ;

                var uploadQueue = new Array() ;

                var all_media_found = true ;

                // Recover all the forms of this User
                var recoverInspection = ATC20ModeUtils.LoadInspectionQuery( null , current_mode ) ;
                if( recoverInspection.length > 0 )
                {
                    // Process this form
                    for( var i = 0 ; i < recoverInspection.length ; i++ )
                    {
                        var inspection = recoverInspection.at( i ) ;
                        var form_id = inspection.get( "ID" ) ;
                        var form_type = inspection.get( "TYPE" ) ;

                        var params =
                        {
                            // Key
                            key: "EDAM" ,
                            // The Form ID
                            ID: form_id ,
                            // Inspection
                            INSPECTOR_ID: inspection.get( "INSPECTOR_ID" ) ,
                            DATE: inspection.get( "DATE" ) ,
                            FINAL_POSTING: inspection.get( "FINAL_POSTING" ) ,
                            AFFILIATION: inspection.get( "AFFILIATION" ) ,
                            MODE: inspection.get( "MODE" )
                        } ;

                        // Recover BUILDING DESCRIPTION
                        var recoverBuildingDescription = ATC20ModeUtils.LoadBuildingDescriptionQuery( form_id ) ;

                        // Process BUILDING DESCRIPTION
                        if( recoverBuildingDescription.length > 0 )
                        {
                            var buildingDescription = recoverBuildingDescription.at( 0 ) ;
                            params["BUILDING_NAME"] = buildingDescription.get( "BUILDING_NAME" ) ;
                            params["ALSO_KNOWN_AS"] = buildingDescription.get( "ALSO_KNOWN_AS" ) ;
                            params["LOT"] = buildingDescription.get( "LOT" ) ;
                            params["DP"] = buildingDescription.get( "DP" ) ;
                            params["OTHER_ID"] = buildingDescription.get( "OTHER_ID" ) ;
                            params["CONTACT_NAME"] = buildingDescription.get( "CONTACT_NAME" ) ;
                            params["ADDRESS"] = buildingDescription.get( "ADDRESS" ) ;
                            params["BUILDING_CONTACT"] = buildingDescription.get( "BUILDING_CONTACT" ) ;
                            params["UNDERGROUND_PLANS_NO"] = buildingDescription.get( "UNDERGROUND_PLANS_NO" ) ;
                            params["NOT_UNDERGROUND_PLANS_NO"] = buildingDescription.get( "NOT_UNDERGROUND_PLANS_NO" ) ;
                            params["APPROX_FT_AREA"] = buildingDescription.get( "APPROX_FT_AREA" ) ;
                            params["RESIDENTIAL_UNITS"] = buildingDescription.get( "RESIDENTIAL_UNITS" ) ;
                            params["RESIDENTIAL_UNITS_UNINHABITABLE"] = buildingDescription.get( "RESIDENTIAL_UNITS_UNINHABITABLE" ) ;
                            params["TYPE_OF_CONSTRUCTION"] = buildingDescription.get( "TYPE_OF_CONSTRUCTION" ) ;
                            params["OTHER_TYPE_OF_CONSTRUCTION"] = buildingDescription.get( "OTHER_TYPE_OF_CONSTRUCTION" ) ;
                            params["PRIMARY_OCCUPANCY"] = buildingDescription.get( "PRIMARY_OCCUPANCY" ) ;
                            params["OTHER_PRIMARY_OCCUPANCY"] = buildingDescription.get( "OTHER_PRIMARY_OCCUPANCY" ) ;
                        }

                        var uploadQueueURL = "https://www.edam.resiltronics.org/ReceiveATC20DetailedModeForm.php" ;
                        if( form_type == "0" )
                        {
                            // Recover EVALUATION
                            var recoverDetailedEvaluation = ATC20ModeUtils.LoadDetailedEvaluationQuery( form_id ) ;

                            // Process EVALUATION
                            if( recoverDetailedEvaluation.length > 0 )
                            {
                                var detailedEvaluation = recoverDetailedEvaluation.at( 0 ) ;
                                params["EVALUATION"] = detailedEvaluation.get( "EVALUATION" ) ;
                                params["OVERALL_HAZARDS_COMMENTS"] = detailedEvaluation.get( "OVERALL_HAZARDS_COMMENTS" ) ;
                                params["OVERALL_HAZARDS_OTHER"] = detailedEvaluation.get( "OVERALL_HAZARDS_OTHER" ) ;
                                params["STRUCTURAL_HAZARDS_COMMENTS"] = detailedEvaluation.get( "STRUCTURAL_HAZARDS_COMMENTS" ) ;
                                params["STRUCTURAL_HAZARDS_OTHER"] = detailedEvaluation.get( "STRUCTURAL_HAZARDS_OTHER" ) ;
                                params["NONSTRUCTURAL_HAZARDS_COMMENTS"] = detailedEvaluation.get( "NONSTRUCTURAL_HAZARDS_COMMENTS" ) ;
                                params["NONSTRUCTURAL_HAZARDS_OTHER"] = detailedEvaluation.get( "NONSTRUCTURAL_HAZARDS_OTHER" ) ;
                                params["GEOTECHNICAL_HAZARDS_COMMENTS"] = detailedEvaluation.get( "GEOTECHNICAL_HAZARDS_COMMENTS" ) ;
                                params["GEOTECHNICAL_HAZARDS_OTHER"] = detailedEvaluation.get( "GEOTECHNICAL_HAZARDS_OTHER" ) ;
                                params["GENERAL_COMMENTS"] = detailedEvaluation.get( "GENERAL_COMMENTS" ) ;
                                params["ESTIMATED_BUILDING_DAMAGE"] = detailedEvaluation.get( "ESTIMATED_BUILDING_DAMAGE" ) ;

                                var sketch_image_content = "" ;
                                var sketch_path = detailedEvaluation.get( "SKETCH_PATH" ) ;
                                if( sketch_path )
                                {
                                    // If the sketch is not modified, the path must be build
                                    var sketchFile = Alloy.Globals.getFileForRead( sketch_path ) ;

                                    if( sketchFile )
                                    {
                                        sketch_image_content = sketchFile.read() ;
                                    }
                                }
                                params["SKETCH_IMAGE"] = sketch_image_content ;
                            }

                            // Recover POSTING
                            var recoverDetailedPosting = ATC20ModeUtils.LoadDetailedPostingQuery( form_id ) ;

                            // Process POSTING
                            if( recoverDetailedPosting.length > 0 )
                            {
                                var detailedPosting = recoverDetailedPosting.at( 0 ) ;
                                params["PREVIOUS_POSTING"] = detailedPosting.get( "PREVIOUS_POSTING" ) ;
                                params["PREVIOUS_POSTING_INSPECTOR_ID"] = detailedPosting.get( "PREVIOUS_POSTING_INSPECTOR_ID" ) ;
                                params["PREVIOUS_POSTING_DATE"] = detailedPosting.get( "PREVIOUS_POSTING_DATE" ) ;
                                params["POSTING"] = detailedPosting.get( "POSTING" ) ;
                                params["CLASSIFICATION"] = detailedPosting.get( "CLASSIFICATION" ) ;
                                params["USE_AND_ENTRY_RESTRICTIONS"] = detailedPosting.get( "USE_AND_ENTRY_RESTRICTIONS" ) ;
                            }
                        }
                        else
                        {
                            uploadQueueURL = "https://www.edam.resiltronics.org/ReceiveATC20RapidModeForm.php" ;

                            params["AREAS_INSPECTED"] = inspection.get( "AREAS_INSPECTED" ) ;

                            // Recover EVALUATION
                            var recoverRapidEvaluation = ATC20ModeUtils.LoadRapidEvaluationQuery( form_id ) ;

                            // Process EVALUATION
                            if( recoverRapidEvaluation.length > 0 )
                            {
                                var rapidEvaluation = recoverRapidEvaluation.at( 0 ) ;
                                params["EVALUATION"] = rapidEvaluation.get( "EVALUATION" ) ;
                                params["OTHER_OBSERVED_CONDITIONS"] = rapidEvaluation.get( "OTHER_OBSERVED_CONDITIONS" ) ;
                                params["GENERAL_COMMENTS"] = rapidEvaluation.get( "GENERAL_COMMENTS" ) ;
                                params["ESTIMATED_BUILDING_DAMAGE"] = rapidEvaluation.get( "ESTIMATED_BUILDING_DAMAGE" ) ;
                            }

                            // Recover POSTING
                            var recoverRapidPosting = ATC20ModeUtils.LoadRapidPostingQuery( form_id ) ;

                            // Process POSTING
                            if( recoverRapidPosting.length > 0 )
                            {
                                var rapidPosting = recoverRapidPosting.at( 0 ) ;
                                params["POSTING"] = rapidPosting.get( "POSTING" ) ;
                                params["CLASSIFICATION"] = rapidPosting.get( "CLASSIFICATION" ) ;
                                params["USE_AND_ENTRY_RESTRICTIONS"] = rapidPosting.get( "USE_AND_ENTRY_RESTRICTIONS" ) ;
                            }
                        }

                        // Recover FURTHER ACTIONS
                        var recoverFurtherActions = ATC20ModeUtils.LoadFurtherActionsQuery( form_id ) ;

                        // Process FURTHER ACTIONS
                        if( recoverFurtherActions.length > 0 )
                        {
                            var furtherActions = recoverFurtherActions.at( 0 ) ;
                            params["BARRICADES_IN_THE_FOLLOWING_AREAS"] = furtherActions.get( "BARRICADES_IN_THE_FOLLOWING_AREAS" ) ;
                            params["EVALUATION_RECOMMENDED"] = furtherActions.get( "EVALUATION_RECOMMENDED" ) ;
                            params["OTHER_EVALUATION_RECOMMENDED"] = furtherActions.get( "OTHER_EVALUATION_RECOMMENDED" ) ;
                            params["OTHER_RECOMMENDATIONS"] = furtherActions.get( "OTHER_RECOMMENDATIONS" ) ;
                            params["COMMENTS"] = furtherActions.get( "COMMENTS" ) ;
                        }

                        // Recover IMAGES and VIDEOS
                        var media_array = ATC20ModeUtils.CreateMediaArray( form_id , false ) ;
                        // Process IMAGES and VIDEOS
                        if( media_array && media_array.length > 0 )
                        {
                            var zipContent = new Array() ;

                            for( var j = 1 ; j <= media_array.length ; j++ )
                            {
                                var media = media_array[j-1] ;

                                all_media_found &= media.media_found ;

                                if( media.media_found )
                                {
                                    // Adding the media file to the zip archive
                                    zipContent.push( media.media ) ;
                                    // Create data file for this media
                                    var fileName = null ;
                                    if( media.type == "PIC" )
                                    {
                                        fileName = media.path.replace( ".png" , "" ) ;
                                    }
                                    else if( media.type == "VID" )
                                    {
                                        fileName = media.path.replace( ".3gp" , "" ) ;
                                    }
                                    else
                                    {
                                        fileName = "" ;
                                    }
                                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , fileName + "_data.dat" ) ;
                                    newFile.write( "Type: " + media.type + "\nLatitude: " + media.latitude + "\nLongitude: " + media.longitude + "\nAddress: " + media.address + "\nHeading: " + media.heading + "\nDamages level: " + media.damages_level + "\nDamages area: " + media.damages_area + "\nComment: " + media.comment ) ;
                                    // Adding the media file data to the zip archive
                                    zipContent.push( newFile.getNativePath() ) ;
                                }
                            }

                            if( zipContent && zipContent.length > 0 )
                            {
                                // Creating the zip archive
                                var formZipArchive = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , 'Form_' + form_id + '.zip' ) ;
                                if( formZipArchive.exists() )
                                {
                                    // A previous zip file will be dropped
                                    formZipArchive.deleteFile() ;
                                }
                                var compressedZipArchive = require( 'ti.compression' ) ;
                                var result = compressedZipArchive.zip( formZipArchive.getNativePath() , zipContent ) ;
                                params["MEDIA_ZIP_ARCHIVE"] = formZipArchive.read() ;
                            }
                        }

                        uploadQueue.push( { content: params , url: uploadQueueURL } ) ;
                    }
                }

                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
                if( uploadQueue && uploadQueue.length > 0 )
                {
                    if( all_media_found )
                    {
                        current_upload_queue = uploadQueue ;
                        if( need_authentication )
                        {
                            Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , ManageUploadQueueServerSync ) ;
                            Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
                        }
                        else
                        {
                            ManageUploadQueueServerSync() ;
                        }
                    }
                    else
                    {
                        // AlertDialog to ask user if want to synchronize with missing media contents
                        var alertDialog = Titanium.UI.createAlertDialog(
                        {
                            title: L( 'generic_missing_media_contents_title' ) ,
                            message: L( 'missing_media_contents_msg' ) ,             
                            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                            cancel: 1
                        } ) ;
                        alertDialog.addEventListener( 'click' , function( e )
                        {
                            if( e.index == 0 )
                            {
                                current_upload_queue = uploadQueue ;
                                if( need_authentication )
                                {
                                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "auth:done" , ManageUploadQueueServerSync ) ;
                                    Alloy.Globals.createAndOpenControllerExt( 'UserAuthenticationView' ) ;
                                }
                                else
                                {
                                    ManageUploadQueueServerSync() ;
                                }
                            }
                            else
                            {
                                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
                            }
                        } ) ;
                        // Show alert message
                        alertDialog.show() ;
                    }
                }
                else
                {
                    alert( L( 'no_contents_to_upload_msg' ) ) ;
                }
            } , EndAsyncBusyAction_CallBack ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Manage the upload queue for the Server Synch
function ManageUploadQueueServerSync()
{
    Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "auth:done" , ManageUploadQueueServerSync ) ;

    // If the Logout button is not visible, we were offline and now we must switch to online because the auth:done event is fired
    if( !$.btnLogout.visible )
    {
        $.btnLogout.visible = true ;
        current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;
        // Set welcome label text
        $.lblWelcome.setText( current_logged_username ) ;

        RebuildTable() ;
    }

    var ContentsUploader = require( '/ContentsUploader' ) ;
    var contentsUploader = new ContentsUploader() ;

    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

    bCanClickOnTableView = false ;

    // Setting the current SessionId
    for( var i = 0 ; i < current_upload_queue.length ; i++ )
    {
        // Session ID
        current_upload_queue[i].content["SID"] = Alloy.Globals.SessionId ;
    }

    var failedToUploadContents = new Array() ;
    contentsUploader.uploadMultiContents( current_upload_queue , "" , $.atc20ModeFormsWindow , function( e )
    {
        try
        {
            var error_occurred = false ;

            var json = e.response_text ;
            var response = JSON.parse( json ) ;
            if( e.status == 200 )
            {
                if( response.OK == true )
                {
                    // OK - Updating the column SYNCHRONIZED of this form and also the column USER (synchronize a Form means also become the owner)
                    var recoverInspection = Alloy.createCollection( 'ATC20Forms' ) ;
                    recoverInspection.fetch(
                    {
                        query: "SELECT * FROM ATC20Forms where ID = " + e.content_id
                    } ) ;
                    var currentForm = recoverInspection.at( 0 ) ;
                    var user = "" ;
                    if( Alloy.Globals.ExistSession() )
                    {
                        user = Alloy.Globals.SessionUsername ;
                    }
                    currentForm.set( { SYNCHRONIZED: "1" , USER: user } ) ;
                    currentForm.save() ;
                }
                else
                {
                    error_occurred = true ;
                }
            }
            else
            {
                error_occurred = true ;
            }

            if( error_occurred )
            {
                switch( response.ErrorType )
                {
                    case "Expired":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_expired_err_msg' )
                        }) ;
                    }
                    break ;

                    case "ConnectionError":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_connection_error_err_msg' )
                        }) ;
                    }
                    break ;

                    case "InvalidUser":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_invalid_user_err_msg' )
                        }) ;
                    }
                    break ;

                    case "NoForm":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_no_form_err_msg' )
                        }) ;
                    }
                    break ;

                    case "InsertEvaluationSketchFailed":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_insert_evaluation_sketch_failed_err_msg' )
                        }) ;
                    }
                    break ;

                    case "InsertFormFailed":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_insert_form_failed_err_msg' )
                        }) ;
                    }
                    break ;

                    case "InsertMediaFailed":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_insert_media_failed_err_msg' )
                        }) ;
                    }
                    break ;

                    case "UnexpectedError":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_unexpected_error_err_msg' )
                        }) ;
                    }
                    break ;
                }
            }
        }
        catch( exception )
        {
            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }
    } ,
    function()
    {
        try
        {
            current_upload_queue = null ;

            RebuildTable() ;

            if( failedToUploadContents && failedToUploadContents.length > 0 )
            {
                var message = L( 'content_upload_error_msg' ) ;
                for( var i = 0 ; i < failedToUploadContents.length ; i++ )
                {
                    message = message + "\n" + failedToUploadContents[i].error_msg ;
                }

                // AlertDialog to ask user if it's sure about saving
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_content_upload_error_title' ) ,
                    message: message ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        OnBtnServerSynch() ;
                    }
                } ) ;
                // Show alert message
                alertDialog.show() ;
            }
            else
            {
                alert( L( 'generic_server_synch_success_msg' ) ) ;
            }
        }
        catch( exception )
        {
            Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
        }
    } , controls , EndAsyncBusyAction_CallBack ) ;
}

// Callback for EndAsyncBusyAction
function EndAsyncBusyAction_CallBack()
{
    bCanClickOnTableView = true ;
}

// EditTeamData button click event handler
function OnBtnEditInspectorData_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            // Controller creation for the Next View (inited in ATC20 Mode)
            if( current_mode == "CA" || current_mode == "NEPAL" )
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20PersonalData' , { mode: current_mode } ) ;
            }
            else if( current_mode == "NZ" )
            {
                Alloy.Globals.createAndOpenControllerExt( 'ATC20NZPersonalData' ) ;
            }

            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        bCanClickOnTableView = true ;
    }
}

try
{
    if( current_mode != "NEPAL" )
    {
        $.atc20ModeFormsWindow.remove( $.btnExportCSV ) ;
    }

    // Set welcome label text
    $.lblWelcome.setText( current_logged_username ) ;

    // Init app buttons
    $.widgetAppButtonAdd.init( '/images/add_form_normal.png' , '/images/add_form_pressed.png' , '/images/add_form_disabled.png' , L( 'generic_add_title' ) , OnBtnAdd_Click ) ;
    $.widgetAppButtonServerSynch.init( '/images/server_synch_normal.png' , '/images/server_synch_pressed.png' , '/images/server_synch_disabled.png' , L( 'generic_server_synch_title' ) , OnBtnServerSynch_Click ) ;
    $.widgetAppButtonEID.init( '/images/edit_team_normal.png' , '/images/edit_team_pressed.png' , '/images/edit_team_disabled.png' , L( 'atc20_mode_edit_inspector_data' ) , OnBtnEditInspectorData_Click ) ;
    $.widgetAppButtonEID.set_label_height( 42 ) ;

    RebuildTable() ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowATC20ModeForms.open() ;
    }
    else
    {
        $.atc20ModeFormsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
