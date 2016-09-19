var args = arguments[0] || {};
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
controls.push( $.btnAeDESModeFormsSectionOneLoadPosition ) ;

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
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "form:save_from_section" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSectionOne.close() ;
        }
        else
        {
            $.aedesModeFormsSectionOneWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Coordinates type picker change event handler
function OnCoordinatesType_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["COORDINATES_TYPE"] = e.id ;

    // If the selected item is not "Other" the Other will be set to empty
    if( e.id != 3 )
    {
        $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.set_text_value( "" ) ;
        Alloy.Globals.AeDESModeSectionOne["OTHER_COORDINATES_TYPE"] = "" ;
    }
}

// Code of use picker change event handler
function OnCodeOfUse_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] = e.id ;
}

// Building position picker event handler
function OnBuildingPosition_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] = e.id ;
}

// Load position button click event handler
function OnBtnLoadPosition_Click( e )
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

// Other Coordinates Type textfield change event handler
function OnCoordinatesTypeOther_Change( e , type )
{
    var newOtherCoordinatesTypeValue = $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.get_text_value() ;
    Alloy.Globals.AeDESModeSectionOne["OTHER_COORDINATES_TYPE"] = newOtherCoordinatesTypeValue ;
    // If the value is not empty, we must also set the selected item of the OtherCoordinatesType picker to "Other"
    if( newOtherCoordinatesTypeValue )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneCoordinatesType.set_selected_index( "3" ) ;
        Alloy.Globals.AeDESModeSectionOne["COORDINATES_TYPE"] = "3" ;
    }
}

// Timezone picker event handler
function OnTimezone_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["TIMEZONE"] = e.id ;
}

// Datum picker event handler
function OnDatum_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["DATUM"] = e.id ;
}

// Latitude textfield change event handler
function OnLatitude_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["LATITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.get_text_value() ;
}

// Longitude textfield change event handler
function OnLongitude_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.get_text_value() ;
}

// Altitude textfield change event handler
function OnAltitude_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.get_text_value() ;
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

    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.set_text_value( e.coords.longitude ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.set_text_value( e.coords.altitude ) ;

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
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.set_text_value( formattedAnswer['administrative_area_level_2'] ) ;
        OnProvince_Change() ;
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.set_text_value( formattedAnswer['locality'] ) ;
        OnMunicipality_Change() ;
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.set_text_value( formattedAnswer['administrative_area_level_1'] ) ;
        OnPlace_Change() ;
        $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.set_text_value( formattedAnswer['postal_code'] ) ;
        OnCivicNo_Change() ;
        var address = null ;
        if( Titanium.Locale.currentLanguage == "en" )
        {
            address = formattedAnswer['street_number'] + " " + formattedAnswer['route'] ;
        }
        else
        {
            address = formattedAnswer['route'] + " " + formattedAnswer['street_number'] ;
        }
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.set_text_value( address ) ;
        OnAddress_Change() ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
    finally
    {
        EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
    }
}

// Province textfield change event handler
function OnProvince_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["PROVINCE"] = $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.get_text_value() ;
}

// Municipality textfield change event handler
function OnMunicipality_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] = $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.get_text_value() ;
}

// Place textfield change event handler
function OnPlace_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["PLACE"] = $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.get_text_value() ;
}

// Address textfield change event handler
function OnAddress_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["ADDRESS"] = $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.get_text_value() ;
}

// Location type picker change event handler
function OnLocationType_Change( e )
{
    Alloy.Globals.AeDESModeSectionOne["LOCATION_TYPE"] = e.id ;

    // If the selected item is not "Other" the Other will be set to empty
    if( e.id != 5 )
    {
        $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.set_text_value( "" ) ;
        Alloy.Globals.AeDESModeSectionOne["LOCATION_DETAILS"] = "" ;
    }
}

// Other Location Details textfield change event handler
function OnLocationDetails_Change( e , type )
{
    var newLocationDetailsValue = $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.get_text_value() ;
    Alloy.Globals.AeDESModeSectionOne["LOCATION_DETAILS"] = newLocationDetailsValue ;
    // If the value is not empty, we must also set the selected item of the LocationDetails picker to "Other"
    if( newLocationDetailsValue )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneLocationType.set_selected_index( "5" ) ;
        Alloy.Globals.AeDESModeSectionOne["LOCATION_TYPE"] = "5" ;
    }
}

// CivicNo textfield change event handler
function OnCivicNo_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] = $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.get_text_value() ;
}

// Building name or owner textfield change event handler
function OnBuildingNameOrOwner_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] = $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.get_text_value() ;
}

// TableView Map Aggregate click event handler
function OnTableViewAeDESModeFormsSectionOneMapAggregatePhoto_Click( e )
{
    try
    {
        // If a sketch already exists, we must ask to the user if the purpose is to see the existing one or create a new one (depending on the synchronization of the form)
        if( Alloy.Globals.AeDESModeSectionOne["MAP_AGGREGATE_PATH"] )
        {
            if( view_enabled )
            {
                // OptionDialog to ask user about the type of ATC-20 form desired
                var optionDialog = Ti.UI.createOptionDialog(
                {
                    title: L( 'generic_map_aggregate_title' ) ,
                    cancel: 3 ,
                    options: [ L( 'aedes_new_map_aggregate_sketch_msg' ) , L( 'aedes_view_map_aggregate_sketch_msg' ) , L( 'aedes_delete_map_aggregate_sketch_msg' ) , L( 'generic_cancel_btn_title' ) ] ,
                    selectedIndex: 1
                } ) ;
                optionDialog.addEventListener( 'click' , function( e )
                {
                    switch( e.index )
                    {
                        case 0:
                        {
                            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "AeDES_SectionOne_Sketch" } ) ;
                        }
                        break ;

                        case 1:
                        {
                            Alloy.Globals.createAndOpenControllerExt( 'ViewFormSketchView' , { image: Alloy.Globals.AeDESModeSectionOne["MAP_AGGREGATE_PATH"] } ) ;
                        }
                        break ;

                        case 2:
                        {
                            // The sketch will be physically deleted only after saving
                            Alloy.Globals.AeDESModeSectionOne["MAP_AGGREGATE_PATH"] = "" ;
                            Alloy.Globals.AeDESModeSectionOne["MAP_AGGREGATE_MODIFIED"] = "Y" ;
                        }
                        break ;
                    }
                } ) ;
                // Show OptionDialog about the map aggregate form
                optionDialog.show() ;
            }
            else
            {
                // The form is synchronized, the only possibility is to see the existing sketch
                Alloy.Globals.createAndOpenControllerExt( 'ViewFormSketchView' , { image: Alloy.Globals.AeDESModeSectionOne["MAP_AGGREGATE_PATH"] } ) ;
            }
        }
        else
        {
            // No previous sketch exists, the user can create a new one
            Alloy.Globals.createAndOpenControllerExt( 'DraftPaintView' , { type: "AeDES_SectionOne_Sketch" } ) ;
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
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var codeOfUseParentView = null ;
    var buildingPositionView = null ;
    var timezoneView = null ;
    var datumView = null ;
    var locationTypeView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        codeOfUseParentView = mainView ;
        buildingPositionView = mainView ;
        timezoneView = mainView ;
        datumView = mainView ;
        coordinatesTypeView = mainView ;
        locationTypeView = mainView ;
    }
    else
    {
        codeOfUseParentView = $.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse ;
        buildingPositionView = $.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition ;
        timezoneView = $.viewAppComboBoxAeDESModeFormsSectionOneTimezone ;
        datumView = $.viewAppComboBoxAeDESModeFormsSectionOneDatum ;
        coordinatesTypeView = $.viewAppComboBoxAeDESModeFormsSectionOneCoordinatesType ;
        locationTypeView = $.viewAppComboBoxAeDESModeFormsSectionOneLocationType ;
    }
    $.btnAeDESModeFormsSectionOneLoadPosition.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.init( L( 'generic_coordinates_type_other_txt_hint' ) , OnCoordinatesTypeOther_Change , null , 7 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.set_text_value( Alloy.Globals.AeDESModeSectionOne["OTHER_COORDINATES_TYPE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.init( L( 'generic_latitude_txt_hint' ) , OnLatitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION , 10 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["LATITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.init( L( 'generic_longitude_txt_hint' ) , OnLongitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION , 10 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.init( L( 'generic_altitude_txt_hint' ) , OnAltitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION , 10 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.init( L( 'generic_province_txt_hint' ) , OnProvince_Change , null , 29 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.set_text_value( Alloy.Globals.AeDESModeSectionOne["PROVINCE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.init( L( 'generic_municipality_txt_hint' ) , OnMunicipality_Change , null , 29 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.set_text_value( Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.init( L( 'generic_place_txt_hint' ) , OnPlace_Change , null , 29 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.set_text_value( Alloy.Globals.AeDESModeSectionOne["PLACE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change , null , 26 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.set_text_value( Alloy.Globals.AeDESModeSectionOne["ADDRESS"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.init( L( 'generic_civicno_txt_hint' ) , OnCivicNo_Change , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD , 5 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.set_text_value( Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.init( L( 'generic_building_name_or_owner_txt_hint' ) , OnBuildingNameOrOwner_Change , null , 113 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.set_text_value( Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.init( L( 'generic_location_details_txt_hint' ) , OnLocationDetails_Change , null , 31 ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.set_text_value( Alloy.Globals.AeDESModeSectionOne["LOCATION_DETAILS"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.enabled( view_enabled ) ;

    // Init app comboboxes
    var codeOfUseValues =
    {
        0: { title: L( 'generic_code_of_use_private_housing_facilities' ) } ,
        1: { title: L( 'generic_code_of_use_educational_facilities' ) } ,
        2: { title: L( 'generic_code_of_use_hospitals_and_health_facilities' ) } ,
        3: { title: L( 'generic_code_of_use_collective_civilians_activities' ) } ,
        4: { title: L( 'generic_code_of_use_collective_military_activities' ) } ,
        5: { title: L( 'generic_code_of_use_collective_religious_activities' ) } ,
        6: { title: L( 'generic_code_of_use_activities_for_technology_services' ) } ,
        7: { title: L( 'generic_code_of_use_activities_for_mobility_and_transport' ) } ,
        8: { title: L( 'generic_code_of_use_nest' ) } ,
        9: { title: L( 'generic_code_of_use_hospital_company' ) } ,
        10: { title: L( 'generic_code_of_use_state_technical_department' ) } ,
        11: { title: L( 'generic_code_of_use_armed_barracks_forces' ) } ,
        12: { title: L( 'generic_code_of_use_parish_services' ) } ,
        13: { title: L( 'generic_code_of_use_water' ) } ,
        14: { title: L( 'generic_code_of_use_railway_station' ) } ,
        15: { title: L( 'generic_code_of_use_nursery' ) } ,
        16: { title: L( 'generic_code_of_use_private_nursing_homes' ) } ,
        17: { title: L( 'generic_code_of_use_state_administrative_department' ) } ,
        18: { title: L( 'generic_code_of_use_police_and_public_security' ) } ,
        19: { title: L( 'generic_code_of_use_churches' ) } ,
        20: { title: L( 'generic_code_of_use_sanitation' ) } ,
        21: { title: L( 'generic_code_of_use_bus_station' ) } ,
        22: { title: L( 'generic_code_of_use_elementary_schools' ) } ,
        23: { title: L( 'generic_code_of_use_clinics_and_polyclinics' ) } ,
        24: { title: L( 'generic_code_of_use_region' ) } ,
        25: { title: L( 'generic_code_of_use_firefighters_barracks' ) } ,
        26: { title: L( 'generic_code_of_use_electric_energy' ) } ,
        27: { title: L( 'generic_code_of_use_airport_station' ) } ,
        28: { title: L( 'generic_code_of_use_middle_school' ) } ,
        29: { title: L( 'generic_code_of_use_asl_locations' ) } ,
        30: { title: L( 'generic_code_of_use_province' ) } ,
        31: { title: L( 'generic_code_of_use_revenue_guard_corps' ) } ,
        32: { title: L( 'generic_code_of_use_gas' ) } ,
        33: { title: L( 'generic_code_of_use_naval_station' ) } ,
        34: { title: L( 'generic_code_of_use_high_school' ) } ,
        35: { title: L( 'generic_code_of_use_inam_inps_or_similar_location' ) } ,
        36: { title: L( 'generic_code_of_use_mountain_community' ) } ,
        37: { title: L( 'generic_code_of_use_state_forestry_corps' ) } ,
        38: { title: L( 'generic_code_of_use_telephony' ) } ,
        39: { title: L( 'generic_code_of_use_lyceum' ) } ,
        40: { title: L( 'generic_code_of_use_municipality' ) } ,
        41: { title: L( 'generic_code_of_use_installations_for_the_telecommunications' ) } ,
        42: { title: L( 'generic_code_of_use_vocational_school' ) } ,
        43: { title: L( 'generic_code_of_use_decentralized_municipal_office' ) } ,
        44: { title: L( 'generic_code_of_use_technical_institute' ) } ,
        45: { title: L( 'generic_code_of_use_prefecture' ) } ,
        46: { title: L( 'generic_code_of_use_university_arts_faculty' ) } ,
        47: { title: L( 'generic_code_of_use_posts_and_telegraphs' ) } ,
        48: { title: L( 'generic_code_of_use_university_science_faculty' ) } ,
        49: { title: L( 'generic_code_of_use_civic_center_meeting_center' ) } ,
        50: { title: L( 'generic_code_of_use_academy_and_conservatory' ) } ,
        51: { title: L( 'generic_code_of_use_library_museum_gallery' ) } ,
        52: { title: L( 'generic_code_of_use_rectory_and_school_board_offices' ) } ,
        53: { title: L( 'generic_code_of_use_inmates' ) } ,
        54: { title: L( 'generic_code_of_use_other' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.init( L( 'generic_code_of_use_text_msg' ) , codeOfUseValues , OnCodeOfUse_Change , null , codeOfUseParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneCodeOfUse.set_selected_index( Alloy.Globals.AeDESModeSectionOne["CODE_OF_USE"] ) ;
    }

    var buildingPositionValues =
    {
        0: { title: L( 'generic_building_position_isolated' ) } ,
        1: { title: L( 'generic_building_position_internal' ) } ,
        2: { title: L( 'generic_building_position_end' ) } ,
        3: { title: L( 'generic_building_position_corner' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.init( L( 'generic_building_position_text_msg' ) , buildingPositionValues , OnBuildingPosition_Change , null , buildingPositionView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneBuildingPosition.set_selected_index( Alloy.Globals.AeDESModeSectionOne["BUILDING_POSITION"] ) ;
    }

    var coordinatesTypeValues =
    {
        0: { title: L( 'generic_coordinates_type_not_selected' ) } ,
        1: { title: L( 'generic_coordinates_type_plane_utm' ) } ,
        2: { title: L( 'generic_coordinates_type_geographical' ) } ,
        3: { title: L( 'generic_coordinates_type_other' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneCoordinatesType.init( L( 'generic_coordinates_type_text_msg' ) , coordinatesTypeValues , OnCoordinatesType_Change , null , coordinatesTypeView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneCoordinatesType.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["COORDINATES_TYPE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneCoordinatesType.set_selected_index( Alloy.Globals.AeDESModeSectionOne["COORDINATES_TYPE"] ) ;
    }

    var timezoneValues =
    {
        0: { title: L( 'generic_timezone_not_selected' ) } ,
        1: { title: "32" } ,
        2: { title: "33" } ,
        3: { title: "34" }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneTimezone.init( L( 'generic_timezone_text_msg' ) , timezoneValues , OnTimezone_Change , null , timezoneView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneTimezone.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["TIMEZONE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneTimezone.set_selected_index( Alloy.Globals.AeDESModeSectionOne["TIMEZONE"] ) ;
    }

    var datumValues =
    {
        0: { title: L( 'generic_datum_not_selected' ) } ,
        1: { title: "ED50" } ,
        2: { title: "WGS84" }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneDatum.init( L( 'generic_datum_text_msg' ) , datumValues , OnDatum_Change , null , datumView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneDatum.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["DATUM"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneDatum.set_selected_index( Alloy.Globals.AeDESModeSectionOne["DATUM"] ) ;
    }

    var locationTypeValues =
    {
        0: { title: L( 'generic_location_type_not_selected' ) } ,
        1: { title: L( 'generic_location_type_street' ) } ,
        2: { title: L( 'generic_location_type_path' ) } ,
        3: { title: L( 'generic_location_type_alley' ) } ,
        4: { title: L( 'generic_location_type_plaza' ) } ,
        5: { title: L( 'generic_location_type_other' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneLocationType.init( L( 'generic_location_type_text_msg' ) , locationTypeValues , OnLocationType_Change , null , locationTypeView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionOneLocationType.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionOne["LOCATION_TYPE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionOneLocationType.set_selected_index( Alloy.Globals.AeDESModeSectionOne["LOCATION_TYPE"] ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeFormsSectionOneWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsSectionOneCoordinatesTypeOther.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneLocationDetails.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionOne.open() ;
    }
    else
    {
        $.aedesModeFormsSectionOneWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
