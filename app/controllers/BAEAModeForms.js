var current_logged_username = Alloy.Globals.CurrentAuthenticationInfoTitle() ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.btnLogout ) ;
controls.push( $.tableViewBAEAModeForms ) ;
controls.push( $.widgetAppButtonAdd.get_button() ) ;
controls.push( $.widgetAppButtonServerSynch.get_button() ) ;
controls.push( $.widgetAppButtonViewFeatures.get_button() ) ;

var bCanClickOnTableView = true ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        controls = null ;

        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "auth:done" ) ;
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode:view_features_with_login" , UpdateAuthenticationInfo ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowBAEAModeForms.close() ;
        }
        else
        {
            $.baeaModeFormsWindow.close() ;
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
        Alloy.Collections.BAEAForms.fetch( { query: "SELECT * FROM BAEAForms where USER is null or USER = '' or USER='" + Alloy.Globals.SessionUsername + "'" } ) ;
    }
    else
    {
        $.btnLogout.visible = false ;
        // Resets the model's state from the database useful if we want to ensure to have the latest database state.
        Alloy.Collections.BAEAForms.fetch( { query: "SELECT * FROM BAEAForms where USER is null or USER = ''" } ) ;
    }

    // Changing the background color of the row of this form and adding a check image on it
    if( $.tableViewBAEAModeForms.data && $.tableViewBAEAModeForms.data.length > 0 )
    {
        for( var i = 0 ; i < $.tableViewBAEAModeForms.data[0].rows.length ; i++ )
        {
            var currentRow = $.tableViewBAEAModeForms.data[0].rows[i] ;
            if( currentRow.isSynchronized == "1" )
            {
                currentRow.children[0].setVisible( true ) ;
            }
            else
            {
                currentRow.children[0].setVisible( false ) ;
            }
        }
        $.tableViewBAEAModeForms.setVisible( true ) ;
    }
    else
    {
        $.tableViewBAEAModeForms.setVisible( false ) ;
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
function OnBAEAModeFormsWindow_Close()
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
                                    // Recovering all the pictures
                                    var recoverPictureGallery = Alloy.createCollection( 'BAEAFormsImages' ) ;
                                    recoverPictureGallery.fetch(
                                    {
                                        query: "SELECT IMAGE_PATH FROM BAEAFormsImages where FORM_ID=" + e.row.rowId
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
                                    var recoverPictures = Alloy.createCollection( 'BAEAFormsImages' ) ;
                                    recoverPictures.fetch( { query:"SELECT * FROM BAEAFormsImages where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverPictures.length > 0 )
                                    {
                                        var model = recoverPictures.at( 0 ) ;
                                        recoverPictures.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverFaultRupture = Alloy.createCollection( 'BAEAFormsFaultRupture' ) ;
                                    recoverFaultRupture.fetch( { query: "SELECT * FROM BAEAFormsFaultRupture where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverFaultRupture.length > 0 )
                                    {
                                        var model = recoverFaultRupture.at( 0 ) ;
                                        recoverFaultRupture.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverLiquefaction = Alloy.createCollection( 'BAEAFormsLiquefaction' ) ;
                                    recoverLiquefaction.fetch( { query: "SELECT * FROM BAEAFormsLiquefaction where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverLiquefaction.length > 0 )
                                    {
                                        var model = recoverLiquefaction.at( 0 ) ;
                                        recoverLiquefaction.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverLandslide = Alloy.createCollection( 'BAEAFormsLandslide' ) ;
                                    recoverLandslide.fetch( { query: "SELECT * FROM BAEAFormsLandslide where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverLandslide.length > 0 )
                                    {
                                        var model = recoverLandslide.at( 0 ) ;
                                        recoverLandslide.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverTsunami = Alloy.createCollection( 'BAEAFormsTsunami' ) ;
                                    recoverTsunami.fetch( { query: "SELECT * FROM BAEAFormsTsunami where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverTsunami.length > 0 )
                                    {
                                        var model = recoverTsunami.at( 0 ) ;
                                        recoverTsunami.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverLifelines = Alloy.createCollection( 'BAEAFormsLifelines' ) ;
                                    recoverLifelines.fetch( { query: "SELECT * FROM BAEAFormsLifelines where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverLifelines.length > 0 )
                                    {
                                        var model = recoverLifelines.at( 0 ) ;
                                        recoverLifelines.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverBuildings = Alloy.createCollection( 'BAEAFormsBuildings' ) ;
                                    recoverBuildings.fetch( { query: "SELECT * FROM BAEAFormsBuildings where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverBuildings.length > 0 )
                                    {
                                        var model = recoverBuildings.at( 0 ) ;
                                        recoverBuildings.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverGeneral = Alloy.createCollection( 'BAEAFormsGeneral' ) ;
                                    recoverGeneral.fetch( { query: "SELECT * FROM BAEAFormsGeneral where FORM_ID = " + e.row.rowId } ) ;
                                    while( recoverGeneral.length > 0 )
                                    {
                                        var model = recoverGeneral.at( 0 ) ;
                                        recoverGeneral.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    var recoverForm = Alloy.createCollection( 'BAEAForms' ) ;
                                    recoverForm.fetch( { query: "SELECT * FROM BAEAForms where ID = " + e.row.rowId } ) ;
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
                            Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode:save" , RebuildTable ) ;
                            // Controller creation for the Next View (inited in BAEA Mode)
                            Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
                        } ) ;
                        dialog.show() ;
                    }
                    else
                    {
                        Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode:save" , RebuildTable ) ;
                        // Controller creation for the Next View (inited in BAEA Mode)
                        Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsGeneralSection' , { form_id: rowId , is_synchronized: isSynchronized } ) ;
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

            Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode:save" , RebuildTable ) ;
            // Controller creation for the Next View (inited in BAEA Mode)
            Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsGeneralSection' , { form_id: -1 , is_synchronized: "0" } ) ;

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
                var BAEAModeUtils = require( '/BAEAModeUtils' ) ;

                var uploadQueue = new Array() ;

                var all_media_found = true ;

                // Recover all the forms of this User
                var recoverDetails = BAEAModeUtils.LoadDetailsQuery() ;
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
                            // Operator
                            OPERATOR: details.get( "OPERATOR" )
                        } ;

                        // Recover FAULT RUPTURE
                        var recoverFaultRupture = BAEAModeUtils.LoadFaultRuptureQuery( form_id ) ;
                        // Recover LIQUEFACTION
                        var recoverLiquefaction = BAEAModeUtils.LoadLiquefactionQuery( form_id ) ;
                        // Recover LANDSLIDE
                        var recoverLandslide = BAEAModeUtils.LoadLandslideQuery( form_id ) ;
                        // Recover TSUNAMI
                        var recoverTsunami = BAEAModeUtils.LoadTsunamiQuery( form_id ) ;
                        // Recover LIFELINES
                        var recoverLifelines = BAEAModeUtils.LoadLifelinesQuery( form_id ) ;
                        // Recover BUILDINGS
                        var recoverBuildings = BAEAModeUtils.LoadBuildingsQuery( form_id ) ;
                        // Recover GENERAL
                        var recoverGeneral = BAEAModeUtils.LoadGeneralQuery( form_id ) ;

                        // Process FAULT RUPTURE
                        if( recoverFaultRupture.length > 0 )
                        {
                            var ar_fault_rupture = [] ;

                            for( var j = 0 ; j < recoverFaultRupture.length ; j++ )
                            {
                                var faultRupture = recoverFaultRupture.at( j ) ;

                                var fault_rupture_params = {} ;
                                fault_rupture_params["FAULT_RUPTURE_ID"] = faultRupture.get( "ID" ) ;
                                fault_rupture_params["FAULT_RUPTURE_DATE"] = faultRupture.get( "DATE" ) ;
                                fault_rupture_params["FAULT_RUPTURE_SITE"] = faultRupture.get( "SITE" ) ;
                                fault_rupture_params["FAULT_RUPTURE_LATITUDE"] = faultRupture.get( "LATITUDE" ) ;
                                fault_rupture_params["FAULT_RUPTURE_LONGITUDE"] = faultRupture.get( "LONGITUDE" ) ;
                                fault_rupture_params["FAULT_RUPTURE_ADDRESS"] = faultRupture.get( "ADDRESS" ) ;
                                fault_rupture_params["SURFACE_RUPTURE"] = faultRupture.get( "SURFACE_RUPTURE" ) ;
                                fault_rupture_params["OFFSET_FEATURE_TYPE"] = faultRupture.get( "OFFSET_FEATURE_TYPE" ) ;
                                fault_rupture_params["SLIP_AZIMUT"] = faultRupture.get( "SLIP_AZIMUT" ) ;
                                fault_rupture_params["PLUNGE"] = faultRupture.get( "PLUNGE" ) ;
                                fault_rupture_params["SLIP_LENGTH"] = faultRupture.get( "SLIP_LENGTH" ) ;
                                fault_rupture_params["FAULT_RUPTURE_NOTES"] = faultRupture.get( "NOTES" ) ;

                                ar_fault_rupture.push( fault_rupture_params ) ;
                            }

                            params["FAULT_RUPTURE"] = JSON.stringify( ar_fault_rupture ) ;
                        }

                        // Process LIQUEFACTION
                        if( recoverLiquefaction.length > 0 )
                        {
                            var ar_liquefaction = [] ;

                            for( var j = 0 ; j < recoverLiquefaction.length ; j++ )
                            {
                                var liquefaction = recoverLiquefaction.at( j ) ;

                                var liquefaction_params = {} ;
                                liquefaction_params["LIQUEFACTION_ID"] = liquefaction.get( "ID" ) ;
                                liquefaction_params["LIQUEFACTION_DATE"] = liquefaction.get( "DATE" ) ;
                                liquefaction_params["LIQUEFACTION_SITE"] = liquefaction.get( "SITE" ) ;
                                liquefaction_params["LIQUEFACTION_LATITUDE"] = liquefaction.get( "LATITUDE" ) ;
                                liquefaction_params["LIQUEFACTION_LONGITUDE"] = liquefaction.get( "LONGITUDE" ) ;
                                liquefaction_params["LIQUEFACTION_ADDRESS"] = liquefaction.get( "ADDRESS" ) ;
                                liquefaction_params["SAND_BLOWS_OR_FISSURES"] = liquefaction.get( "SAND_BLOWS_OR_FISSURES" ) ;
                                liquefaction_params["GROUND_SETTLEMENT"] = liquefaction.get( "GROUND_SETTLEMENT" ) ;
                                liquefaction_params["LATERAL_SPREADING"] = liquefaction.get( "LATERAL_SPREADING" ) ;
                                liquefaction_params["HORIZONTAL"] = liquefaction.get( "HORIZONTAL" ) ;
                                liquefaction_params["VERTICAL"] = liquefaction.get( "VERTICAL" ) ;
                                liquefaction_params["LIQUEFACTION_NOTES"] = liquefaction.get( "NOTES" ) ;

                                ar_liquefaction.push( liquefaction_params ) ;
                            }

                            params["LIQUEFACTION"] = JSON.stringify( ar_liquefaction ) ;
                        }

                        // Process LANDSLIDE
                        if( recoverLandslide.length > 0 )
                        {
                            var ar_landslide = [] ;

                            for( var j = 0 ; j < recoverLandslide.length ; j++ )
                            {
                                var landslide = recoverLandslide.at( j ) ;

                                var landslide_params = {} ;
                                landslide_params["LANDSLIDE_ID"] = landslide.get( "ID" ) ;
                                landslide_params["LANDSLIDE_DATE"] = landslide.get( "DATE" ) ;
                                landslide_params["LANDSLIDE_SITE"] = landslide.get( "SITE" ) ;
                                landslide_params["LANDSLIDE_LATITUDE"] = landslide.get( "LATITUDE" ) ;
                                landslide_params["LANDSLIDE_LONGITUDE"] = landslide.get( "LONGITUDE" ) ;
                                landslide_params["LANDSLIDE_ADDRESS"] = landslide.get( "ADDRESS" ) ;
                                landslide_params["LANDSLIDE_TYPE"] = landslide.get( "LANDSLIDE_TYPE" ) ;
                                landslide_params["MATERIAL_TYPE"] = landslide.get( "MATERIAL_TYPE" ) ;
                                landslide_params["AREA_AFFECTED"] = landslide.get( "AREA_AFFECTED" ) ;
                                landslide_params["VULNERABLE_FACILITIES"] = landslide.get( "VULNERABLE_FACILITIES" ) ;
                                landslide_params["LANDSLIDE_NOTES"] = landslide.get( "NOTES" ) ;

                                ar_landslide.push( landslide_params ) ;
                            }

                            params["LANDSLIDE"] = JSON.stringify( ar_landslide ) ;
                        }

                        // Process TSUNAMI
                        if( recoverTsunami.length > 0 )
                        {
                            var ar_tsunami = [] ;

                            for( var j = 0 ; j < recoverTsunami.length ; j++ )
                            {
                                var tsunami = recoverTsunami.at( j ) ;

                                var tsunami_params = {} ;
                                tsunami_params["TSUNAMI_ID"] = tsunami.get( "ID" ) ;
                                tsunami_params["TSUNAMI_DATE"] = tsunami.get( "DATE" ) ;
                                tsunami_params["TSUNAMI_SITE"] = tsunami.get( "SITE" ) ;
                                tsunami_params["TSUNAMI_LATITUDE"] = tsunami.get( "LATITUDE" ) ;
                                tsunami_params["TSUNAMI_LONGITUDE"] = tsunami.get( "LONGITUDE" ) ;
                                tsunami_params["TSUNAMI_ADDRESS"] = tsunami.get( "ADDRESS" ) ;
                                tsunami_params["INUNDATION"] = tsunami.get( "INUNDATION" ) ;
                                tsunami_params["WAVE_HEIGHT"] = tsunami.get( "WAVE_HEIGHT" ) ;
                                tsunami_params["PEAK_TO_TROUGH"] = tsunami.get( "PEAK_TO_TROUGH" ) ;
                                tsunami_params["WAVE_CYCLE"] = tsunami.get( "WAVE_CYCLE" ) ;
                                tsunami_params["TSUNAMI_DAMAGE"] = tsunami.get( "DAMAGE" ) ;
                                tsunami_params["TSUNAMI_NOTES"] = tsunami.get( "NOTES" ) ;

                                ar_tsunami.push( tsunami_params ) ;
                            }

                            params["TSUNAMI"] = JSON.stringify( ar_tsunami ) ;
                        }

                        // Process LIFELINES
                        if( recoverLifelines.length > 0 )
                        {
                            var ar_lifelines = [] ;

                            for( var j = 0 ; j < recoverLifelines.length ; j++ )
                            {
                                var lifelines = recoverLifelines.at( j ) ;

                                var lifelines_params = {} ;
                                lifelines_params["LIFELINES_ID"] = lifelines.get( "ID" ) ;
                                lifelines_params["LIFELINES_DATE"] = lifelines.get( "DATE" ) ;
                                lifelines_params["LIFELINES_SITE"] = lifelines.get( "SITE" ) ;
                                lifelines_params["LIFELINES_LATITUDE"] = lifelines.get( "LATITUDE" ) ;
                                lifelines_params["LIFELINES_LONGITUDE"] = lifelines.get( "LONGITUDE" ) ;
                                lifelines_params["LIFELINES_ADDRESS"] = lifelines.get( "ADDRESS" ) ;
                                lifelines_params["COMMUNICATION"] = lifelines.get( "COMMUNICATION" ) ;
                                lifelines_params["ELECTRIC_POWER_DELIVERY"] = lifelines.get( "ELECTRIC_POWER_DELIVERY" ) ;
                                lifelines_params["OTHER"] = lifelines.get( "OTHER" ) ;
                                lifelines_params["FUNCTIONALITY"] = lifelines.get( "FUNCTIONALITY" ) ;
                                lifelines_params["REPAIR_TIME"] = lifelines.get( "REPAIR_TIME" ) ;
                                lifelines_params["LIFELINES_RECOMMEND_FURTHER_INVESTIGATION"] = lifelines.get( "RECOMMEND_FURTHER_INVESTIGATION" ) ;
                                lifelines_params["LIFELINES_NOTES"] = lifelines.get( "NOTES" ) ;

                                ar_lifelines.push( lifelines_params ) ;
                            }

                            params["LIFELINES"] = JSON.stringify( ar_lifelines ) ;
                        }

                        // Process BUILDINGS
                        if( recoverBuildings.length > 0 )
                        {
                            var ar_buildings = [] ;

                            for( var j = 0 ; j < recoverBuildings.length ; j++ )
                            {
                                var buildings = recoverBuildings.at( j ) ;

                                var buildings_params = {} ;
                                buildings_params["BUILDINGS_ID"] = buildings.get( "ID" ) ;
                                buildings_params["BUILDINGS_DATE"] = buildings.get( "DATE" ) ;
                                buildings_params["BUILDINGS_SITE"] = buildings.get( "SITE" ) ;
                                buildings_params["BUILDINGS_LATITUDE"] = buildings.get( "LATITUDE" ) ;
                                buildings_params["BUILDINGS_LONGITUDE"] = buildings.get( "LONGITUDE" ) ;
                                buildings_params["BUILDINGS_ADDRESS"] = buildings.get( "ADDRESS" ) ;
                                buildings_params["BUILDING_TYPE"] = buildings.get( "BUILDING_TYPE" ) ;
                                buildings_params["OCCUPANCY_USE"] = buildings.get( "OCCUPANCY_USE" ) ;
                                buildings_params["STORIES"] = buildings.get( "STORIES" ) ;
                                buildings_params["BUILDINGS_DAMAGE"] = buildings.get( "DAMAGE" ) ;
                                buildings_params["BUILDINGS_RECOMMEND_FURTHER_INVESTIGATION"] = buildings.get( "RECOMMEND_FURTHER_INVESTIGATION" ) ;
                                buildings_params["BUILDINGS_NOTES"] = buildings.get( "NOTES" ) ;

                                ar_buildings.push( buildings_params ) ;
                            }

                            params["BUILDINGS"] = JSON.stringify( ar_buildings ) ;
                        }

                        // Process GENERAL
                        if( recoverGeneral.length > 0 )
                        {
                            var ar_general = [] ;

                            for( var j = 0 ; j < recoverGeneral.length ; j++ )
                            {
                                var general = recoverGeneral.at( j ) ;

                                var general_params = {} ;
                                general_params["GENERAL_ID"] = general.get( "ID" ) ;
                                general_params["GENERAL_DATE"] = general.get( "DATE" ) ;
                                general_params["GENERAL_SITE"] = general.get( "SITE" ) ;
                                general_params["GENERAL_LATITUDE"] = general.get( "LATITUDE" ) ;
                                general_params["GENERAL_LONGITUDE"] = general.get( "LONGITUDE" ) ;
                                general_params["GENERAL_ADDRESS"] = general.get( "ADDRESS" ) ;
                                general_params["GENERAL_NOTES"] = general.get( "NOTES" ) ;

                                ar_general.push( general_params ) ;
                            }

                            params["GENERAL"] = JSON.stringify( ar_general ) ;
                        }

                        // Recover IMAGES and VIDEOS
                        var media_array = BAEAModeUtils.CreateMediaArray( form_id ) ;
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
                                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , media.path.replace( ".png" , "" ) + "_data.dat" ) ;
                                    newFile.write( "Section: " + media.section + "\nSectionID: " + media.section_id ) ;
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

                        uploadQueue.push( { content: params , url: "https://www.edam.resiltronics.org/ReceiveBAEAModeForm.php" } ) ;
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

// Manage the external update of authentication info
function UpdateAuthenticationInfo( e )
{
    if( e.auth_done )
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
    contentsUploader.uploadMultiContents( current_upload_queue , "" , $.baeaModeFormsWindow , function( e )
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
                    var recoverDetails = Alloy.createCollection( 'BAEAForms' ) ;
                    recoverDetails.fetch(
                    {
                        query: "SELECT * FROM BAEAForms where ID = " + e.content_id
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

// ViewFeatures button click event handler
function OnBtnViewFeatures_Click( e )
{
    try
    {
        Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode:view_features_with_login" , UpdateAuthenticationInfo ) ;

        // Controller creation for the Next View (inited in BAEA Mode)
        Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsViewFeaturesView' ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set welcome label text
    $.lblWelcome.setText( current_logged_username ) ;

    // Init app buttons
    $.widgetAppButtonAdd.init( '/images/add_form_normal.png' , '/images/add_form_pressed.png' , '/images/add_form_disabled.png' , L( 'generic_add_title' ) , OnBtnAdd_Click ) ;
    $.widgetAppButtonServerSynch.init( '/images/server_synch_normal.png' , '/images/server_synch_pressed.png' , '/images/server_synch_disabled.png' , L( 'generic_server_synch_title' ) , OnBtnServerSynch_Click ) ;
    $.widgetAppButtonViewFeatures.init( '/images/view_features_normal.png' , '/images/view_features_pressed.png' , '/images/view_features_disabled.png' , L( 'baea_mode_view_features_view_title' ) , OnBtnViewFeatures_Click ) ;

    RebuildTable() ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBAEAModeForms.open() ;
    }
    else
    {
        $.baeaModeFormsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
