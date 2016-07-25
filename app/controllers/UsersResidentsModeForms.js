var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.btnLogout ) ;
controls.push( $.tableViewUsersResidentsModeForms ) ;
controls.push( $.widgetAppButtonAdd.get_button() ) ;
controls.push( $.widgetAppButtonServerSynch.get_button() ) ;
controls.push( $.widgetAppButtonEUD.get_button() ) ;

var bCanClickOnTableView = true ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        controls = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowUsersResidentsModeForms.close() ;
        }
        else
        {
            $.usersResidentsModeFormsWindow.close() ;
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
        Alloy.Collections.UsersResidentsForms.fetch( { query: "SELECT * FROM UsersResidentsForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'" } ) ;
    }
    else
    {
        $.btnLogout.visible = false ;
        // Resets the model's state from the database useful if we want to ensure to have the latest database state.
        Alloy.Collections.UsersResidentsForms.fetch( { query: "SELECT * FROM UsersResidentsForms where USER is null or USER = ''" } ) ;
    }

    // Changing the background color of the row of this form and adding a check image on it
    if( $.tableViewUsersResidentsModeForms.data && $.tableViewUsersResidentsModeForms.data.length > 0 )
    {
        for( var i = 0 ; i < $.tableViewUsersResidentsModeForms.data[0].rows.length ; i++ )
        {
            var currentRow = $.tableViewUsersResidentsModeForms.data[0].rows[i] ;
            if( currentRow.isSynchronized == "1" )
            {
                currentRow.children[0].setVisible( true ) ;
            }
            else
            {
                currentRow.children[0].setVisible( false ) ;
            }
        }
        $.tableViewUsersResidentsModeForms.setVisible( true ) ;
    }
    else
    {
        $.tableViewUsersResidentsModeForms.setVisible( false ) ;
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

// Window close event handler
function OnUsersResidentsModeFormsWindow_Close()
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
                        if( e.row.rowId >= 0 )
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
                                    var recoverVideoGallery = Alloy.createCollection( 'UsersResidentsFormsVideos' ) ;
                                    recoverVideoGallery.fetch(
                                    {
                                        query: "SELECT VIDEO_PATH FROM UsersResidentsFormsVideos where FORM_ID=" + e.row.rowId
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
                                    var recoverVideo = Alloy.createCollection( 'UsersResidentsFormsVideos' ) ;
                                    recoverVideo.fetch( { query:"SELECT * FROM UsersResidentsFormsVideos where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverVideo.length > 0 )
                                    {
                                        var model = recoverVideo.at( 0 ) ;
                                        recoverVideo.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    // Recovering all the pictures
                                    var recoverPictureGallery = Alloy.createCollection( 'UsersResidentsFormsImages' ) ;
                                    recoverPictureGallery.fetch(
                                    {
                                        query: "SELECT IMAGE_PATH FROM UsersResidentsFormsImages where FORM_ID=" + e.row.rowId
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
                                    var recoverPictures = Alloy.createCollection( 'UsersResidentsFormsImages' ) ;
                                    recoverPictures.fetch( { query:"SELECT * FROM UsersResidentsFormsImages where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverPictures.length > 0 )
                                    {
                                        var model = recoverPictures.at( 0 ) ;
                                        recoverPictures.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverInfrastructure = Alloy.createCollection( 'UsersResidentsFormsInfrastructure' ) ;
                                    recoverInfrastructure.fetch( { query: "SELECT * FROM UsersResidentsFormsInfrastructure where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverInfrastructure.length > 0 )
                                    {
                                        var model = recoverInfrastructure.at( 0 ) ;
                                        recoverInfrastructure.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverBuildingsCharacteristics = Alloy.createCollection( 'UsersResidentsFormsBuildingsCharacteristics' ) ;
                                    recoverBuildingsCharacteristics.fetch( { query: "SELECT * FROM UsersResidentsFormsBuildingsCharacteristics where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverBuildingsCharacteristics.length > 0 )
                                    {
                                        var model = recoverBuildingsCharacteristics.at( 0 ) ;
                                        recoverBuildingsCharacteristics.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverBuildingsPositions = Alloy.createCollection( 'UsersResidentsFormsBuildingsPositions' ) ;
                                    recoverBuildingsPositions.fetch( { query: "SELECT * FROM UsersResidentsFormsBuildingsPositions where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverBuildingsPositions.length > 0 )
                                    {
                                        var model = recoverBuildingsPositions.at( 0 ) ;
                                        recoverBuildingsPositions.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverForm = Alloy.createCollection( 'UsersResidentsForms' ) ;
                                    recoverForm.fetch( { query: "SELECT * FROM UsersResidentsForms where ID = " + e.row.rowId } ) ;
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
                        dialog.addEventListener( 'click', function( e )
                        {
                            Alloy.Globals.ProtectedAddEventListener( Ti.App , "users_residents_mode:save" , RebuildTable ) ;
                            // Controller creation for the Next View (inited in UsersResidents Mode)
                            Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
                        } ) ;
                        dialog.show() ;
                    }
                    else
                    {
                        Alloy.Globals.ProtectedAddEventListener( Ti.App , "users_residents_mode:save" , RebuildTable ) ;
                        // Controller creation for the Next View (inited in UsersResidents Mode)
                        Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
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

            Alloy.Globals.ProtectedAddEventListener( Ti.App , "users_residents_mode:save" , RebuildTable ) ;
            // Controller creation for the Next View (inited in UsersResidents Mode)
            Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsModeFormsGeneralSection' , { form_id: -1 , is_synchronized: "0" } ) ;

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
                var UsersResidentsModeUtils = require( '/UsersResidentsModeUtils' ) ;

                var uploadQueue = new Array() ;

                var all_media_found = true ;

                // Recover all the forms of this User
                var recoverDetails = UsersResidentsModeUtils.LoadDetailsQuery() ;
                if( recoverDetails.length > 0 )
                {
                    // Process this form
                    for( var i = 0 ; i < recoverDetails.length ; i++ )
                    {
                        var details = recoverDetails.at( i ) ;
                        var form_id = details.get( "ID" ) ;

                        var params =
                        {
                            // Key
                            key: "EDAM" ,
                            // The Form ID
                            ID: form_id ,
                            // Details
                            FORM_NO: details.get( "FORM_NO" ) ,
                            DATE: details.get( "DATE" )
                        } ;

                        // Recover BUILDINGS POSITIONS
                        var recoverBuildingsPositions = UsersResidentsModeUtils.LoadBuildingPositionQuery( form_id ) ;
                        // Recover BUILDING CHARACTERISTICS
                        var recoverBuildingCharacteristics = UsersResidentsModeUtils.LoadBuildingCharacteristicsQuery( form_id ) ;
                        // Recover INFRASTRUCTURE
                        var recoverInfrastructure = UsersResidentsModeUtils.LoadInfrastructureQuery( form_id ) ;

                        // Process BUILDINGS POSITIONS
                        if( recoverBuildingsPositions.length > 0 )
                        {
                            var buildingsPositions = recoverBuildingsPositions.at( 0 ) ;
                            params["LATITUDE"] = buildingsPositions.get( "LATITUDE" ) ;
                            params["LONGITUDE"] = buildingsPositions.get( "LONGITUDE" ) ;
                            params["ALTITUDE"] = buildingsPositions.get( "ALTITUDE" ) ;
                            params["PROVINCE"] = buildingsPositions.get( "PROVINCE" ) ;
                            params["MUNICIPALITY"] = buildingsPositions.get( "MUNICIPALITY" ) ;
                            params["PLACE"] = buildingsPositions.get( "PLACE" ) ;
                            params["ADDRESS"] = buildingsPositions.get( "ADDRESS" ) ;
                            params["CIVIC_NO"] = buildingsPositions.get( "CIVIC_NO" ) ;
                            params["COMPILER_POS"] = buildingsPositions.get( "COMPILER_POS" ) ;
                        }

                        // Process BUILDINGS CHARACTERISTICS
                        if( recoverBuildingCharacteristics.length > 0 )
                        {
                            var buildingCharacteristics = recoverBuildingCharacteristics.at( 0 ) ;
                            params["SITE"] = buildingCharacteristics.get( "SITE" ) ;
                            params["UNDERGROUND_PLANS_NO"] = buildingCharacteristics.get( "UNDERGROUND_PLANS_NO" ) ;
                            params["NOT_UNDERGROUND_PLANS_NO"] = buildingCharacteristics.get( "NOT_UNDERGROUND_PLANS_NO" ) ;
                            params["USAGE"] = buildingCharacteristics.get( "USAGE" ) ;
                        }

                        // Process INFRASTRUCTURE
                        if( recoverInfrastructure.length > 0 )
                        {
                            var infrastructure = recoverInfrastructure.at( 0 ) ;
                            params["GROUND_BREAKS"] = infrastructure.get( "GROUND_BREAKS" ) ;
                            params["WATER_LEAKS"] = infrastructure.get( "WATER_LEAKS" ) ;
                            params["GAS_LEAKS"] = infrastructure.get( "GAS_LEAKS" ) ;
                            params["ELECTRIC_CURRENT_OPERATION"] = infrastructure.get( "ELECTRIC_CURRENT_OPERATION" ) ;
                        }

                        // Recover IMAGES and VIDEOS
                        var media_array = UsersResidentsModeUtils.CreateMediaArray( form_id , false ) ;
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

                        uploadQueue.push( { content: params , url: "https://www.edam.resiltronics.org/ReceiveUsersResidentsModeForm.php" } ) ;
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
    contentsUploader.uploadMultiContents( current_upload_queue , "" , $.usersResidentsModeFormsWindow , function( e )
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
                    // OK - Updating the column SYNCHRONIZED of this Form and also the column USER (synchronize a Form means also become the owner)
                    var recoverDetails = Alloy.createCollection( 'UsersResidentsForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM UsersResidentsForms where ID = " + e.content_id
                    } ) ;
                    var currentForm = recoverDetails.at( 0 ) ;
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
                        } ) ;
                    }
                    break ;

                    case "ConnectionError":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_connection_error_err_msg' )
                        } ) ;
                    }
                    break ;

                    case "InvalidUser":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_invalid_user_err_msg' )
                        } ) ;
                    }
                    break ;

                    case "NoForm":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_no_form_err_msg' )
                        } ) ;
                    }
                    break ;

                    case "InsertFormFailed":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_insert_form_failed_err_msg' )
                        } ) ;
                    }
                    break ;

                    case "InsertMediaFailed":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_insert_media_failed_err_msg' )
                        } ) ;
                    }
                    break ;

                    case "UnexpectedError":
                    {
                        failedToUploadContents.push(
                        {
                            content_id: e.content_id ,
                            error_msg: L( 'generic_unexpected_error_err_msg' )
                        } ) ;
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

// EditUserData button click event handler
function OnBtnEditUserData_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            // Controller creation for the Next View (inited in Users Residents Mode)
            Alloy.Globals.createAndOpenControllerExt( 'UsersResidentsPersonalData' ) ;

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
    // Set welcome label text
    $.lblWelcome.setText( current_logged_username ) ;

    // Init app buttons
    $.widgetAppButtonAdd.init( '/images/add_form_normal.png' , '/images/add_form_pressed.png' , '/images/add_form_disabled.png' , L( 'generic_add_title' ) , OnBtnAdd_Click ) ;
    $.widgetAppButtonServerSynch.init( '/images/server_synch_normal.png' , '/images/server_synch_pressed.png' , '/images/server_synch_disabled.png' , L( 'generic_server_synch_title' ) , OnBtnServerSynch_Click ) ;
    $.widgetAppButtonEUD.init( '/images/edit_user_data_normal.png' , '/images/edit_user_data_pressed.png' , '/images/edit_user_data_disabled.png' , L( 'users_residents_mode_edit_user_data' ) , OnBtnEditUserData_Click ) ;
    $.widgetAppButtonEUD.set_label_height( 42 ) ;

    RebuildTable() ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowUsersResidentsModeForms.open() ;
    }
    else
    {
        $.usersResidentsModeFormsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
