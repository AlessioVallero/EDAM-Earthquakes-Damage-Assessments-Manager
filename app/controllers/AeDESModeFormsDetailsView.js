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
            $.navigationWindowFormsDetails.close() ;
        }
        else
        {
            $.aedesModeFormsDetailsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Team textfield change event handler
function OnTeam_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["TEAM"] = $.widgetAppTextFieldAeDESModeFormsDetailsTeam.get_text_value() ;
}

// Form id textfield change event handler
function OnFormId_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["FORM_ID"] = $.widgetAppTextFieldAeDESModeFormsDetailsFormId.get_text_value() ;
}

// Form no textfield change event handler
function OnFormNo_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["FORM_NO"] = $.widgetAppTextFieldAeDESModeFormsDetailsFormNo.get_text_value() ;
}

// Date picker change event handler
function OnDate_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["DATE"] = Date.parse( $.datePickerDate.getValue() ) ;
}

// Istat reg textfield change event handler
function OnIstatReg_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_REG"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatReg.get_text_value() ;
}

// Istat reg textfield change event handler
function OnIstatReg_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_REG"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatReg.get_text_value() ;
}

// Istat prov textfield change event handler
function OnIstatProv_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_PROV"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatProv.get_text_value() ;
}

// Istat public textfield change event handler
function OnIstatPublic_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_PUBLIC"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatPublic.get_text_value() ;
}

// Aggregate N textfield change event handler
function OnAggregateN_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["AGGREGATE_N"] = $.widgetAppTextFieldAeDESModeFormsDetailsAggregateN.get_text_value() ;
}

// Building N textfield change event handler
function OnBuildingN_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["BUILDING_N"] = $.widgetAppTextFieldAeDESModeFormsDetailsBuildingN.get_text_value() ;
}

// Istat Place Code textfield change event handler
function OnIstatPlaceCode_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_PLACE_CODE"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatPlaceCode.get_text_value() ;
}

// Paper type textfield change event handler
function OnPaperType_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["PAPER_TYPE"] = $.widgetAppTextFieldAeDESModeFormsDetailsPaperType.get_text_value() ;
}

// Paper N textfield change event handler
function OnPaperN_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["PAPER_N"] = $.widgetAppTextFieldAeDESModeFormsDetailsPaperN.get_text_value() ;
}

// Istat Census Section textfield change event handler
function OnIstatCensusSection_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ISTAT_CENSUS_SECTION"] = $.widgetAppTextFieldAeDESModeFormsDetailsIstatCensusSection.get_text_value() ;
}

// Sheet textfield change event handler
function OnSheet_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["SHEET"] = $.widgetAppTextFieldAeDESModeFormsDetailsSheet.get_text_value() ;
}

// Attachment textfield change event handler
function OnAttachment_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["ATTACHMENT"] = $.widgetAppTextFieldAeDESModeFormsDetailsAttachment.get_text_value() ;
}

// Particles textfield change event handler
function OnParticles_Change( e , type )
{
    Alloy.Globals.AeDESModeDetails["PARTICLES"] = $.widgetAppTextFieldAeDESModeFormsDetailsParticles.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    // Init app textfields
    $.widgetAppTextFieldAeDESModeFormsDetailsTeam.init( L( 'generic_team_txt_hint' ) , OnTeam_Change , null , 4 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsTeam.set_text_value( Alloy.Globals.AeDESModeDetails["TEAM"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsTeam.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsFormId.init( L( 'generic_formid_txt_hint' ) , OnFormId_Change , null , 22 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsFormId.set_text_value( Alloy.Globals.AeDESModeDetails["FORM_ID"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsFormId.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsFormNo.init( L( 'generic_formno_txt_hint' ) , OnFormNo_Change , null , 4 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsFormNo.set_text_value( Alloy.Globals.AeDESModeDetails["FORM_NO"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsFormNo.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsIstatReg.init( L( 'generic_istat_reg_txt_hint' ) , OnIstatReg_Change , null , 2 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatReg.set_text_value( Alloy.Globals.AeDESModeDetails["ISTAT_REG"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatReg.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsIstatProv.init( L( 'generic_istat_prov_txt_hint' ) , OnIstatProv_Change , null , 3 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatProv.set_text_value( Alloy.Globals.AeDESModeDetails["ISTAT_PROV"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatProv.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPublic.init( L( 'generic_istat_public_txt_hint' ) , OnIstatPublic_Change , null , 3 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPublic.set_text_value( Alloy.Globals.AeDESModeDetails["ISTAT_PUBLIC"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPublic.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsAggregateN.init( L( 'generic_aggregate_n_txt_hint' ) , OnAggregateN_Change , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD , 7 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsAggregateN.set_text_value( Alloy.Globals.AeDESModeDetails["AGGREGATE_N"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsAggregateN.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsBuildingN.init( L( 'generic_building_n_txt_hint' ) , OnBuildingN_Change , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD , 3 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsBuildingN.set_text_value( Alloy.Globals.AeDESModeDetails["BUILDING_N"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsBuildingN.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPlaceCode.init( L( 'generic_istat_place_code_txt_hint' ) , OnIstatPlaceCode_Change , null , 4 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPlaceCode.set_text_value( Alloy.Globals.AeDESModeDetails["ISTAT_PLACE_CODE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatPlaceCode.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsPaperType.init( L( 'generic_paper_type_txt_hint' ) , OnPaperType_Change , null , 6 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsPaperType.set_text_value( Alloy.Globals.AeDESModeDetails["PAPER_TYPE"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsPaperType.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsPaperN.init( L( 'generic_paper_n_txt_hint' ) , OnPaperN_Change , Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD , 4 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsPaperN.set_text_value( Alloy.Globals.AeDESModeDetails["PAPER_N"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsPaperN.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsIstatCensusSection.init( L( 'generic_istat_census_section_txt_hint' ) , OnIstatCensusSection_Change , null , 3 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatCensusSection.set_text_value( Alloy.Globals.AeDESModeDetails["ISTAT_CENSUS_SECTION"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsIstatCensusSection.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsSheet.init( L( 'generic_sheet_txt_hint' ) , OnSheet_Change , null , 3 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsSheet.set_text_value( Alloy.Globals.AeDESModeDetails["SHEET"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsSheet.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsAttachment.init( L( 'generic_attachment_txt_hint' ) , OnAttachment_Change , null , 2 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsAttachment.set_text_value( Alloy.Globals.AeDESModeDetails["ATTACHMENT"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsAttachment.enabled( view_enabled ) ;

    $.widgetAppTextFieldAeDESModeFormsDetailsParticles.init( L( 'generic_particles_txt_hint' ) , OnParticles_Change , null , 16 ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsParticles.set_text_value( Alloy.Globals.AeDESModeDetails["PARTICLES"] ) ;
    $.widgetAppTextFieldAeDESModeFormsDetailsParticles.enabled( view_enabled ) ;

    $.viewDisabler.setHeight( $.datePickerDate.getHeight() ) ;
    $.viewDisabler.visible = !view_enabled ;
    if( Alloy.Globals.AeDESModeDetails["DATE"] )
    {
        var saved_date = new Date() ;
        saved_date.setTime( Alloy.Globals.AeDESModeDetails["DATE"] ) ;
        $.datePickerDate.setValue( saved_date ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeFormsDetailsWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsDetailsFormNo.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowFormsDetails.open() ;
    }
    else
    {
        $.aedesModeFormsDetailsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
