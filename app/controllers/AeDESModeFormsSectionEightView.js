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
            $.navigationWindowSectionEight.close() ;
        }
        else
        {
            $.aedesModeSectionEightWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Structural picker event handler
function OnStructural_Change( e )
{
    Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] = e.id ;
}

// NotStructural picker event handler
function OnNotStructural_Change( e )
{
    Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] = e.id ;
}

// External picker event handler
function OnExternal_Change( e )
{
    Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] = e.id ;
}

// Geotechnical picker event handler
function OnGeotechnical_Change( e )
{
    Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] = e.id ;
}

// OutcomePracticability picker event handler
function OnOutcomePracticability_Change( e )
{
    Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] = e.id ;
}

// HousingUnitsUninhabitable textfield change event handler
function OnHousingUnitsUninhabitable_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] = e.id ;
}

// FamiliesEvacuated textfield change event handler
function OnFamiliesEvacuated_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] = e.id ;
}

// EvacueesN textfield change event handler
function OnEvacueesN_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] = e.id ;
}

// AccuracyVisit picker event handler
function OnAccuracyVisit_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] = e.id ;
}

// Other textfield change event handler
function OnOther_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionEight["OTHER"] = e.id ;
}

// Table view MeasuresOfEmergency click event handler
function OnTableViewAeDESModeFormsSectionEightMeasuresOfEmergency_Click( e )
{
    try
    {
        Alloy.Globals.createAndOpenControllerExt( 'AeDESModeFormsSectionEightMeasuresOfEmergency' , { measures_of_emergency_id: e.index , father_title: e.row.children[0].text , is_synchronized: current_is_synchronized } ) ;
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
    var structuralParentView = null ;
    var notStructuralParentView = null ;
    var externalParentView = null ;
    var geotechnicalParentView = null ;
    var outcomePracticabilityParentView = null ;
    var accuracyVisitParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        structuralParentView = mainView ;
        notStructuralParentView = mainView ;
        externalParentView = mainView ;
        geotechnicalParentView = mainView ;
        outcomePracticabilityParentView = mainView ;
        accuracyVisitParentView = mainView ;
    }
    else
    {
        structuralParentView = $.viewAppComboBoxAeDESModeFormsSectionEightStructural ;
        notStructuralParentView = $.viewAppComboBoxAeDESModeFormsSectionEightNotStructural ;
        externalParentView = $.viewAppComboBoxAeDESModeFormsSectionEightExternal ;
        geotechnicalParentView = $.viewAppComboBoxAeDESModeFormsSectionEightGeotechnical ;
        outcomePracticabilityParentView = $.viewAppComboBoxAeDESModeFormsSectionEightOutcomePracticability ;
        accuracyVisitParentView = $.viewAppComboBoxAeDESModeFormsSectionEightAccuracyVisit ;
    }
    // Init app comboboxes
    var structuralValues =
    {
        0: { title: L( 'generic_structural_low' ) } ,
        1: { title: L( 'generic_structural_low_with_measures' ) } ,
        2: { title: L( 'generic_structural_high' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.init( L( 'generic_structural_text_msg' ) , structuralValues , OnStructural_Change , null , structuralParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightStructural.set_selected_index( Alloy.Globals.AeDESModeSectionEight["STRUCTURAL"] ) ;
    }

    var notStructuralValues =
    {
        0: { title: L( 'generic_not_structural_low' ) } ,
        1: { title: L( 'generic_not_structural_low_with_measures' ) } ,
        2: { title: L( 'generic_not_structural_high' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.init( L( 'generic_not_structural_text_msg' ) , notStructuralValues , OnNotStructural_Change , null , notStructuralParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightNotStructural.set_selected_index( Alloy.Globals.AeDESModeSectionEight["NOT_STRUCTURAL"] ) ;
    }

    var externalValues =
    {
        0: { title: L( 'generic_external_low' ) } ,
        1: { title: L( 'generic_external_low_with_measures' ) } ,
        2: { title: L( 'generic_external_high' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.init( L( 'generic_external_text_msg' ) , externalValues , OnExternal_Change , null , externalParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightExternal.set_selected_index( Alloy.Globals.AeDESModeSectionEight["EXTERNAL"] ) ;
    }

    var geotechnicalValues =
    {
        0: { title: L( 'generic_geotechnical_low' ) } ,
        1: { title: L( 'generic_geotechnical_low_with_measures' ) } ,
        2: { title: L( 'generic_geotechnical_high' ) }
    } ;
    
    $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.init( L( 'generic_geotechnical_text_msg' ) , geotechnicalValues , OnGeotechnical_Change , null , geotechnicalParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightGeotechnical.set_selected_index( Alloy.Globals.AeDESModeSectionEight["GEOTECHNICAL"] ) ;
    }

    var outcomePracticabilityValues =
    {
        0: { title: L( 'generic_outcome_practicability_accessible' ) } ,
        1: { title: L( 'generic_outcome_practicability_temporarily_unusable' ) } ,
        2: { title: L( 'generic_outcome_practicability_partially_unusable' ) } ,
        3: { title: L( 'generic_outcome_practicability_temporarily_unusable_to_be_reviewed' ) } ,
        4: { title: L( 'generic_outcome_practicability_unusable' ) } ,
        5: { title: L( 'generic_outcome_practicability_unusable_for_external_risk' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.init( L( 'generic_outcome_practicability_text_msg' ) , outcomePracticabilityValues , OnOutcomePracticability_Change , null , outcomePracticabilityParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightOutcomePracticability.set_selected_index( Alloy.Globals.AeDESModeSectionEight["OUTCOME_PRACTICABILITY"] ) ;
    }

    var accuracyVisitValues =
    {
        0: { title: L( 'generic_accuracy_visit_complete_2_3' ) } ,
        1: { title: L( 'generic_accuracy_visit_partial' ) } ,
        2: { title: L( 'generic_accuracy_visit_outside_only' ) } ,
        3: { title: L( 'generic_accuracy_visit_refused_inspection' ) } ,
        4: { title: L( 'generic_accuracy_visit_owner_not_found' ) } ,
        5: { title: L( 'generic_accuracy_visit_ruin' ) } ,
        6: { title: L( 'generic_accuracy_visit_demolished' ) } ,
        7: { title: L( 'generic_accuracy_visit_other' ) }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.init( L( 'generic_accuracy_visit_text_msg' ) , accuracyVisitValues , OnAccuracyVisit_Change , null , accuracyVisitParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.enabled( view_enabled ) ;

    if( Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionEightAccuracyVisit.set_selected_index( Alloy.Globals.AeDESModeSectionEight["ACCURACY_VISIT"] ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.init( L( 'generic_housing_units_uninhabitable_txt_hint' ) , OnHousingUnitsUninhabitable_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.set_text_value( Alloy.Globals.AeDESModeSectionEight["HOUSING_UNITS_UNINHABITABLE"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.init( L( 'generic_families_evacuated_txt_hint' ) , OnFamiliesEvacuated_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.set_text_value( Alloy.Globals.AeDESModeSectionEight["FAMILIES_EVACUATED"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.init( L( 'generic_evacuees_n_txt_hint' ) , OnEvacueesN_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.set_text_value( Alloy.Globals.AeDESModeSectionEight["EVACUEES_N"] ) ;

    $.widgetAppTextFieldAeDESModeFormsSectionEightOther.init( L( 'generic_other_txt_hint' ) , OnOther_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightOther.enabled( view_enabled ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionEightOther.set_text_value( Alloy.Globals.AeDESModeSectionEight["OTHER"] ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeSectionEightWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsSectionEightHousingUnitsUninhabitable.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionEightFamiliesEvacuated.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionEightEvacueesN.get_text_field() ,
        $.widgetAppTextFieldAeDESModeFormsSectionEightOther.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionEight.open() ;
    }
    else
    {
        $.aedesModeSectionEightWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
