var args = arguments[0] || {};
var current_mode = args.mode ;
var current_is_synchronized = args.is_synchronized ;
var current_atc20_type = args.atc20_type ;
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
            $.navigationWindowFormsInspection.close() ;
        }
        else
        {
            $.atc20ModeFormsInspectionWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// DateTime picker change event handler
function OnDateTime_Change( e , type )
{
    Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse( $.datePickerDate.getValue() ) ;
}

// Date picker change event handler
function OnDate_Change( e , type )
{
    var current_date = $.datePickerDate.getValue() ;
    var current_time = $.timePickerTime.getValue() ;
    Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse( new Date( current_date.getFullYear() , current_date.getMonth() , current_date.getDate() , current_time.getHours() , current_time.getMinutes() , current_time.getSeconds() ) ) ;
}

// Time picker change event handler
function OnTime_Change( e , type )
{
    var current_date = $.datePickerDate.getValue() ;
    var current_time = $.timePickerTime.getValue() ;
    Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse( new Date( current_date.getFullYear() , current_date.getMonth() , current_date.getDate() , current_time.getHours() , current_time.getMinutes() , current_time.getSeconds() ) ) ;
}

// AreasInspected picker event handler
function OnAreasInspected_Change( e )
{
    Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] = e.id ;
}

// Save button click event handler
function OnBtnSave_Click( e )
{
    Ti.App.fireEvent( "form:save_from_section" ) ;
}

try
{
    // Init controls
    if( current_atc20_type == "0" && current_mode != "NEPAL" )
    {
        // The detailed version of the ATC-20 forms doesn't have the "Areas inspected" field
        $.viewAreasInspectedWrapper.remove( $.viewAreasInspected ) ;
        $.viewAreasInspected = null ;

        $.viewAppButtonSave.setTop( 230 ) ;
    }
    else
    {
        var areasInspectedParentView = null ;
        // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
        // so if we use the container of the Widget, the new Window will appear compressed inside the container
        if( OS_IOS )
        {
            var thisView = $.getView() ;
            areasInspectedParentView = thisView ;
        }
        else
        {
            areasInspectedParentView = $.viewAreasInspected ;
        }

        // Init app comboboxes
        var areasInspectedValues =
        {
            0: { title: L( 'generic_exterior_only_text_msg' ) } ,
            1: { title: L( 'generic_exterior_and_interior_text_msg' ) }
        } ;
        $.widgetAppComboBoxATC20ModeInspectionAreasInspected.init( L( 'generic_areas_inspected_text_msg' ) , areasInspectedValues , OnAreasInspected_Change , null , areasInspectedParentView ) ;
        $.widgetAppComboBoxATC20ModeInspectionAreasInspected.enabled( view_enabled ) ;

        if( Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] )
        {
            $.widgetAppComboBoxATC20ModeInspectionAreasInspected.set_selected_index( Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] ) ;
        }
    }
    // Init app buttons
    $.widgetAppButtonSave.init( '/images/save_normal.png' , '/images/save_pressed.png' , '/images/save_disabled.png' , L( 'generic_save_btn_title' ) , OnBtnSave_Click ) ;
    $.viewAppButtonSave.visible = view_enabled ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
		$.viewDisablerDateTime.setHeight( $.datePickerDate.getHeight() ) ;
		$.viewDisablerDateTime.visible = !view_enabled ;
		if( Alloy.Globals.ATC20ModeInspection["DATE"] )
		{
			var saved_date = new Date() ;
			saved_date.setTime( Alloy.Globals.ATC20ModeInspection["DATE"] ) ;
            $.datePickerDate.setValue( saved_date ) ;
		}

        $.navigationWindowFormsInspection.open() ;
    }
    else
    {
		$.viewDisablerDate.setHeight( $.datePickerDate.getHeight() ) ;
		$.viewDisablerDate.visible = !view_enabled ;
		$.viewDisablerTime.setHeight( $.timePickerTime.getHeight() ) ;
		$.viewDisablerTime.visible = !view_enabled ;
		if( Alloy.Globals.ATC20ModeInspection["DATE"] )
		{
			var saved_date = new Date() ;
			saved_date.setTime( Alloy.Globals.ATC20ModeInspection["DATE"] ) ;
            $.datePickerDate.setValue( saved_date ) ;
            $.timePickerTime.setValue( saved_date ) ;
		}

        $.atc20ModeFormsInspectionWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}