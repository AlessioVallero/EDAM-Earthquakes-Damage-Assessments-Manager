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
controls.push( $.btnBAEAModeFormsTsunamiLoadAddress ) ;
controls.push( $.btnBAEAModeFormsTsunamiViewAddress ) ;
controls.push( $.btnBAEAModeFormsTsunamiRecord ) ;

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
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_new" ) ;
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "baea_mode_manage_section:record_update" ) ;

        Alloy.Globals.CurrentTemporaryPicsPath = null ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowTsunami.close() ;
        }
        else
        {
            $.baeaModeFormsTsunamiWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView Photo click event handler
function OnTableViewBAEAModeFormsTsunamiPhoto_Click( e )
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
                                    Alloy.Globals.CurrentTemporaryPicsPath.push( { media: newFile.getNativePath() , section: "TS" } ) ;
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
                                    var mediaDetails = { media: newFile.getNativePath() , section: "TS" } ;

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
                            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_BAEA_Sketch" , baea_section: "TS" } ) ;
                        }
                        break ;

                        case 3:
                        {
                            var media_array = { "PERMANENT": null , "TEMPORARY": null } ;

                            if( Alloy.Globals.BAEAModeTsunami &&
                                Alloy.Globals.BAEAModeTsunami[current_global_ar_index] &&
                                Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS && 
                                Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS.length > 0 )
                            {
                                media_array["PERMANENT"] = Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS ;
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


                if( Alloy.Globals.BAEAModeTsunami &&
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index] &&
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS && 
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS.length > 0 )
                {
                    media_array["PERMANENT"] = Alloy.Globals.BAEAModeTsunami[current_global_ar_index].PHOTOS ;
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

    $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.set_text_value( e.coords.longitude ) ;

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
        $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.set_text_value( address ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value() } , mode: "YL" } ) ;

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
            if( !$.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() ||
                !$.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value() )
            {
                bViewAddress = true ;

                OnBtnLoadAddress_Click() ;
            }
            else
            {
                Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value() } , mode: "YL" } ) ;
            }
        }
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
                if( !Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"] )
                {
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"] = new Array() ;
                }

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DATE"] = new Date().getTime().toString() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["INUNDATION"] = $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_HEIGHT"] = $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PEAK_TO_TROUGH"] = $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_CYCLE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DAMAGE"] = $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_value() ;
            Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_value() ;

            Ti.App.fireEvent( 'baea_mode_manage_section:record_update' , { index: current_global_ar_index , value: Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"] }  ) ;
        }
        else
        {
            var newTsunamiItem =
            {
                "ID": -1 ,
                "DATE": new Date().getTime().toString() ,
                "SITE": $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_value() ,
                "LATITUDE": $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_value() ,
                "LONGITUDE": $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_value() ,
                "ADDRESS": $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_value() ,
                "INUNDATION": $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_value() ,
                "WAVE_HEIGHT": $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_value() ,
                "PEAK_TO_TROUGH": $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_value() ,
                "WAVE_CYCLE": $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_value() ,
                "DAMAGE": $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_value() ,
                "NOTES": $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_value()
            } ;

            // Recording the photos
            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
            {
                // Init of the array
                newTsunamiItem["PHOTOS"] = new Array() ;

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    newTsunamiItem["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            if( Alloy.Globals.BAEAModeTsunami.length > 0 )
            {
                Alloy.Globals.BAEAModeTsunami.splice( 0 , 0 , newTsunamiItem ) ;
            }
            else
            {
                Alloy.Globals.BAEAModeTsunami.push( newTsunamiItem ) ;
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
    $.btnBAEAModeFormsTsunamiLoadAddress.enabled = view_enabled ;
    $.btnBAEAModeFormsTsunamiRecord.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.init( L( 'generic_site_name_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.init( L( 'generic_latitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.init( L( 'generic_longitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.init( L( 'generic_address_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.init( L( 'generic_inundation_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.init( L( 'generic_wave_height_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.init( L( 'generic_peak_to_trough_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.init( L( 'generic_wave_cycle_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.init( L( 'generic_damage_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.init( L( 'generic_notes_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.enabled( view_enabled ) ;

    if( current_global_ar_index != -1 )
    {
        $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["SITE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LATITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["LONGITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["ADDRESS"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["INUNDATION"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_HEIGHT"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["PEAK_TO_TROUGH"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["WAVE_CYCLE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["DAMAGE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.set_text_value( Alloy.Globals.BAEAModeTsunami[current_global_ar_index]["NOTES"] ) ;
    }

    RegisterHideKeyboard( $.baeaModeFormsTsunamiWindow ,
    [
        $.widgetAppTextFieldBAEAModeFormsTsunamiSiteName.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiLatitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiLongitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiAddress.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiInundation.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveHeight.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiPeakToTrough.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiWaveCycle.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiDamage.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsTsunamiNotes.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowTsunami.open() ;
    }
    else
    {
        $.baeaModeFormsTsunamiWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}