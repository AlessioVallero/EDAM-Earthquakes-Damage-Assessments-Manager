var args = arguments[0] || {};
var current_mode = args.mode ;
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
            $.navigationWindowDetailedPosting.close() ;
        }
        else
        {
            $.atc20ModeDetailedPostingWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// PreviousPosting picker event handler
function OnPreviousPosting_Change( e )
{
    Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] = e.id ;
}

// PreviousInspectorID textfield change event handler
function OnPreviousInspectorID_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] = $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.get_text_value() ;
}

// Date picker change event handler
function OnDate_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] = Date.parse( $.datePickerDate.getValue() ) ;
}

// Posting picker event handler
function OnPosting_Change( e )
{
    Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] = e.id ;
}

// Classification picker event handler
function OnClassification_Change( e )
{
    Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] = e.id ;
}

// UseAndEntryRestrictions textfield change event handler
function OnUseAndEntryRestrictions_Change( e , type )
{
    Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"] = $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var previousPostingParentView = null ;
    var postingParentView = null ;
    var classificationParentView = null ;
    // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        previousPostingParentView = thisView ;
        postingParentView = thisView ;
        classificationParentView = thisView ;
    }
    else
    {
        previousPostingParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting ;
        postingParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingPosting ;
        classificationParentView = $.viewAppComboBoxATC20ModeFormsDetailedPostingClassification ;
    }
    // Init app comboboxes
    var previousPostingValues =
    {
        0: { title: L( 'generic_previous_posting_none' ) } ,
        1: { title: L( 'generic_previous_posting_inspected' ) } ,
        2: { title: L( 'generic_previous_posting_restricted_use' ) } ,
        3: { title: L( 'generic_previous_posting_unsafe' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.init( L( 'generic_previous_posting_text_msg' ) , previousPostingValues , OnPreviousPosting_Change , null , previousPostingParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPreviousPosting.set_selected_index( Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING"] ) ;
    }

    var postingValues =
    {
        0: { title: L( 'generic_posting_inspected' ) } ,
        1: { title: L( 'generic_posting_restricted_use' ) } ,
        2: { title: L( 'generic_posting_unsafe' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.init( L( 'generic_posting_text_msg' ) , postingValues , OnPosting_Change , null , postingParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] )
    {
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingPosting.set_selected_index( Alloy.Globals.ATC20ModeDetailedPosting["POSTING"] ) ;
    }
    
    if( current_mode == "NEPAL" )
    {
        var classificationValues =
        {
            0: { title: L( 'generic_classification_g1' ) } ,
            1: { title: L( 'generic_classification_g2' ) } ,
            2: { title: L( 'generic_classification_y1' ) } ,
            3: { title: L( 'generic_classification_y2' ) } ,
            4: { title: L( 'generic_classification_r1' ) } ,
            5: { title: L( 'generic_classification_r2' ) } ,
            6: { title: L( 'generic_classification_r3' ) }
        } ;
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.init( L( 'generic_classification_text_msg' ) , classificationValues , OnClassification_Change , null , classificationParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.enabled( view_enabled ) ;

        if( Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] )
        {
            $.widgetAppComboBoxATC20ModeFormsDetailedPostingClassification.set_selected_index( Alloy.Globals.ATC20ModeDetailedPosting["CLASSIFICATION"] ) ;
        }
    }
    else
    {
        // Remove CLASSIFICATION field
        $.scrollViewDetailedPosting.remove( $.viewAppComboBoxATC20ModeFormsDetailedPostingClassification ) ;
        $.viewAppComboBoxATC20ModeFormsDetailedPostingClassification = null ;

        if( OS_IOS )
        {
            $.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.setTop( 430 ) ;
            $.viewAppButtonSave.setTop( 500 ) ;
        }
        else
        {
            $.viewAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.setTop( 330 ) ;
            $.viewAppButtonSave.setTop( 400 ) ;
        }
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.init( L( 'generic_previous_inspector_id_txt_hint' ) , OnPreviousInspectorID_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.set_text_value( Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_INSPECTOR_ID"] ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.enabled( view_enabled ) ;

    $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.init( L( 'generic_use_and_entry_restrictions_txt_hint' ) , OnUseAndEntryRestrictions_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.set_text_value( Alloy.Globals.ATC20ModeDetailedPosting["USE_AND_ENTRY_RESTRICTIONS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.enabled( view_enabled ) ;

    $.viewDisabler.setHeight( $.datePickerDate.getHeight() ) ;
    $.viewDisabler.visible = !view_enabled ;
    if( Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] )
    {
        var saved_date = new Date() ;
        saved_date.setTime( Alloy.Globals.ATC20ModeDetailedPosting["PREVIOUS_POSTING_DATE"] ) ;
        $.datePickerDate.setValue( saved_date ) ;
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.atc20ModeDetailedPostingWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingPreviousInspectorID.get_text_field() ,
        $.widgetAppTextFieldATC20ModeFormsDetailedPostingUseAndEntryRestrictions.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDetailedPosting.open() ;
    }
    else
    {
        $.atc20ModeDetailedPostingWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
