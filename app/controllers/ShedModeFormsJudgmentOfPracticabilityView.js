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
            $.navigationWindowJudgmentOfPracticability.close() ;
        }
        else
        {
            $.shedModeJudgmentOfPracticabilityWindow.close() ;
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
    Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] = e.id ;
}

// NotStructural picker event handler
function OnNotStructural_Change( e )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] = e.id ;
}

// External picker event handler
function OnExternal_Change( e )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] = e.id ;
}

// Geotechnical picker event handler
function OnGeotechnical_Change( e )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] = e.id ;
}

// OutcomePracticability picker event handler
function OnOutcomePracticability_Change( e )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] = e.id ;
}

// HousingUnitsUninhabitable textfield change event handler
function OnHousingUnitsUninhabitable_Change( e , type )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.get_text_value() ;
}

// FamiliesEvacuated textfield change event handler
function OnFamiliesEvacuated_Change( e , type )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.get_text_value() ;
}

// EvacueesN textfield change event handler
function OnEvacueesN_Change( e , type )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.get_text_value() ;
}

// AccuracyVisit picker event handler
function OnAccuracyVisit_Change( e , type )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] = e.id ;
}

// Other textfield change event handler
function OnOther_Change( e , type )
{
    Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"] = $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var accuracyVisitParentView = null ;
    var outcomePracticabilityParentView = null ;
    var structuralParentView = null ;
    var notStructuralParentView = null ;
    var externalParentView = null ;
    var geotechnicalParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        accuracyVisitParentView = mainView ;
        outcomePracticabilityParentView = mainView ;
        structuralParentView = mainView ;
        notStructuralParentView = mainView ;
        externalParentView = mainView ;
        geotechnicalParentView = mainView ;
    }
    else
    {
        accuracyVisitParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit ;
        outcomePracticabilityParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability ;
        structuralParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural ;
        notStructuralParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural ;
        externalParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal ;
        geotechnicalParentView = $.viewAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical ;
    }
    // Init app comboboxes
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
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.init( L( 'generic_accuracy_visit_text_msg' ) , accuracyVisitValues , OnAccuracyVisit_Change , null , accuracyVisitParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityAccuracyVisit.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["ACCURACY_VISIT"] ) ;
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
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.init( L( 'generic_outcome_practicability_text_msg' ) , outcomePracticabilityValues , OnOutcomePracticability_Change , null , outcomePracticabilityParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityOutcomePracticability.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["OUTCOME_PRACTICABILITY"] ) ;
    }

    var structuralValues =
    {
        0: { title: L( 'generic_structural_low' ) } ,
        1: { title: L( 'generic_structural_low_with_measures' ) } ,
        2: { title: L( 'generic_structural_high' ) }
    } ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.init( L( 'generic_structural_text_msg' ) , structuralValues , OnStructural_Change , null , structuralParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityStructural.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["STRUCTURAL"] ) ;
    }

    var notStructuralValues =
    {
        0: { title: L( 'generic_not_structural_low' ) } ,
        1: { title: L( 'generic_not_structural_low_with_measures' ) } ,
        2: { title: L( 'generic_not_structural_high' ) }
    } ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.init( L( 'generic_not_structural_text_msg' ) , notStructuralValues , OnNotStructural_Change , null , notStructuralParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityNotStructural.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["NOT_STRUCTURAL"] ) ;
    }

    var externalValues =
    {
        0: { title: L( 'generic_external_low' ) } ,
        1: { title: L( 'generic_external_low_with_measures' ) } ,
        2: { title: L( 'generic_external_high' ) }
    } ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.init( L( 'generic_external_text_msg' ) , externalValues , OnExternal_Change , null , externalParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityExternal.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["EXTERNAL"] ) ;
    }

    var geotechnicalValues =
    {
        0: { title: L( 'generic_geotechnical_low' ) } ,
        1: { title: L( 'generic_geotechnical_low_with_measures' ) } ,
        2: { title: L( 'generic_geotechnical_high' ) }
    } ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.init( L( 'generic_geotechnical_text_msg' ) , geotechnicalValues , OnGeotechnical_Change , null , geotechnicalParentView ) ;
    $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.enabled( view_enabled ) ;

    if( Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] )
    {
        $.widgetAppComboBoxShedModeFormsJudgmentOfPracticabilityGeotechnical.set_selected_index( Alloy.Globals.ShedModeJudgmentOfPracticability["GEOTECHNICAL"] ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.init( L( 'generic_housing_units_uninhabitable_txt_hint' ) , OnHousingUnitsUninhabitable_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.enabled( view_enabled ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.set_text_value( Alloy.Globals.ShedModeJudgmentOfPracticability["HOUSING_UNITS_UNINHABITABLE"] ) ;

    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.init( L( 'generic_families_evacuated_txt_hint' ) , OnFamiliesEvacuated_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.enabled( view_enabled ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.set_text_value( Alloy.Globals.ShedModeJudgmentOfPracticability["FAMILIES_EVACUATED"] ) ;

    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.init( L( 'generic_evacuees_n_txt_hint' ) , OnEvacueesN_Change , Titanium.UI.KEYBOARD_NUMBER_PAD ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.enabled( view_enabled ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityEvacueesN.set_text_value( Alloy.Globals.ShedModeJudgmentOfPracticability["EVACUEES_N"] ) ;

    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.init( L( 'generic_other_txt_hint' ) , OnOther_Change ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.enabled( view_enabled ) ;
    $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.set_text_value( Alloy.Globals.ShedModeJudgmentOfPracticability["OTHER"] ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.shedModeJudgmentOfPracticabilityWindow ,
    [
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityHousingUnitsUninhabitable.get_text_field() ,
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.get_text_field() ,
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityFamiliesEvacuated.get_text_field() ,
        $.widgetAppTextFieldShedModeFormsJudgmentOfPracticabilityOther.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowJudgmentOfPracticability.open() ;
    }
    else
    {
        $.shedModeJudgmentOfPracticabilityWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
