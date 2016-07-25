var args = arguments[0] || {};
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "form:save_from_section" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSectionTwo.close() ;
        }
        else
        {
            $.aedesModeSectionTwoWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PlansNo picker event handler
function OnPlansNo_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] = e.id ;
}

// AverageHeightOfFloor picker event handler
function OnAverageHeightOfFloor_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] = e.id ;
}

// UndergroundPlansNo picker event handler
function OnUndergroundPlansNo_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] = e.id ;
}

// AverageSurface picker event handler
function OnAverageSurface_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] = e.id ;
}

// ConstructionAge picker event handler
function OnConstructionAge_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] = e.id ;
}

// RenovationAge picker event handler
function OnRenovationAge_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] = e.id ;
}

// Utilization picker event handler
function OnUtilization_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] = e.id ;
}

// Property picker event handler
function OnProperty_Change( e )
{
    Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] = e.id ;
}

// UnitOfUseHousing textfield change event handler
function OnUnitOfUseHousing_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.get_text_value() ;
}

// UnitOfUseProductive textfield change event handler
function OnUnitOfUseProductive_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.get_text_value() ;
}

// UnitOfUseCommerce textfield change event handler
function OnUnitOfUseCommerce_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.get_text_value() ;
}

// UnitOfUseOffices textfield change event handler
function OnUnitOfUseOffices_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.get_text_value() ;
}

// UnitOfUsePublicServices textfield change event handler
function OnUnitOfUsePublicServices_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.get_text_value() ;
}

// UnitOfUseDeposit textfield change event handler
function OnUnitOfUseDeposit_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.get_text_value() ;
}

// UnitOfUseStrategic textfield change event handler
function OnUnitOfUseStrategic_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.get_text_value() ;
}

// UnitOfUseTourism textfield change event handler
function OnUnitOfUseTourism_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.get_text_value() ;
}

// Occupants textfield change event handler
function OnOccupants_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] = $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var plansNoParentView = null ;
    var averageHeightOfFloorParentView = null ;
    var undergroundPlansNoParentView = null ;
    var averageSurfaceParentView = null ;
    var constructionAgeParentView = null ;
    var renovationAgeParentView = null ;
    var utilizationParentView = null ;
    var propertyParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        plansNoParentView = mainView ;
        averageHeightOfFloorParentView = mainView ;
        undergroundPlansNoParentView = mainView ;
        averageSurfaceParentView = mainView ;
        constructionAgeParentView = mainView ;
        renovationAgeParentView = mainView ;
        utilizationParentView = mainView ;
        propertyParentView = mainView ;
    }
    else
    {
        plansNoParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoPlansNo ;
        averageHeightOfFloorParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor ;
        undergroundPlansNoParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo ;
        averageSurfaceParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoAverageSurface ;
        constructionAgeParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoConstructionAge ;
        renovationAgeParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoRenovationAge ;
        utilizationParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoUtilization ;
        propertyParentView = $.viewAppComboBoxAeDESModeFormsSectionTwoProperty ;
    }
    // Init app comboboxes
    var plansNoValues =
    {
        0: { title: '1' } ,
        1: { title: '2' } ,
        2: { title: '3' } ,
        3: { title: '4' } ,
        4: { title: '5' } ,
        5: { title: '6' } ,
        6: { title: '7' } ,
        7: { title: '8' } ,
        8: { title: '9' } ,
        9: { title: '10' } ,
        10: { title: '11' } ,
        11: { title: '12' } ,
        12: { title: '>12' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.init( L( 'generic_plans_no_text_msg' ) , plansNoValues , OnPlansNo_Change , null , plansNoParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoPlansNo.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["PLANS_NO"] ) ;
    }

    var averageHeightOfFloorValues =
    {
        0: { title: '<=2,5' } ,
        1: { title: '2,5-3,5' } ,
        2: { title: '3,5-5' } ,
        3: { title: '>5' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.init( L( 'generic_average_height_of_floor_text_msg' ) , averageHeightOfFloorValues , OnAverageHeightOfFloor_Change , null , averageHeightOfFloorParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageHeightOfFloor.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["AVERAGE_HEIGHT_OF_FLOOR"] ) ;
    }

    var undergroundPlansNoValues =
    {
        0: { title: '0' } ,
        1: { title: '1' } ,
        2: { title: '2' } ,
        3: { title: '>=3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.init( L( 'generic_underground_plans_no_text_msg' ) , undergroundPlansNoValues , OnUndergroundPlansNo_Change , null , undergroundPlansNoParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUndergroundPlansNo.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["UNDERGROUND_PLANS_NO"] ) ;
    }

    var averageSurfaceValues =
    {
        0: { title: '<=50' } ,
        1: { title: '50-70' } ,
        2: { title: '70-100' } ,
        3: { title: '100-130' } ,
        4: { title: '130-170' } ,
        5: { title: '170-230' } ,
        6: { title: '230-300' } ,
        7: { title: '300-400' } ,
        8: { title: '400-500' } ,
        9: { title: '500-650' } ,
        10: { title: '650-900' } ,
        11: { title: '900-1200' } ,
        12: { title: '1200-1600' } ,
        13: { title: '1600-2200' } ,
        14: { title: '2200-3000' } ,
        15: { title: '>3000' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.init( L( 'generic_average_surface_text_msg' ) , averageSurfaceValues , OnAverageSurface_Change , null , averageSurfaceParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoAverageSurface.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["AVERAGE_SURFACE"] ) ;
    }

    var constructionAgeValues =
    {
        0: { title: L( 'generic_construction_age_not_detected' ) } ,
        1: { title: '<=1919' } ,
        2: { title: '19-45' } ,
        3: { title: '46-61' } ,
        4: { title: '62-71' } ,
        5: { title: '72-81' } ,
        6: { title: '82-91' } ,
        7: { title: '92-01' } ,
        8: { title: '>=2002' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.init( L( 'generic_construction_age_text_msg' ) , constructionAgeValues , OnConstructionAge_Change , null , constructionAgeParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoConstructionAge.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["CONSTRUCTION_AGE"] ) ;
    }

    var renovationAgeValues =
    {
        0: { title: L( 'generic_renovation_age_not_detected' ) } ,
        1: { title: '<=1919' } ,
        2: { title: '19-45' } ,
        3: { title: '46-61' } ,
        4: { title: '62-71' } ,
        5: { title: '72-81' } ,
        6: { title: '82-91' } ,
        7: { title: '92-01' } ,
        8: { title: '>=2002' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.init( L( 'generic_renovation_age_text_msg' ) , renovationAgeValues , OnRenovationAge_Change , null , renovationAgeParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoRenovationAge.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["RENOVATION_AGE"] ) ;
    }

    var utilizationValues =
    {
        0: { title: '>65%' } ,
        1: { title: '30-60%' } ,
        2: { title: '<30%' } ,
        3: { title: L( 'generic_utilization_not_used' ) } ,
        4: { title: L( 'generic_utilization_under_construction' ) } ,
        5: { title: L( 'generic_utilization_not_finished' ) } ,
        6: { title: L( 'generic_utilization_abandoned' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.init( L( 'generic_utilization_text_msg' ) , utilizationValues , OnUtilization_Change , null , utilizationParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoUtilization.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["UTILIZATION"] ) ;
    }

    var propertyValues =
    {
        0: { title: L( 'generic_property_private' ) } ,
        1: { title: L( 'generic_property_public' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.init( L( 'generic_property_text_msg' ) , propertyValues , OnProperty_Change , null , propertyParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionTwoProperty.set_selected_index( Alloy.Globals.AeDESModeSectionTwo["PROPERTY"] ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.init( L( 'generic_unit_of_use_housing_txt_hint' ) , OnUnitOfUseHousing_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_HOUSING"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.init( L( 'generic_unit_of_use_productive_txt_hint' ) , OnUnitOfUseProductive_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PRODUCTIVE"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.init( L( 'generic_unit_of_use_commerce_txt_hint' ) , OnUnitOfUseCommerce_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_COMMERCE"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.init( L( 'generic_unit_of_use_offices_txt_hint' ) , OnUnitOfUseOffices_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_OFFICES"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.init( L( 'generic_unit_of_use_public_services_txt_hint' ) , OnUnitOfUsePublicServices_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_PUBLIC_SERVICES"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.init( L( 'generic_unit_of_use_deposit_txt_hint' ) , OnUnitOfUseDeposit_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_DEPOSIT"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.init( L( 'generic_unit_of_use_strategic_txt_hint' ) , OnUnitOfUseStrategic_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_STRATEGIC"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.init( L( 'generic_unit_of_use_tourism_txt_hint' ) , OnUnitOfUseTourism_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.set_text_value( Alloy.Globals.AeDESModeSectionTwo["UNIT_OF_USE_TOURISM"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.init( L( 'generic_occupants_txt_hint' ) , OnOccupants_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.set_text_value( Alloy.Globals.AeDESModeSectionTwo["OCCUPANTS"] ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeSectionTwoWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseHousing.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseProductive.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseCommerce.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseOffices.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUsePublicServices.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseDeposit.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseStrategic.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoUnitOfUseTourism.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionTwoOccupants.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionTwo.open() ;
    }
    else
    {
        $.aedesModeSectionTwoWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
