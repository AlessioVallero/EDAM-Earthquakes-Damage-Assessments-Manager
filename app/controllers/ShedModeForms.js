var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.btnLogout ) ;
controls.push( $.tableViewShedModeForms ) ;
controls.push( $.widgetAppButtonAdd.get_button() ) ;
controls.push( $.widgetAppButtonServerSynch.get_button() ) ;
controls.push( $.widgetAppButtonETD.get_button() ) ;

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
            $.navigationWindowShedModeForms.close() ;
        }
        else
        {
            $.shedModeFormsWindow.close() ;
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
        Alloy.Collections.ShedForms.fetch( { query: "SELECT * FROM ShedForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'" } ) ;
    }
    else
    {
        $.btnLogout.visible = false ;
        // Resets the model's state from the database useful if we want to ensure to have the latest database state.
        Alloy.Collections.ShedForms.fetch( { query: "SELECT * FROM ShedForms where USER is null or USER = ''" } ) ;
    }

    // Changing the background color of the row of this form and adding a check image on it
    if( $.tableViewShedModeForms.data && $.tableViewShedModeForms.data.length > 0 )
    {
        for( var i = 0 ; i < $.tableViewShedModeForms.data[0].rows.length ; i++ )
        {
            var currentRow = $.tableViewShedModeForms.data[0].rows[i] ;
            if( currentRow.isSynchronized == "1" )
            {
                currentRow.children[0].setVisible( true ) ;
            }
            else
            {
                currentRow.children[0].setVisible( false ) ;
            }
        }
        $.tableViewShedModeForms.setVisible( true ) ;
    }
    else
    {
        $.tableViewShedModeForms.setVisible( false ) ;
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
function OnShedModeFormsWindow_Close()
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
                                    var recoverVideoGallery = Alloy.createCollection( 'ShedFormsVideos' ) ;
                                    recoverVideoGallery.fetch(
                                    {
                                        query: "SELECT VIDEO_PATH FROM ShedFormsVideos where FORM_ID=" + e.row.rowId
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
                                    var recoverVideo = Alloy.createCollection( 'ShedFormsVideos' ) ;
                                    recoverVideo.fetch( { query:"SELECT * FROM ShedFormsVideos where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverVideo.length > 0 )
                                    {
                                        var model = recoverVideo.at( 0 ) ;
                                        recoverVideo.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    // Recovering all the pictures
                                    var recoverPictureGallery = Alloy.createCollection( 'ShedFormsImages' ) ;
                                    recoverPictureGallery.fetch(
                                    {
                                        query: "SELECT IMAGE_PATH FROM ShedFormsImages where FORM_ID=" + e.row.rowId
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
                                    var recoverPictures = Alloy.createCollection( 'ShedFormsImages' ) ;
                                    recoverPictures.fetch( { query:"SELECT * FROM ShedFormsImages where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverPictures.length > 0 )
                                    {
                                        var model = recoverPictures.at( 0 ) ;
                                        recoverPictures.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverOtherComments = Alloy.createCollection( 'ShedFormsOtherComments' ) ;
                                    recoverOtherComments.fetch( { query: "SELECT * FROM ShedFormsOtherComments where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverOtherComments.length > 0 )
                                    {
                                        var model = recoverOtherComments.at( 0 ) ;
                                        recoverOtherComments.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverJudgmentOfPracticability = Alloy.createCollection( 'ShedFormsJudgmentOfPracticability' ) ;
                                    recoverJudgmentOfPracticability.fetch( { query: "SELECT * FROM ShedFormsJudgmentOfPracticability where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverJudgmentOfPracticability.length > 0 )
                                    {
                                        var model = recoverJudgmentOfPracticability.at( 0 ) ;
                                        recoverJudgmentOfPracticability.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverDamages = Alloy.createCollection( 'ShedFormsDamages' ) ;
                                    recoverDamages.fetch( { query: "SELECT * FROM ShedFormsDamages where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverDamages.length > 0 )
                                    {
                                        var model = recoverDamages.at( 0 ) ;
                                        recoverDamages.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverInfrastructure = Alloy.createCollection( 'ShedFormsInfrastructure' ) ;
                                    recoverInfrastructure.fetch( { query: "SELECT * FROM ShedFormsInfrastructure where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverInfrastructure.length > 0 )
                                    {
                                        var model = recoverInfrastructure.at( 0 ) ;
                                        recoverInfrastructure.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverShedsCharacteristics = Alloy.createCollection( 'ShedFormsShedsCharacteristics' ) ;
                                    recoverShedsCharacteristics.fetch( { query: "SELECT * FROM ShedFormsShedsCharacteristics where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverShedsCharacteristics.length > 0 )
                                    {
                                        var model = recoverShedsCharacteristics.at( 0 ) ;
                                        recoverShedsCharacteristics.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverShedsPositions = Alloy.createCollection( 'ShedFormsShedsPositions' ) ;
                                    recoverShedsPositions.fetch( { query: "SELECT * FROM ShedFormsShedsPositions where FORM_ID = " + e.row.rowId } ) ;
                                    if( recoverShedsPositions.length > 0 )
                                    {
                                        var model = recoverShedsPositions.at( 0 ) ;
                                        recoverShedsPositions.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverForm = Alloy.createCollection( 'ShedForms' ) ;
                                    recoverForm.fetch( { query: "SELECT * FROM ShedForms where ID = " + e.row.rowId } ) ;
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
                            Alloy.Globals.ProtectedAddEventListener( Ti.App , "shed_mode:save" , RebuildTable ) ;
                            // Controller creation for the Next View (inited in Shed Mode)
                            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
                        } ) ;
                        dialog.show() ;
                    }
                    else
                    {
                        Alloy.Globals.ProtectedAddEventListener( Ti.App , "shed_mode:save" , RebuildTable ) ;
                        // Controller creation for the Next View (inited in Shed Mode)
                        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
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

            Alloy.Globals.ProtectedAddEventListener( Ti.App , "shed_mode:save" , RebuildTable ) ;
            // Controller creation for the Next View (inited in Shed Mode)
            Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsGeneralSection' , { form_id: -1 , is_synchronized: "0" } ) ;

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
                var ShedModeUtils = require( '/ShedModeUtils' ) ;

                var uploadQueue = new Array() ;

                var all_media_found = true ;

                // Recover all the forms of this User
                var recoverDetails = ShedModeUtils.LoadDetailsQuery() ;
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

                        // Recover SHED POSITIONS
                        var recoverShedsPositions = ShedModeUtils.LoadShedPositionQuery( form_id ) ;
                        // Recover SHED CHARACTERISTICS
                        var recoverShedCharacteristics = ShedModeUtils.LoadShedCharacteristicsQuery( form_id ) ;
                        // Recover INFRASTRUCTURE
                        var recoverInfrastructure = ShedModeUtils.LoadInfrastructureQuery( form_id ) ;
                        // Recover DAMAGES
                        var recoverDamages = ShedModeUtils.LoadDamagesQuery( form_id ) ;
                        // Recover JUDGMENT OF PRACTICABILITY
                        var recoverJudgmentOfPracticability = ShedModeUtils.LoadJudgmentOfPracticabilityQuery( form_id ) ;
                        // Recover OTHER COMMENTS
                        var recoverOtherComments = ShedModeUtils.LoadOtherCommentsQuery( form_id ) ;

                        // Process SHED POSITIONS
                        if( recoverShedsPositions.length > 0 )
                        {
                            var shedsPositions = recoverShedsPositions.at( 0 ) ;
                            params["LATITUDE"] = shedsPositions.get( "LATITUDE" ) ;
                            params["LONGITUDE"] = shedsPositions.get( "LONGITUDE" ) ;
                            params["ALTITUDE"] = shedsPositions.get( "ALTITUDE" ) ;
                            params["PROVINCE"] = shedsPositions.get( "PROVINCE" ) ;
                            params["MUNICIPALITY"] = shedsPositions.get( "MUNICIPALITY" ) ;
                            params["PLACE"] = shedsPositions.get( "PLACE" ) ;
                            params["ADDRESS"] = shedsPositions.get( "ADDRESS" ) ;
                            params["CIVIC_NO"] = shedsPositions.get( "CIVIC_NO" ) ;
                        }

                        // Process SHED CHARACTERISTICS
                        if( recoverShedCharacteristics.length > 0 )
                        {
                            var shedCharacteristics = recoverShedCharacteristics.at( 0 ) ;
                            params["SITE"] = shedCharacteristics.get( "SITE" ) ;
                            params["NOT_UNDERGROUND_PLANS_NO"] = shedCharacteristics.get( "NOT_UNDERGROUND_PLANS_NO" ) ;
                            params["USAGE"] = shedCharacteristics.get( "USAGE" ) ;
                        }

                        // Process INFRASTRUCTURE
                        if( recoverInfrastructure.length > 0 )
                        {
                            var infrastructure = recoverInfrastructure.at( 0 ) ;
                            params["PRIMARY_GIRDERS"] = infrastructure.get( "PRIMARY_GIRDERS" ) ;
                            params["THICKNESS_OF_THE_TILES"] = infrastructure.get( "THICKNESS_OF_THE_TILES" ) ;
                            params["TYPICAL_LIGHTS"] = infrastructure.get( "TYPICAL_LIGHTS" ) ;
                            params["COVERAGE"] = infrastructure.get( "COVERAGE" ) ;
                            params["INCLINATION_OF_THE_ROOF"] = infrastructure.get( "INCLINATION_OF_THE_ROOF" ) ;
                            params["INFILL_ELEMENTS"] = infrastructure.get( "INFILL_ELEMENTS" ) ;
                            params["VERTICAL_WALLS"] = infrastructure.get( "VERTICAL_WALLS" ) ;
                            params["SHELVING"] = infrastructure.get( "SHELVING" ) ;
                        }

                        // Process DAMAGES
                        if( recoverDamages.length > 0 )
                        {
                            var damages = recoverDamages.at( 0 ) ;
                            params["DAMAGES"] = damages.get( "DAMAGES" ) ;
                            params["MEASURES_OF_EMERGENCY"] = damages.get( "MEASURES_OF_EMERGENCY" ) ;
                        }

                        // Process JUDGMENT OF PRACTICABILITY
                        if( recoverJudgmentOfPracticability.length > 0 )
                        {
                            var judgmentOfPracticability = recoverJudgmentOfPracticability.at( 0 ) ;
                            params["STRUCTURAL"] = judgmentOfPracticability.get( "STRUCTURAL" ) ;
                            params["NOT_STRUCTURAL"] = judgmentOfPracticability.get( "NOT_STRUCTURAL" ) ;
                            params["EXTERNAL"] = judgmentOfPracticability.get( "EXTERNAL" ) ;
                            params["GEOTECHNICAL"] = judgmentOfPracticability.get( "GEOTECHNICAL" ) ;
                            params["OUTCOME_PRACTICABILITY"] = judgmentOfPracticability.get( "OUTCOME_PRACTICABILITY" ) ;
                            params["HOUSING_UNITS_UNINHABITABLE"] = judgmentOfPracticability.get( "HOUSING_UNITS_UNINHABITABLE" ) ;
                            params["FAMILIES_EVACUATED"] = judgmentOfPracticability.get( "FAMILIES_EVACUATED" ) ;
                            params["EVACUEES_N"] = judgmentOfPracticability.get( "EVACUEES_N" ) ;
                            params["ACCURACY_VISIT"] = judgmentOfPracticability.get( "ACCURACY_VISIT" ) ;
                            params["OTHER"] = judgmentOfPracticability.get( "OTHER" ) ;
                        }

                        // Process OTHER COMMENTS
                        if( recoverOtherComments.length > 0 )
                        {
                            var otherComments = recoverOtherComments.at( 0 ) ;
                            params["TOPIC"] = otherComments.get( "TOPIC" ) ;
                            params["OTHER_COMMENTS"] = otherComments.get( "OTHER_COMMENTS" ) ;
                        }

                        // Recover IMAGES and VIDEOS
                        var media_array = ShedModeUtils.CreateMediaArray( form_id , false ) ;
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

                        uploadQueue.push( { content: params , url: "https://www.edam.resiltronics.org/ReceiveShedModeForm.php" } ) ;
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
    contentsUploader.uploadMultiContents( current_upload_queue , "" , $.shedModeFormsWindow , function( e )
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
                    var recoverDetails = Alloy.createCollection( 'ShedForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM ShedForms where ID = " + e.content_id
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
function OnBtnEditTeamData_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            bCanClickOnTableView = false ;

            // Controller creation for the Next View (inited in Shed Mode)
            Alloy.Globals.createAndOpenControllerExt( 'ShedPersonalData' ) ;

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
    $.widgetAppButtonETD.init( '/images/edit_team_normal.png' , '/images/edit_team_pressed.png' , '/images/edit_team_disabled.png' , L( 'aedes_mode_edit_user_data' ) , OnBtnEditTeamData_Click ) ;
    $.widgetAppButtonETD.set_label_height( 42 ) ;

    RebuildTable() ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowShedModeForms.open() ;
    }
    else
    {
        $.shedModeFormsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
