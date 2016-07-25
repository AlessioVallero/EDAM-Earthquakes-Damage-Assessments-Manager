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
controls.push( $.btnBAEAModeFormsLandslideLoadAddress ) ;
controls.push( $.btnBAEAModeFormsLandslideViewAddress ) ;
controls.push( $.btnBAEAModeFormsLandslideRecord ) ;

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
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_landslide:landslide_type_changed" , OnLandslideType_Changed ) ;
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_landslide:material_type_changed" , OnMaterialType_Changed ) ;
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_landslide:area_affected_changed" , OnAreaAffected_Changed ) ;
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "baea_mode_landslide:vulnerable_facilities_changed" , OnVulnerableFacilities_Changed ) ;

        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_new" ) ;
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_update" ) ;

        Alloy.Globals.CurrentTemporaryPicsPath = null ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowLandslide.close() ;
        }
        else
        {
            $.baeaModeFormsLandslideWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView Photo click event handler
function OnTableViewBAEAModeFormsLandslidePhoto_Click( e )
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
                                    Alloy.Globals.CurrentTemporaryPicsPath.push( { media: newFile.getNativePath() , section: "LA" } ) ;
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
                                    var mediaDetails = { media: newFile.getNativePath() , section: "LA" } ;

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
                            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_BAEA_Sketch" , baea_section: "LA" } ) ;
                        }
                        break ;

                        case 3:
                        {
                            var media_array = { "PERMANENT": null , "TEMPORARY": null } ;

                            if( Alloy.Globals.BAEAModeLandslide &&
                                Alloy.Globals.BAEAModeLandslide[current_global_ar_index] &&
                                Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS && 
                                Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS.length > 0 )
                            {
                                media_array["PERMANENT"] = Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS ;
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

                if( Alloy.Globals.BAEAModeLandslide &&
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index] &&
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS && 
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS.length > 0 )
                {
                    media_array["PERMANENT"] = Alloy.Globals.BAEAModeLandslide[current_global_ar_index].PHOTOS ;
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

    $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.set_text_value( e.coords.longitude ) ;

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
        $.widgetAppTextFieldBAEAModeFormsLandslideAddress.set_text_value( address ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value() } , mode: "YL" } ) ;

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
            if( !$.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() ||
                !$.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value() )
            {
                bViewAddress = true ;

                OnBtnLoadAddress_Click() ;
            }
            else
            {
                Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value() } , mode: "YL" } ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_landslide_type = "0000000" ;

// Landslide Type change event handler
function OnLandslideType_Changed( e )
{
    current_landslide_type = e.value ;
}

var current_material_type = "000" ;

// Material Type change event handler
function OnMaterialType_Changed( e )
{
    current_material_type = e.value ;
}

var current_area_affected = "00000" ;

// Area Affected change event handler
function OnAreaAffected_Changed( e )
{
    current_area_affected = e.value ;
}

var current_vulnerable_facilities = "00000" ;

// Vulnerable Facilities change event handler
function OnVulnerableFacilities_Changed( e )
{
    current_vulnerable_facilities = e.value ;
}

// TableView Landslide's elements click event handler
function OnTableViewBAEAModeFormsLandslide_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            switch( e.index )
            {
                case 0:
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_landslide:landslide_type_changed" , OnLandslideType_Changed ) ;

                    // Controller creation for the Next View (inited in BAEA Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsLandslideLandslideTypeView' , { landslide_type: current_landslide_type , is_synchronized: current_is_synchronized } ) ;
                }
                break ;

                case 1:
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_landslide:material_type_changed" , OnMaterialType_Changed ) ;

                    // Controller creation for the Next View (inited in BAEA Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsLandslideMaterialTypeView' , { material_type: current_material_type , is_synchronized: current_is_synchronized } ) ;
                }
                break ;

                case 2:
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_landslide:area_affected_changed" , OnAreaAffected_Changed ) ;

                    // Controller creation for the Next View (inited in BAEA Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsLandslideAreaAffectedView' , { area_affected: current_area_affected , is_synchronized: current_is_synchronized } ) ;
                }
                break ;

                case 3:
                {
                    Alloy.Globals.ProtectedAddEventListener( Ti.App , "baea_mode_landslide:vulnerable_facilities_changed" , OnVulnerableFacilities_Changed ) ;

                    // Controller creation for the Next View (inited in BAEA Mode)
                    Alloy.Globals.createAndOpenControllerExt( 'BAEAModeFormsLandslideVulnerableFacilitiesView' , { vulnerable_facilities: current_vulnerable_facilities , is_synchronized: current_is_synchronized } ) ;
                }
                break ;
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
                if( !Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"] )
                {
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"] = new Array() ;
                }

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["DATE"] = new Date().getTime().toString() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_value() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_value() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_value() ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LANDSLIDE_TYPE"] = current_landslide_type ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["MATERIAL_TYPE"] = current_material_type ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["AREA_AFFECTED"] = current_area_affected ;
            Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["VULNERABLE_FACILITIES"] = current_vulnerable_facilities ;

            Ti.App.fireEvent( 'baea_mode_manage_section:record_update' , { index: current_global_ar_index , value: Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"] } ) ;
        }
        else
        {
            var newLandslideItem =
            {
                "ID": -1 ,
                "DATE": new Date().getTime().toString() ,
                "LANDSLIDE_TYPE": current_landslide_type ,
                "MATERIAL_TYPE": current_material_type ,
                "AREA_AFFECTED": current_area_affected ,
                "VULNERABLE_FACILITIES": current_vulnerable_facilities ,
                "SITE": $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_value() ,
                "LATITUDE": $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_value() ,
                "LONGITUDE": $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_value() ,
                "ADDRESS": $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_value() ,
                "NOTES": $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_value()
            } ;

            // Recording the photos
            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
            {
                // Init of the array
                newLandslideItem["PHOTOS"] = new Array() ;

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    newLandslideItem["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            if( Alloy.Globals.BAEAModeLandslide.length > 0 )
            {
                Alloy.Globals.BAEAModeLandslide.splice( 0 , 0 , newLandslideItem ) ;
            }
            else
            {
                Alloy.Globals.BAEAModeLandslide.push( newLandslideItem ) ;
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
    $.btnBAEAModeFormsLandslideLoadAddress.enabled = view_enabled ;
    $.btnBAEAModeFormsLandslideRecord.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.init( L( 'generic_site_name_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.init( L( 'generic_latitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.init( L( 'generic_longitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsLandslideAddress.init( L( 'generic_address_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsLandslideNotes.init( L( 'generic_notes_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsLandslideNotes.enabled( view_enabled ) ;

    if( current_global_ar_index != -1 )
    {
        $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.set_text_value( Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["SITE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.set_text_value( Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LATITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.set_text_value( Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LONGITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsLandslideAddress.set_text_value( Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["ADDRESS"] ) ;
        $.widgetAppTextFieldBAEAModeFormsLandslideNotes.set_text_value( Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["NOTES"] ) ;
        current_landslide_type = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["LANDSLIDE_TYPE"] ;
        current_material_type = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["MATERIAL_TYPE"] ;
        current_area_affected = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["AREA_AFFECTED"] ;
        current_vulnerable_facilities = Alloy.Globals.BAEAModeLandslide[current_global_ar_index]["VULNERABLE_FACILITIES"] ;
    }

    RegisterHideKeyboard( $.baeaModeFormsLandslideWindow ,
    [
        $.widgetAppTextFieldBAEAModeFormsLandslideSiteName.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsLandslideLatitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsLandslideLongitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsLandslideAddress.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsLandslideNotes.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowLandslide.open() ;
    }
    else
    {
        $.baeaModeFormsLandslideWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}