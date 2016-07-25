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
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        codeOfUseParentView = mainView ;
        buildingPositionView = mainView ;
    }
    else
    {
        codeOfUseParentView = $.viewAppComboBoxAeDESModeFormsSectionOneCodeOfUse ;
        buildingPositionView = $.viewAppComboBoxAeDESModeFormsSectionOneBuildingPosition ;
    }
    $.btnAeDESModeFormsSectionOneLoadPosition.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.init( L( 'generic_latitude_txt_hint' ) , OnLatitude_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["LATITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.init( L( 'generic_longitude_txt_hint' ) , OnLongitude_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["LONGITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.init( L( 'generic_altitude_txt_hint' ) , OnAltitude_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.set_text_value( Alloy.Globals.AeDESModeSectionOne["ALTITUDE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.init( L( 'generic_province_txt_hint' ) , OnProvince_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.set_text_value( Alloy.Globals.AeDESModeSectionOne["PROVINCE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.init( L( 'generic_municipality_txt_hint' ) , OnMunicipality_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.set_text_value( Alloy.Globals.AeDESModeSectionOne["MUNICIPALITY"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.init( L( 'generic_place_txt_hint' ) , OnPlace_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.set_text_value( Alloy.Globals.AeDESModeSectionOne["PLACE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.set_text_value( Alloy.Globals.AeDESModeSectionOne["ADDRESS"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.init( L( 'generic_civicno_txt_hint' ) , OnCivicNo_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.set_text_value( Alloy.Globals.AeDESModeSectionOne["CIVIC_NO"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneCivicNo.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.init( L( 'generic_building_name_or_owner_txt_hint' ) , OnBuildingNameOrOwner_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.set_text_value( Alloy.Globals.AeDESModeSectionOne["B_NAME_OR_OWNER"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionOneBuildingNameOrOwner.enabled( view_enabled ) ;

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
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeFormsSectionOneWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsSectionOneLatitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneLongitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneAltitude.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneProvince.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneMunicipality.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOnePlace.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionOneAddress.get_text_field() ,
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