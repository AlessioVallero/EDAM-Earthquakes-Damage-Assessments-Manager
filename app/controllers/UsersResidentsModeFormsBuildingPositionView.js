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
controls.push( $.btnUsersResidentsModeFormsBuildingPositionLoadPosition ) ;

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
            $.navigationWindowBuildingPosition.close() ;
        }
        else
        {
            $.usersResidentsModeFormsBuildingPositionWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
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
    Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.get_text_value() ;
}

// Longitude textfield change event handler
function OnLongitude_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.get_text_value() ;
}

// Altitude textfield change event handler
function OnAltitude_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.get_text_value() ;
}

function UpdatePosition( e )
{
    Ti.Geolocation.removeEventListener( 'location' , UpdatePosition ) ;

    if( !e.success || e.error )
    {
        alert( L( 'unable_to_get_location_err_msg' ) + " " + e.error ) ;
        return ;
    }

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.set_text_value( e.coords.latitude ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.set_text_value( e.coords.longitude ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.set_text_value( e.coords.altitude ) ;

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
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.set_text_value( formattedAnswer['administrative_area_level_2'] ) ;
        OnProvince_Change() ;
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.set_text_value( formattedAnswer['locality'] ) ;
        OnMunicipality_Change() ;
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.set_text_value( formattedAnswer['administrative_area_level_1'] ) ;
        OnPlace_Change() ;
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.set_text_value( formattedAnswer['postal_code'] ) ;
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
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.set_text_value( address ) ;
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
    Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.get_text_value() ;
}

// Municipality textfield change event handler
function OnMunicipality_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.get_text_value() ;
}

// Place textfield change event handler
function OnPlace_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.get_text_value() ;
}

// Address textfield change event handler
function OnAddress_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.get_text_value() ;
}

// CivicNo textfield change event handler
function OnCivicNo_Change( e , type )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] = $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.get_text_value() ;
}

// Compiler position picker event handler
function OnCompilerPosition_Change( e )
{
    Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var compilerPosParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        compilerPosParentView = $.scrollViewBuildingPosition ;
    }
    else
    {
        compilerPosParentView = $.getView() ;
    }
    $.btnUsersResidentsModeFormsBuildingPositionLoadPosition.enabled = view_enabled ;
    // Init app textfields
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.init( L( 'generic_latitude_txt_hint' ) , OnLatitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["LATITUDE"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.init( L( 'generic_longitude_txt_hint' ) , OnLongitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["LONGITUDE"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.init( L( 'generic_altitude_txt_hint' ) , OnAltitude_Change , Titanium.UI.KEYBOARD_TYPE_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["ALTITUDE"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.init( L( 'generic_province_txt_hint' ) , OnProvince_Change ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["PROVINCE"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.init( L( 'generic_municipality_txt_hint' ) , OnMunicipality_Change ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["MUNICIPALITY"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.init( L( 'generic_place_txt_hint' ) , OnPlace_Change ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["PLACE"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["ADDRESS"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.init( L( 'generic_civicno_txt_hint' ) , OnCivicNo_Change , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.set_text_value( Alloy.Globals.UsersResidentsModeBuildingPosition["CIVIC_NO"] ) ;
    $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.enabled( view_enabled ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;
    // Init app combobox
    var compilerPositionValues =
    {
        0: { title: L( 'generic_compiler_position_outside_the_building' ) } ,
        1: { title: L( 'generic_compiler_position_inside_the_building' ) }
    } ;
    $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.init( L( 'generic_compiler_position_text_msg' ) , compilerPositionValues , OnCompilerPosition_Change , null , compilerPosParentView ) ;
    $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.enabled( view_enabled ) ;

    if( Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] )
    {
        $.widgetAppComboBoxUsersResidentsModeFormsDetailsCompilerPosition.set_selected_index( Alloy.Globals.UsersResidentsModeBuildingPosition["COMPILER_POS"] ) ;
    }

    RegisterHideKeyboard( $.usersResidentsModeFormsBuildingPositionWindow ,
    [
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLatitude.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionLongitude.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAltitude.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionProvince.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionMunicipality.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionPlace.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionAddress.get_text_field() ,
        $.widgetAppTextFieldUsersResidentsModeFormsBuildingPositionCivicNo.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBuildingPosition.open() ;
    }
    else
    {
        $.usersResidentsModeFormsBuildingPositionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
