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
controls.push( $.btnBAEAModeFormsBuildingsLoadAddress ) ;
controls.push( $.btnBAEAModeFormsBuildingsViewAddress ) ;
controls.push( $.btnBAEAModeFormsBuildingsRecord ) ;

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
            $.navigationWindowBuildings.close() ;
        }
        else
        {
            $.baeaModeFormsBuildingsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TableView Photo click event handler
function OnTableViewBAEAModeFormsBuildingsPhoto_Click( e )
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
                    options: [ L( 'generic_photo_new_photo_msg' ) , L( 'generic_photo_import_photo_msg' ) , L( 'generic_photo_new_sketch_msg' ) , L( 'generic_photo_view_photos_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
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
                                    Alloy.Globals.CurrentTemporaryPicsPath.push( { media: newFile.getNativePath() , section: "BU" } ) ;
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
                                    var mediaDetails = { media: newFile.getNativePath() , section: "BU" } ;

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
                            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "Detailed_BAEA_Sketch" , baea_section: "BU" } ) ;
                        }
                        break ;

                        case 3:
                        {
                            var media_array = { "PERMANENT": null , "TEMPORARY": null } ;

                            if( Alloy.Globals.BAEAModeBuildings &&
                                Alloy.Globals.BAEAModeBuildings[current_global_ar_index] &&
                                Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS &&
                                Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS.length > 0 )
                            {
                                media_array["PERMANENT"] = Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS ;
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


                if( Alloy.Globals.BAEAModeBuildings &&
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index] &&
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS &&
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS.length > 0 )
                {
                    media_array["PERMANENT"] = Alloy.Globals.BAEAModeBuildings[current_global_ar_index].PHOTOS ;
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

    $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.set_text_value( e.coords.longitude ) ;

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
        $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.set_text_value( address ) ;
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
            Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value() } , mode: "YL" } ) ;

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
            if( !$.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() ||
                !$.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value() )
            {
                bViewAddress = true ;

                OnBtnLoadAddress_Click() ;
            }
            else
            {
                Alloy.Globals.createAndOpenControllerExt( 'ViewUsersLocations' , { users_coordinates: { 'LATITUDE': $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() , 'LONGITUDE': $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value() } , mode: "YL" } ) ;
            }
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_building_type = "0" ;

// Building Type picker change event handler
function OnBuildingType_Change( e )
{
    current_building_type = e.id ;
}

var current_occupancy_use = "1" ;

// Occupancy Use picker change event handler
function OnOccupancyUse_Change( e )
{
    current_occupancy_use = e.id ;
}

var current_damage = "2" ;

// Damage picker change event handler
function OnDamage_Change( e )
{
    current_damage = e.id ;
}

var current_recommend_further_investigation = "0" ;

// Recommend Further Investigation picker change event handler
function OnRecommendFurtherInvestigation_Change( e )
{
    current_recommend_further_investigation = e.id ;
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
                if( !Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"] )
                {
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"] = new Array() ;
                }

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DATE"] = new Date().getTime().toString() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LATITUDE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LONGITUDE"] = $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["ADDRESS"] = $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["STORIES"] = $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["NOTES"] = $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_value() ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["BUILDING_TYPE"] = current_building_type ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["OCCUPANCY_USE"] = current_occupancy_use ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DAMAGE"] = current_damage ;
            Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"] = current_recommend_further_investigation ;

            Ti.App.fireEvent( 'baea_mode_manage_section:record_update' , { index: current_global_ar_index , value: Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"] }  ) ;
        }
        else
        {
            var newBuildingsItem =
            {
                "ID": -1 ,
                "DATE": new Date().getTime().toString() ,
                "SITE": $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_value() ,
                "LATITUDE": $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_value() ,
                "LONGITUDE": $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_value() ,
                "ADDRESS": $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_value() ,
                "STORIES": $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_value() ,
                "NOTES": $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_value() ,
                "BUILDING_TYPE": current_building_type ,
                "OCCUPANCY_USE": current_occupancy_use ,
                "DAMAGE": current_damage ,
                "RECOMMEND_FURTHER_INVESTIGATION": current_recommend_further_investigation
            } ;

            // Recording the photos
            if( Alloy.Globals.CurrentTemporaryPicsPath && Alloy.Globals.CurrentTemporaryPicsPath.length > 0 )
            {
                // Init of the array
                newBuildingsItem["PHOTOS"] = new Array() ;

                for( var i = 0 ; i < Alloy.Globals.CurrentTemporaryPicsPath.length ; i++ )
                {
                    Alloy.Globals.CurrentTemporaryPicsPath[i].isNew = true ;
                    newBuildingsItem["PHOTOS"].push( Alloy.Globals.CurrentTemporaryPicsPath[i] ) ;
                }

                Alloy.Globals.CurrentTemporaryPicsPath = null ;
            }

            if( Alloy.Globals.BAEAModeBuildings.length > 0 )
            {
                Alloy.Globals.BAEAModeBuildings.splice( 0 , 0 , newBuildingsItem ) ;
            }
            else
            {
                Alloy.Globals.BAEAModeBuildings.push( newBuildingsItem ) ;
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
    var buildingTypeView = null ;
    var occupancyUseView = null ;
    var damageView = null ;
    var recommendFurtherInvestigationView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        buildingTypeView = mainView ;
        occupancyUseView = mainView ;
        damageView = mainView ;
        recommendFurtherInvestigationView = mainView ;
    }
    else
    {
        buildingTypeView = $.viewAppComboBoxBAEAModeFormsBuildingsBuildingType ;
        occupancyUseView = $.viewAppComboBoxBAEAModeFormsBuildingsOccupancyUse ;
        damageView = $.viewAppComboBoxBAEAModeFormsBuildingsDamage ;
        recommendFurtherInvestigationView = $.viewAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation ;
    }
    $.btnBAEAModeFormsBuildingsLoadAddress.enabled = view_enabled ;
    $.btnBAEAModeFormsBuildingsRecord.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.init( L( 'generic_site_name_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.init( L( 'generic_latitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.init( L( 'generic_longitude_txt_hint' ) , null , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.init( L( 'generic_address_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsBuildingsStories.init( L( 'generic_stories_txt_hint' ) , null , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsStories.enabled( view_enabled ) ;

    $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.init( L( 'generic_notes_txt_hint' ) ) ;
    $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.enabled( view_enabled ) ;

    // Init app comboboxes
    var buildingTypeValues =
    {
        0: { title: L( 'generic_building_type_steel' ) } ,
        1: { title: L( 'generic_building_type_concrete' ) } ,
        2: { title: L( 'generic_building_type_timber' ) } ,
        3: { title: L( 'generic_building_type_masonry' ) } ,
        4: { title: L( 'generic_building_type_other' ) } ,
        5: { title: L( 'generic_building_type_unknown' ) }
    } ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.init( L( 'generic_building_type_text_msg' ) , buildingTypeValues , OnBuildingType_Change , null , buildingTypeView ) ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.enabled( view_enabled ) ;

    var occupancyUseValues =
    {
        0: { title: L( 'generic_occupancy_use_unknown' ) } ,
        1: { title: L( 'generic_occupancy_use_residential' ) } ,
        2: { title: L( 'generic_occupancy_use_commercial' ) } ,
        3: { title: L( 'generic_occupancy_use_public_government' ) } ,
        4: { title: L( 'generic_occupancy_use_industrial' ) } ,
        5: { title: L( 'generic_occupancy_use_hotel_motel' ) } ,
        6: { title: L( 'generic_occupancy_use_hospital_healthcare' ) } ,
        7: { title: L( 'generic_occupancy_use_agricultural' ) } ,
        8: { title: L( 'generic_occupancy_use_religious' ) } ,
        9: { title: L( 'generic_occupancy_use_education' ) } ,
        10: { title: L( 'generic_occupancy_use_utility' ) } ,
        11: { title: L( 'generic_occupancy_use_mixed_use' ) } ,
        12: { title: L( 'generic_occupancy_use_other' ) }
    } ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.init( L( 'generic_occupancy_use_text_msg' ) , occupancyUseValues , OnOccupancyUse_Change , null , occupancyUseView ) ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.enabled( view_enabled ) ;

    var damageValues =
    {
        0: { title: L( 'generic_damage_none' ) } ,
        1: { title: L( 'generic_damage_slight' ) } ,
        2: { title: L( 'generic_damage_moderate' ) } ,
        3: { title: L( 'generic_damage_severe' ) } ,
        4: { title: L( 'generic_damage_total_collapse' ) }
    } ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.init( L( 'generic_damage_text_msg' ) , damageValues , OnDamage_Change , null , damageView ) ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.enabled( view_enabled ) ;

    var recommendFurtherInvestigationValues =
    {
        0: { title: L( 'generic_yes_msg' ) } ,
        1: { title: L( 'generic_no_msg' ) }
    } ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.init( L( 'generic_recommend_further_investigation_text_msg' ) , recommendFurtherInvestigationValues , OnRecommendFurtherInvestigation_Change , null , recommendFurtherInvestigationView ) ;
    $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.enabled( view_enabled ) ;

    if( current_global_ar_index != -1 )
    {
        $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["SITE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LATITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["LONGITUDE"] ) ;
        $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["ADDRESS"] ) ;
        $.widgetAppTextFieldBAEAModeFormsBuildingsStories.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["STORIES"] ) ;
        $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.set_text_value( Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["NOTES"] ) ;
        current_building_type = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["BUILDING_TYPE"] ;
        $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.set_selected_index( current_building_type ) ;
        current_occupancy_use = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["OCCUPANCY_USE"] ;
        $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.set_selected_index( current_occupancy_use ) ;
        current_damage = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["DAMAGE"] ;
        $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.set_selected_index( current_damage ) ;
        current_recommend_further_investigation = Alloy.Globals.BAEAModeBuildings[current_global_ar_index]["RECOMMEND_FURTHER_INVESTIGATION"] ;
        $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.set_selected_index( current_recommend_further_investigation ) ;
    }
    else
    {
        $.widgetAppComboBoxBAEAModeFormsBuildingsBuildingType.set_selected_index( "0" ) ;                  // Steel
        $.widgetAppComboBoxBAEAModeFormsBuildingsOccupancyUse.set_selected_index( "1" ) ;                  // Residential
        $.widgetAppComboBoxBAEAModeFormsBuildingsDamage.set_selected_index( "2" ) ;                        // Moderate
        $.widgetAppComboBoxBAEAModeFormsBuildingsRecommendFurtherInvestigation.set_selected_index( "0" ) ; // Yes
    }

    RegisterHideKeyboard( $.baeaModeFormsBuildingsWindow ,
    [
        $.widgetAppTextFieldBAEAModeFormsBuildingsSiteName.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsBuildingsLatitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsBuildingsLongitude.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsBuildingsAddress.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsBuildingsStories.get_text_field() ,
        $.widgetAppTextFieldBAEAModeFormsBuildingsNotes.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBuildings.open() ;
    }
    else
    {
        $.baeaModeFormsBuildingsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
