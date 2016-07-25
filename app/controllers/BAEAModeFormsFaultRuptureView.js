var args = arguments[0] || {} ;
var current_form_id = args.form_id ;
var current_global_ar_index = args.global_ar_index ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Array of controls to disable/enable during a busy state
var controls = new Array() ;
if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}
controls.push( $.btnBAEAModeFormsFaultRuptureLoadAddress ) ;
controls.push( $.btnBAEAModeFormsFaultRuptureViewAddress ) ;
controls.push( $.btnBAEAModeFormsFaultRuptureRecord ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

var timeout = null ;

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
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_fault_rupture:offset_feature_type_changed" , OnOffsetFeatureType_Changed ) ;

        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_new" ) ;
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_update" ) ;

        Alloy.Globals.CurrentTemporaryPicsPath = null ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowFaultRupture.close() ;
        }
        else
        {
            $.baeaModeFormsFaultRuptureWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView Photo click event handler
function OnTableViewBAEAModeFormsFaultRupturePhoto_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            if( view_enabled )
            {
                // OptionDialog to ask user about the action to use about the Photo
                var optionDialog = Ti.UI.createOptionDialog(
                {
                    title: L( 'baea_photo_selection_title' ) ,
                    cancel: 4 ,
                    options: [ L( 'baea_photo_new_photo_msg' ) , L( 'baea_photo_import_photo_msg' ) , L( 'baea_photo_new_sketch_msg' ) , L( 'baea_photo_view_photos_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                    selectedIndex: 1
                } ) ;
                optionDialog.addEventListener( 'click' , function( e )
                {
                    switch( e.index )
                    {
                        // New photo
                        case 0:
                        {
                            Titanium.Media.showCamera(
                            {
                                success: function( event )
                                {
                                    // Init of the array (if it's necessary)
                                    if( !Alloy.Globals.CurrentTemporaryPicsPath )
                                    {
                                        Alloy.Globals.CurrentTemporaryPicsPath = new Array() ;
                                    }

                                    // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                                    // The files in the temporary folder may not persist when the application is shut down and restarted.
                                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
                                    if( newFile.exists )
                                    {
                                        // A previous image will be dropped
                                        newFile.deleteFile() ;
                                    }
                                    newFile.write( event.media ) ;

                                    // Inserting the image on the array of pictures
                                    Alloy.Globals.CurrentTemporaryPicsPath.push( { media: newFile.getNativePath() , section: "FR" } ) ;
                                } ,
                                cancel: function()
                                {
                                    // Called when user cancels taking a media
                                } ,
                                error: function( error )
                                {
                                    // Called when there's an error
                                    var alertDialog = Titanium.UI.createAlertDialog(
                                    {
                                        title: L( 'generic_camera_title' ) ,
                                        buttonNames: [ L( 'generic_ok_msg' ) ]
                                    } ) ;
                                    if( error.code == Titanium.Media.NO_CAMERA )
                                    {
                                        alertDialog.setMessage( L( 'no_camera_on_this_device_msg' ) ) ;
                                    }
                                    else
                                    {
                                        alertDialog.setMessage( L( 'generic_exception_msg' ) + error.code ) ;
                                    }
                                    alertDialog.show() ;
                                },
                                saveToPhotoGallery: false ,
                                mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
                            } ) ;
                        }
                        break ;

                        // Import photo
                        case 1:
                        {
                            // Obtain an image from the gallery
                            Titanium.Media.openPhotoGallery(
                            {
                                success:function( event )
                                {
                                    // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                                    // The files in the temporary folder may not persist when the application is shut down and restarted.
                                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
                                    if( newFile.exists )
                                    {
                                        // A previous image will be dropped
                                        newFile.deleteFile() ;
                                    }
                                    newFile.write( event.media ) ;

                                    // Getting media
                                    var mediaDetails = { media: newFile.getNativePath() , section: "FR" } ;

                                    // Init of the array (if it's necessary)
                                    if( !Alloy.Globals.CurrentTemporaryPicsPath )
                                    {
                                        Alloy.Globals.CurrentTemporaryPicsPath = new Array() ;
                                    }

                                    // Inserting the image on the array of pictures
                                    Alloy.Globals.CurrentTemporaryPicsPath.push( mediaDetails ) ;

                                    alert( L( "generic_content_imported_msg" ) ) ;
                                } ,
                                mediaTypes: [Ti.Media.MEDIA_TYPE_PHOTO]
                            } ) ;
                        }
                        break ;

                        case 2:
                        {
                            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_BAEA_Sketch" , baea_section: "FR" } ) ;
                        }
                        break ;

                        case 3:
                        {
                            var media_array = { "PERMANENT": null , "TEMPORARY": null } ;

                            if( Alloy.Globals.BAEAModeFaultRupture &&
                                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index] &&
                                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS && 
                                Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS.length > 0 )
                            {
                                media_array["PERMANENT"] = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS ;
                            }
                            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
                            {
                                media_array["TEMPORARY"] = Alloy.Globals.CurrentTemporaryPicsPath ;
                            }

                            if( media_array["PERMANENT"] || media_array["TEMPORARY"] )
                            {
                                // Controller creation for the Next View (inited in BAEA Mode)
                                Alloy.Globals.createAndOpenControllerExt( 'BAEATableGalleryView' , { media_contents: media_array , is_synchronized: current_is_synchronized } ) ;
                            }
                            else
                            {
                                alert( L( 'no_media_for_the_gallery_msg' ) ) ;
                            }
                        }
                        break ;
                    }
                } ) ;
                // Show OptionDialog about the type of ATC-20 form
                optionDialog.show() ;
            }
            else
            {
                var media_array = { "PERMANENT": null , "TEMPORARY": null } ;

                if( Alloy.Globals.BAEAModeFaultRupture &&
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index] &&
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS && 
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS.length > 0 )
                {
                    media_array["PERMANENT"] = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index].PHOTOS ;
                }
                if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
                {
                    media_array["TEMPORARY"] = Alloy.Globals.CurrentTemporaryPicsPath ;
                }

                if( media_array["PERMANENT"] || media_array["TEMPORARY"] )
                {
                    // Controller creation for the Next View (inited in BAEA Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'BAEATableGalleryView' , { media_contents: media_array , is_synchronized: current_is_synchronized } ) ;
                }
                else
                {
                    alert( L( 'no_media_for_the_gallery_msg' ) ) ;
                }
            }

            bRet = true ;

            return bRet ;
        } , view_enabled ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var bViewAddress = false ;

// Load address button click event handler
function OnBtnLoadAddress_Click( e )
{
    try
    {
        BeginAsyncBusyAction( $.activity_indicator , controls , function()
        {
            bIsWorkInProgress = true ;

            // If we can ask for localization on this device
            if( Alloy.Globals.isLocationAuthorized() )
            {
                // Start a new timeout to the location request
                timeout = setTimeout( function()
                {
                    timeout = null ;

                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                    alert( L( 'geolocation_timeout_occurred_err_msg' ) ) ;
                } , Alloy.Globals.GeolocationRequestTimeoutMillisecs ) ;

                Alloy.Globals.getLocation(
                {
                    success: UpdatePosition
                } ) ;
            }
            else
            {
                EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

                alert( L( 'generic_user_not_authorized_to_ask_localization' ) ) ;
            }
        } , EndAsyncBusyAction_CallBack ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Callback for EndAsyncBusyAction
function EndAsyncBusyAction_CallBack()
{
    bIsWorkInProgress = false ;

    if( timeout !== null )
    {
        // Clear a previous timeout, if exist
        clearTimeout( timeout ) ;

        timeout = null ;
    }
}

// Function to update the coordinates and call the georeverse function
function UpdatePosition( e )
{
    Ti.Geolocation.removeEventListener( 'location' , UpdatePosition ) ;

    if( !e.success || e.error )
    {
        alert( L( 'unable_to_get_location_err_msg' ) + " " + e.error ) ;
        return ;
    }

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.set_text_value( e.coords.longitude ) ;

    if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        alert( L( 'generic_no_network_for_georeverse_address_msg' ) ) ;
    }
    else
    {
        Alloy.Globals.reverseGeocode( e.coords.latitude , e.coords.longitude , OnGeoreserve_Done ) ;
    }
}

// Function to callback when georeserve is done
function OnGeoreserve_Done( formattedAnswer )
{
    try
    {
        var address = null ;
        if( Titanium.Locale.currentLanguage == "en" )
        {
            address = formattedAnswer['street_number'] + " " + formattedAnswer['route'] ;
        }
        else
        {
            address = formattedAnswer['route'] + " " + formattedAnswer['street_number'] ;
        }
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.set_text_value( address ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;

        if( bViewAddress )
        {
            Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value() } , mode: "YL" } ) ;

            bViewAddress = false ;
        }
    }
}

// View address button click event handler
function OnBtnViewAddress_Click( e )
{
    try
    {
        if( Titanium.Network.networkType === Titanium.Network.NETWORK_NONE )
        {
            alert( L( 'generic_no_network_msg' ) ) ;
        }
        else
        {
            if( !$.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() ||
                !$.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value() )
            {
                bViewAddress = true ;

                OnBtnLoadAddress_Click() ;
            }
            else
            {
                Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value() } , mode: "YL" } ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_offset_feature_type = "000000" ;

// OffsetFeatureType changed event handler
function OnOffsetFeatureType_Changed( e )
{
    current_offset_feature_type = e.value ;
}

var current_surface_rupture = "0" ;

// Surface Rupture change event handler
function OnSurfaceRupture_Change( e )
{
    current_surface_rupture = e.id ;
}

// TableView OffsetFeatureType click event handler
function OnTableViewBAEAModeFormsFaultRuptureOffsetFeatureType_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_fault_rupture:offset_feature_type_changed" , OnOffsetFeatureType_Changed ) ;

            // Controller creation for the Next View (inited in BAEA Mode)
            Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsFaultRuptureOffsetFeatureTypeView' , { offset_feature_type: current_offset_feature_type , is_synchronized: current_is_synchronized } ) ;
        
            bRet = true ;

            return bRet ;
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Record button click event handler
function OnBtnRecord_Click( e )
{
    try
    {
        // Recording the data (add or edit)
        if( current_global_ar_index != -1 )
        {
            // Recording the photos
            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
            {
                // Init of the array (if it's necessary)
                if( !Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"] )
                {
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"] = new Array() ;
                }

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["DATE"] = new Date().getTime().toString() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"] = $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.get_selected_index() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_AZIMUT"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PLUNGE"] = $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_LENGTH"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_value() ;
            Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["OFFSET_FEATURE_TYPE"] = current_offset_feature_type ;

            Ti.App.fireEvent( 'baea_mode_manage_section:record_update' , { index: current_global_ar_index , value: Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"] } ) ;
        }
        else
        {
            var newFaultRuptureItem =
            {
                "ID": -1 ,
                "DATE": new Date().getTime().toString() ,
                "SURFACE_RUPTURE": current_surface_rupture ,
                "SITE": $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_value() ,
                "LATITUDE": $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_value() ,
                "LONGITUDE": $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_value() ,
                "ADDRESS": $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_value() ,
                "SLIP_AZIMUT": $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_value() ,
                "PLUNGE": $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_value() ,
                "SLIP_LENGTH": $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_value() ,
                "NOTES": $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_value() ,
                "OFFSET_FEATURE_TYPE": current_offset_feature_type
            } ;

            // Recording the photos
            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
            {
                // Init of the array
                newFaultRuptureItem["PHOTOS"] = new Array() ;

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    newFaultRuptureItem["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            if( Alloy.Globals.BAEAModeFaultRupture.length > 0 )
            {
                Alloy.Globals.BAEAModeFaultRupture.splice( 0 , 0 , newFaultRuptureItem ) ;
            }
            else
            {
                Alloy.Globals.BAEAModeFaultRupture.push( newFaultRuptureItem ) ;
            }

            Ti.App.fireEvent( 'baea_mode_manage_section:record_new' ) ;
        }

        Back() ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    Alloy.Globals.CurrentTemporaryPicsPath = null ;

    // Init controls
    var surfaceRuptureView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        surfaceRuptureView = mainView ;
    }
    else
    {
        surfaceRuptureView = $.viewAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture ;
    }
    $.btnBAEAModeFormsFaultRuptureLoadAddress.enabled = view_enabled ;
    $.btnBAEAModeFormsFaultRuptureRecord.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.init( L( 'generic_site_name_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.init( L( 'generic_latitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.init( L( 'generic_longitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.init( L( 'generic_address_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.init( L( 'generic_slip_azimuth_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.init( L( 'generic_plunge_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.init( L( 'generic_slip_length_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.init( L( 'generic_notes_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.enabled( view_enabled ) ;

    // Init app comboboxes
    var surfaceRuptureValues =
    {
        0: { title: L( 'generic_surface_rupture_scarp' ) } ,
        1: { title: L( 'generic_surface_rupture_en_echelon' ) } ,
        2: { title: L( 'generic_surface_rupture_moletrack' ) }
    } ;
    $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.init( L( 'generic_surface_rupture_text_msg' ) , surfaceRuptureValues , OnSurfaceRupture_Change , null , surfaceRuptureView ) ;
    $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.enabled( view_enabled ) ;

    if( current_global_ar_index != -1 )
    {
        $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.set_selected_index( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SITE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LATITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["LONGITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["ADDRESS"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_AZIMUT"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["PLUNGE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SLIP_LENGTH"] ) ;
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.set_text_value( Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["NOTES"] ) ;
        current_offset_feature_type = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["OFFSET_FEATURE_TYPE"] ;
        current_surface_rupture = Alloy.Globals.BAEAModeFaultRupture[current_global_ar_index]["SURFACE_RUPTURE"] ;
    }
    else
    {
        $.widgetAppComboBoxBAEAModeFormsFaultRuptureSurfaceRupture.set_selected_index( "0" ) ; // Scarp
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.set_text_value( "0" ) ;       // 0
        $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.set_text_value( "0" ) ;            // 0
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.set_text_value( "0" ) ;        // 0
    }

    RegisterHideKeyboard( $.baeaModeFormsFaultRuptureWindow ,
    [
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSiteName.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLatitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureLongitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureAddress.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipAzimuth.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRupturePlunge.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureSlipLength.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsFaultRuptureNotes.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowFaultRupture.open() ;
    }
    else
    {
        $.baeaModeFormsFaultRuptureWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}