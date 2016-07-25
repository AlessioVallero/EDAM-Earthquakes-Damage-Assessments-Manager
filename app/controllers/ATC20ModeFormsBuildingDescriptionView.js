var args = arguments[0] || {} ;
var current_mode = args.mode ;
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
controls.push( $.btnATC20ModeFormsBuildingDescriptionLoadAddress ) ;

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
            $.navigationWindowBuildingDescription.close() ;
        }
        else
        {
            $.atc20ModeBuildingDescriptionWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Load address button click event handler
function OnBtnLoadAddress_Click( e )
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
                        success: UpdateAddress
                    } ) ;
                }
                else
                {
                    EndAsyncBusyAction( $.activity_indicator , controls , EndAsyncBusyAction_CallBack ) ;
 
                    alert( L( 'generic_user_not_authorized_to_ask_localization' ) ) ;
                }
            } , EndAsyncBusyAction_CallBack ) ;
        }
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

function UpdateAddress( e )
{
    Ti.Geolocation.removeEventListener( 'location' , UpdateAddress ) ;

    if( !e.success || e.error )
    {
        alert( L( 'unable_to_get_location_err_msg' ) + " " + e.error ) ;
        return ;
    }

    Alloy.Globals.reverseGeocode( e.coords.latitude , e.coords.longitude , OnGeoreserve_Done ) ;
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
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value( address ) ;
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

// BuildingName textfield change event handler
function OnBuildingName_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_value() ;
}

// Address textfield change event handler
function OnAddress_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_value() ;
}

// AlsoKnownAs textfield change event handler
function OnAlsoKnownAs_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.get_text_value() ;
}

// Lot textfield change event handler
function OnLot_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["LOT"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.get_text_value() ;
}

// DP textfield change event handler
function OnDP_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["DP"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.get_text_value() ;
}

// OtherID textfield change event handler
function OnOtherID_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.get_text_value() ;
}

// ContactName textfield change event handler
function OnContactName_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.get_text_value() ;
}

// BuildingContactPhone textfield change event handler
function OnBuildingContactPhone_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_value() ;
}

// NumberOfStoriesAboveTheGround textfield change event handler
function OnNumberOfStoriesAboveTheGround_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_value() ;
}

// NumberOfStoriesBelowTheGround textfield change event handler
function OnNumberOfStoriesBelowTheGround_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_value() ;
}

// ApproxFootprintArea textfield change event handler
function OnApproxFootprintArea_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_value() ;
}

// NumberOfResidentialUnits textfield change event handler
function OnNumberOfResidentialUnits_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_value() ;
}

// NumberOfResidentialUnitsNotHabitable textfield change event handler
function OnNumberOfResidentialUnitsNotHabitable_Change( e , type )
{
    Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.get_text_value() ;
}

// TypeOfConstruction picker event handler
function OnTypeOfConstruction_Change( e )
{
    Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] = e.id ;
    // If the selected item is not "Other" the OtherName will be set to empty
    if( e.id != 14 )
    {
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.set_text_value( "" ) ;
        Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] = "" ;
    }
}

// TypeOfConstructionOtherName textfield change event handler
function OnTypeOfConstructionOtherName_Change( e , type )
{
    var newOtherNameValue = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_value() ;
    Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] = newOtherNameValue ;
    // If the value is not empty, we must also set the selected item of the TypeOfConstruction picker to "Other"
    if( newOtherNameValue )
    {
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.set_selected_index( "14" ) ;
        Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] = "14" ;
    }
}

// PrimaryOccupancy picker event handler
function OnPrimaryOccupancy_Change( e )
{
    Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] = e.id ;
    // If the selected item is not "Other" the OtherName must be empty
    if( e.id != 8 )
    {
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.set_text_value( "" ) ;
        Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] = "" ;
    }
}

// PrimaryOccupancyOtherName textfield change event handler
function OnPrimaryOccupancyOtherName_Change( e , type )
{
    var newOtherNameValue = $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_value() ;
    Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] = newOtherNameValue ;
    // If the value is not empty, we must also set the selected item of the PrimaryOccupancy picker to "Other"
    if( newOtherNameValue )
    {
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.set_selected_index( "8" ) ;
        Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] = "8" ;
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
    var typeOfConstructionParentView = null ;
    var primaryOccupancyParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        typeOfConstructionParentView = mainView ;
        primaryOccupancyParentView = mainView ;
    }
    else
    {
        typeOfConstructionParentView = $.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction ;
        primaryOccupancyParentView = $.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy ;
    }

    var approx_footprint_area_msg = "" ;
    if( current_mode == "CA" )
    {
        approx_footprint_area_msg = L( 'generic_approx_footprint_area_txt_hint' ) ;

        var primaryOccupancyValues =
        {
            0: { title: L( 'generic_primary_occupancy_dwelling' ) } ,
            1: { title: L( 'generic_primary_occupancy_other_residential' ) } ,
            2: { title: L( 'generic_primary_occupancy_public_assembly' ) } ,
            3: { title: L( 'generic_primary_occupancy_emergency_services' ) } ,
            4: { title: L( 'generic_primary_occupancy_commercial' ) } ,
            5: { title: L( 'generic_primary_occupancy_offices' ) } ,
            6: { title: L( 'generic_primary_occupancy_industrial' ) } ,
            7: { title: L( 'generic_primary_occupancy_government' ) } ,
            8: { title: L( 'generic_primary_occupancy_historic' ) } ,
            9: { title: L( 'generic_primary_occupancy_school' ) } ,
            10: { title: L( 'generic_primary_occupancy_other' ) }
        } ;

        var typeOfConstructionValues =
        {
            0: { title: L( 'generic_type_of_construction_wood_frame' ) } ,
            1: { title: L( 'generic_type_of_construction_steel_frame' ) } ,
            2: { title: L( 'generic_type_of_construction_tilt_up_concrete' ) } ,
            3: { title: L( 'generic_type_of_construction_concrete_frame' ) } ,
            4: { title: L( 'generic_type_of_construction_concrete_shear_wall' ) } ,
            5: { title: L( 'generic_type_of_construction_unreinforced_masonry' ) } ,
            6: { title: L( 'generic_type_of_construction_reinforced_masonry' ) } ,
            7: { title: L( 'generic_type_of_construction_other' ) }
        } ;
    }
    else if( current_mode == "NZ" )
    {
        approx_footprint_area_msg = L( 'generic_avg_area_m2_txt_hint' ) ;

        var primaryOccupancyValues =
        {
            0: { title: L( 'generic_primary_occupancy_dwelling' ) } ,
            1: { title: L( 'generic_primary_occupancy_other_residential' ) } ,
            2: { title: L( 'generic_primary_occupancy_public_assembly' ) } ,
            3: { title: L( 'generic_primary_occupancy_school' ) } ,
            4: { title: L( 'generic_primary_occupancy_commercial_offices' ) } ,
            5: { title: L( 'generic_primary_occupancy_industrial' ) } ,
            6: { title: L( 'generic_primary_occupancy_government' ) } ,
            7: { title: L( 'generic_primary_occupancy_heritage_listed' ) } ,
            8: { title: L( 'generic_primary_occupancy_other' ) }
        } ;

        var typeOfConstructionValues =
        {
            0: { title: L( 'generic_type_of_construction_timber_frame' ) } ,
            1: { title: L( 'generic_type_of_construction_steel_frame' ) } ,
            2: { title: L( 'generic_type_of_construction_tilt_up_concrete' ) } ,
            3: { title: L( 'generic_type_of_construction_concrete_frame' ) } ,
            4: { title: L( 'generic_type_of_construction_concrete_shear_wall' ) } ,
            5: { title: L( 'generic_type_of_construction_unreinforced_masonry' ) } ,
            6: { title: L( 'generic_type_of_construction_reinforced_masonry' ) } ,
            7: { title: L( 'generic_type_of_construction_other' ) }
        } ;
    }
    else if( current_mode == "NEPAL" )
    {
        approx_footprint_area_msg = L( 'generic_year_of_construction_text_hint' ) ;

        var primaryOccupancyValues =
        {
            0: { title: L( 'generic_housing_text_msg' ) } ,
            1: { title: L( 'generic_primary_occupancy_medical_services_hospital' ) } ,
            2: { title: L( 'generic_primary_occupancy_public_agency' ) } ,
            3: { title: L( 'generic_primary_occupancy_emergency_services' ) } ,
            4: { title: L( 'generic_primary_occupancy_commercial' ) } ,
            5: { title: L( 'generic_primary_occupancy_industrial' ) } ,
            6: { title: L( 'generic_primary_occupancy_offices' ) } ,
            7: { title: L( 'generic_primary_occupancy_school' ) } ,
            8: { title: L( 'generic_primary_occupancy_other' ) }
        } ;

        var typeOfConstructionValues =
        {
            0: { title: L( 'generic_type_of_construction_rcc_frame_with_infill_u' ) } ,
            1: { title: L( 'generic_type_of_construction_rcc_frame_with_infill_wds' ) } ,
            2: { title: L( 'generic_type_of_construction_rcc_frame_with_infill_nbc' ) } ,
            3: { title: L( 'generic_type_of_construction_rcc_frame_with_infill_nbc_plus' ) } ,
            4: { title: L( 'generic_type_of_construction_rcc_frame_with_infill_ccp' ) } ,
            5: { title: L( 'generic_type_of_construction_adobe_mud_block' ) } ,
            6: { title: L( 'generic_type_of_construction_brick_masonry_mud' ) } ,
            7: { title: L( 'generic_type_of_construction_stone_masonry_mud' ) } ,
            8: { title: L( 'generic_type_of_construction_brick_masonry_cement' ) } ,
            9: { title: L( 'generic_type_of_construction_stone_masonry_cement' ) } ,
            10: { title: L( 'generic_type_of_construction_concrete_block_masonry' ) } ,
            11: { title: L( 'generic_type_of_construction_rammed_earth' ) } ,
            12: { title: L( 'generic_type_of_construction_wooden_bamboo' ) } ,
            13: { title: L( 'generic_type_of_construction_ekra' ) } ,
            14: { title: L( 'generic_type_of_construction_other' ) }
        } ;
    }

    $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.init( L( 'generic_type_of_construction_text_msg' ) , typeOfConstructionValues , OnTypeOfConstruction_Change , null , typeOfConstructionParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] )
    {
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.set_selected_index( Alloy.Globals.ATC20ModeBuildingDescription["TYPE_OF_CONSTRUCTION"] ) ;
    }

    $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.init( L( 'generic_primary_occupancy_text_msg' ) , primaryOccupancyValues , OnPrimaryOccupancy_Change , null , primaryOccupancyParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] )
    {
        $.widgetAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.set_selected_index( Alloy.Globals.ATC20ModeBuildingDescription["PRIMARY_OCCUPANCY"] ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.init( L( 'generic_building_name_txt_hint' ) , OnBuildingName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_NAME"] ) ;

    if( current_mode == "CA" || current_mode == "NEPAL" )
    {
        // Remove ALSO_KNOWN_AS field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs = null ;
        // Remove LOT field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionLot = null ;
        // Remove DP field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionDP = null ;
        // Remove OTHER_ID field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionOtherID = null ;
        // Remove CONTACT_NAME field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionContactName = null ;

        if( current_mode == "CA" )
        {
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change ) ;
        }
        else if( current_mode == "NEPAL" )
        {
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init( L( 'generic_village_txt_hint' ) , OnAddress_Change ) ;
        }
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.init( approx_footprint_area_msg , OnApproxFootprintArea_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.init( L( 'generic_residential_units_not_habitable_txt_hint' ) , OnNumberOfResidentialUnitsNotHabitable_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.set_label_height( 80 ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS_UNINHABITABLE"] ) ;

        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.setTop( 210 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.setTop( 280 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.setTop( 350 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.setTop( 420 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.setTop( 490 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.setTop( 560 ) ;
        $.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.setTop( 660 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.setTop( 730 ) ;
        $.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.setTop( 800 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.setTop( 870 ) ;
        $.viewAppButtonSave.setTop( 940 ) ;

        RegisterHideKeyboard( $.atc20ModeBuildingDescriptionWindow ,
        [
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_field()
        ] ) ;
    }
    else if( current_mode == "NZ" )
    {
        // Remove RESIDENTIAL_UNITS_UNINHABITABLE field
        $.scrollViewBuildingDescription.remove( $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnitsNotHabitable = null ;

        $.viewAppComboBoxATC20ModeFormsBuildingDescriptionTypeOfConstruction.setTop( 910 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.setTop( 980 ) ;
        $.viewAppComboBoxATC20ModeFormsBuildingDescriptionPrimaryOccupancy.setTop( 1050 ) ;
        $.viewAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.setTop( 1120 ) ;
        $.viewAppButtonSave.setTop( 1190 ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.init( L( 'generic_also_known_as_txt_hint' ) , OnAlsoKnownAs_Change ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["ALSO_KNOWN_AS"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.init( L( 'generic_lot_txt_hint' ) , OnLot_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["LOT"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.init( L( 'generic_dp_txt_hint' ) , OnDP_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["DP"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.init( L( 'generic_other_id_txt_hint' ) , OnOtherID_Change ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["OTHER_ID"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.init( L( 'generic_contact_name_txt_hint' ) , OnContactName_Change ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["CONTACT_NAME"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["ADDRESS"] ) ;

        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.init( approx_footprint_area_msg , OnApproxFootprintArea_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.enabled( view_enabled ) ;
        $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["APPROX_FT_AREA"] ) ;

        RegisterHideKeyboard( $.atc20ModeBuildingDescriptionWindow ,
        [
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAlsoKnownAs.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionLot.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionDP.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionOtherID.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingName.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionContactName.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionAddress.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionApproxFootprintArea.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.get_text_field() ,
            $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.get_text_field()
        ] ) ;
    }

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.init( L( 'generic_building_contact_phone_txt_hint' ) , OnBuildingContactPhone_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionBuildingContactPhone.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["BUILDING_CONTACT"] ) ;

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.init( L( 'generic_number_of_stories_above_the_ground_txt_hint' ) , OnNumberOfStoriesAboveTheGround_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesAboveTheGround.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["NOT_UNDERGROUND_PLANS_NO"] ) ;

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.init( L( 'generic_number_of_stories_below_the_ground_txt_hint' ) , OnNumberOfStoriesBelowTheGround_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfStoriesBelowTheGround.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["UNDERGROUND_PLANS_NO"] ) ;

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.init( L( 'generic_residential_units_txt_hint' ) , OnNumberOfResidentialUnits_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionNumberOfResidentialUnits.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["RESIDENTIAL_UNITS"] ) ;

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.init( L( 'generic_other_text_msg' ) , OnTypeOfConstructionOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionTypeOfConstructionOtherName.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["OTHER_TYPE_OF_CONSTRUCTION"] ) ;

    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.init( L( 'generic_other_text_msg' ) , OnPrimaryOccupancyOtherName_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.enabled( view_enabled ) ;
    $.widgetAppTextFieldATC20ModeFormsBuildingDescriptionPrimaryOccupancyOtherName.set_text_value( Alloy.Globals.ATC20ModeBuildingDescription["OTHER_PRIMARY_OCCUPANCY"] ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    $.btnATC20ModeFormsBuildingDescriptionLoadAddress.enabled = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBuildingDescription.open() ;
    }
    else
    {
        $.atc20ModeBuildingDescriptionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
