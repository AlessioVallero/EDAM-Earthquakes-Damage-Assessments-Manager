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
            $.navigationWindowRapidPosting.close() ;
        }
        else
        {
            $.atc20ModeRapidPostingWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Posting picker event handler
function OnPosting_Change( e )
{
    Alloy.Globals.ATC20ModeRapidPosting["POSTING"] = e.id ;
}

// Classification picker event handler
function OnClassification_Change( e )
{
    Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] = e.id ;
}

// UseAndEntryRestrictions textfield change event handler
function OnUseAndEntryRestrictions_Change( e , type )
{
    Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"] = $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.get_text_value() ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    var postingParentView = null ;
    var classificationParentView = null ;
    // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        postingParentView = thisView ;
        classificationParentView = thisView ;
    }
    else
    {
        postingParentView = $.viewAppComboBoxATC20ModeFormsRapidPostingPosting ;
        classificationParentView = $.viewAppComboBoxATC20ModeFormsRapidPostingClassification ;
    }
    // Init app comboboxes
    var postingValues =
    {
        0: { title: L( 'generic_posting_inspected' ) } ,
        1: { title: L( 'generic_posting_restricted_use' ) } ,
        2: { title: L( 'generic_posting_unsafe' ) }
    } ;
    $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.init( L( 'generic_posting_text_msg' ) , postingValues , OnPosting_Change , null , postingParentView ) ;
    $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.enabled( view_enabled ) ;

    if( Alloy.Globals.ATC20ModeRapidPosting["POSTING"] )
    {
        $.widgetAppComboBoxATC20ModeFormsRapidPostingPosting.set_selected_index( Alloy.Globals.ATC20ModeRapidPosting["POSTING"] ) ;
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
        $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.init( L( 'generic_classification_text_msg' ) , classificationValues , OnClassification_Change , null , classificationParentView ) ;
        $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.enabled( view_enabled ) ;

        if( Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] )
        {
            $.widgetAppComboBoxATC20ModeFormsRapidPostingClassification.set_selected_index( Alloy.Globals.ATC20ModeRapidPosting["CLASSIFICATION"] ) ;
        }
    }
    else
    {
        // Remove CLASSIFICATION field
        $.scrollViewRapidPosting.remove( $.viewAppComboBoxATC20ModeFormsRapidPostingClassification ) ;
        $.viewAppComboBoxATC20ModeFormsRapidPostingClassification = null ;

        $.viewAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.setTop( 70 ) ;
        $.viewAppButtonSave.setTop( 140 ) ;
    }

    // Init app textfields
    $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.init( L( 'generic_use_and_entry_restrictions_txt_hint' ) , OnUseAndEntryRestrictions_Change ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.set_text_value( Alloy.Globals.ATC20ModeRapidPosting["USE_AND_ENTRY_RESTRICTIONS"] ) ;
    $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.enabled( view_enabled ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.atc20ModeRapidPostingWindow ,
    [
        $.widgetAppTextFieldATC20ModeFormsRapidPostingUseAndEntryRestrictions.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowRapidPosting.open() ;
    }
    else
    {
        $.atc20ModeRapidPostingWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
