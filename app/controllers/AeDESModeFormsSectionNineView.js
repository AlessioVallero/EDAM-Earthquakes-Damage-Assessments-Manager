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
            $.navigationWindowSectionNine.close() ;
        }
        else
        {
            $.aedesModeSectionNineWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Topic textfield change event handler
function OnTopic_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionNine["TOPIC"] = $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.get_text_value() ;
}

// OtherComments textfield change event handler
function OnOtherComments_Change( e , type )
{
    Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"] = $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.get_text_value() ;
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
    $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.init( L( 'generic_topic_txt_hint' ) , OnTopic_Change ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.set_text_value( Alloy.Globals.AeDESModeSectionNine["TOPIC"] ) ;
    $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.enabled( view_enabled ) ;
    // Init app textareas
    $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.init( L( 'generic_other_comments_txt_hint' ) , OnOtherComments_Change ) ;
    $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.set_text_value( Alloy.Globals.AeDESModeSectionNine["OTHER_COMMENTS"] ) ;
    $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.enabled( view_enabled ) ;
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    RegisterHideKeyboard( $.aedesModeFormsSectionNineWindow ,
    [
        $.widgetAppTextFieldAeDESModeFormsSectionNineTopic.get_text_field() ,
        $.widgetAppTextAreaAeDESModeFormsSectionNineOtherComments.get_text_area()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionNine.open() ;
    }
    else
    {
        $.aedesModeFormsSectionNineWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}