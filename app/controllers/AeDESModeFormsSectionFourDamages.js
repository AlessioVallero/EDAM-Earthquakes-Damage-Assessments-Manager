var args = arguments[0] || {};
var current_type_id = args.type_id ;
var current_father_title = args.father_title ;
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
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSectionFourDamages.close() ;
        }
        else
        {
            $.aedesModeSectionFourDamagesWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// D4D5 picker event handler
function OnD4D5_Change( e )
{
    try
    {
        var newDamageValue = Alloy.Globals.replaceCharAt( current_type_id * 3 , Alloy.Globals.AeDESModeSectionFour["DAMAGES"] , e.id ) ;
        Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// D2D3 picker event handler
function OnD2D3_Change( e )
{
    try
    {
        var newDamageValue = Alloy.Globals.replaceCharAt( current_type_id * 3 + 1 , Alloy.Globals.AeDESModeSectionFour["DAMAGES"] , e.id ) ;
        Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// D0D1 picker event handler
function OnD0D1_Change( e )
{
    try
    {
        var newDamageValue = Alloy.Globals.replaceCharAt( current_type_id * 3 + 2 , Alloy.Globals.AeDESModeSectionFour["DAMAGES"] , e.id ) ;
        Alloy.Globals.AeDESModeSectionFour["DAMAGES"] = newDamageValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionFourDamageFatherTitle.setText( current_father_title ) ;

    var damagesValue = Alloy.Globals.AeDESModeSectionFour["DAMAGES"] ;
    // Init controls
    var d4d5ParentView = null ;
    var d2d3ParentView = null ;
    var d0d1ParentView = null ;
    // On iOS devices the parentView must be the mainView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var mainView = $.getView() ;
        d4d5ParentView = mainView ;
        d2d3ParentView = mainView ;
        d0d1ParentView = mainView ;
    }
    else
    {
        d4d5ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD4D5 ;
        d2d3ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD2D3 ;
        d0d1ParentView = $.viewAppComboBoxAeDESModeFormsSectionFourDamagesD0D1 ;
    }
    // Init app comboboxes
    var d4d5Values =
    {
        0: { title: L( 'generic_null_text_msg' ) } ,
        1: { title: '>2/3' } ,
        2: { title: '1/3-2/3' } ,
        3: { title: '<1/3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.init( L( 'generic_d4_d5_text_msg' ) , d4d5Values , OnD4D5_Change , null , d4d5ParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.enabled( view_enabled ) ;

    var d2d3Values =
    {
        0: { title: L( 'generic_null_text_msg' ) } ,
        1: { title: '>2/3' } ,
        2: { title: '1/3-2/3' } ,
        3: { title: '<1/3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.init( L( 'generic_d2_d3_text_msg' ) , d2d3Values , OnD2D3_Change , null , d2d3ParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.enabled( view_enabled ) ;

    var d0d1Values =
    {
        0: { title: L( 'generic_null_text_msg' ) } ,
        1: { title: '>2/3' } ,
        2: { title: '1/3-2/3' } ,
        3: { title: '<1/3' }
    } ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.init( L( 'generic_d0_d1_text_msg' ) , d0d1Values , OnD0D1_Change , null , d0d1ParentView ) ;
    $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.enabled( view_enabled ) ;

    if( damagesValue )
    {
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD4D5.set_selected_index( damagesValue.charAt( current_type_id * 3 ) ) ;
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD2D3.set_selected_index( damagesValue.charAt( current_type_id * 3 + 1 ) ) ;
        $.widgetAppComboBoxAeDESModeFormsSectionFourDamagesD0D1.set_selected_index( damagesValue.charAt( current_type_id * 3 + 2 ) ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionFourDamages.open() ;
    }
    else
    {
        $.aedesModeSectionFourDamagesWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
