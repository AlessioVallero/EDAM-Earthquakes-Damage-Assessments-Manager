var args = arguments[0] || {};
var current_masonry_structure = args.masonry_structure_id ;
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
            $.navigationWindowSectionThreeMasonryStructures.close() ;
        }
        else
        {
            $.aedesModeSectionThreeMasonryStructuresWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// NotIdentified checkbox event handler
function OnNotIdentified_Change( e )
{
    try
    {
        var newMasonryStructureValue = Alloy.Globals.replaceCharAt( current_masonry_structure * 5 , Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] , $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.get_value() ) ;
        Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TypeOneWithoutChains checkbox event handler
function OnTypeOneWithoutChains_Change( e )
{
    try
    {
        var newMasonryStructureValue = Alloy.Globals.replaceCharAt( current_masonry_structure * 5 + 1 , Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] , $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.get_value() ) ;
        Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TypeOneWithChains checkbox event handler
function OnTypeOneWithChains_Change( e )
{
    try
    {
        var newMasonryStructureValue = Alloy.Globals.replaceCharAt( current_masonry_structure * 5 + 2 , Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] , $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.get_value() ) ;
        Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TypeTwoWithoutChains checkbox event handler
function OnTypeTwoWithoutChains_Change( e )
{
    try
    {
        var newMasonryStructureValue = Alloy.Globals.replaceCharAt( current_masonry_structure * 5 + 3 , Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] , $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.get_value() ) ;
        Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// TypeTwoWithChains checkbox event handler
function OnTypeTwoWithChains_Change( e )
{
    try
    {
        var newMasonryStructureValue = Alloy.Globals.replaceCharAt( current_masonry_structure * 5 + 4 , Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] , $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.get_value() ) ;
        Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] = newMasonryStructureValue ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Set label text with the father title
    $.lblAeDESModeFormsSectionThreeHorizontalMasonryStructuresFatherTitle.setText( current_father_title ) ;

    var masonryStructureValue = Alloy.Globals.AeDESModeSectionThree["MASONRY_STRUCTURES"] ;
    // Init controls
    // Init app checkboxex
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.init( L( 'generic_not_identified_text_msg' ) , masonryStructureValue.charAt( current_masonry_structure * 5 ) , OnNotIdentified_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresNotIdentified.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.init( L( 'generic_type_one_without_chains_text_msg' ) , masonryStructureValue.charAt( current_masonry_structure * 5 + 1 ) , OnTypeOneWithoutChains_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithoutChains.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.init( L( 'generic_type_one_with_chains_text_msg' ) , masonryStructureValue.charAt( current_masonry_structure * 5 + 2 ) , OnTypeOneWithChains_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeOneWithChains.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.init( L( 'generic_type_two_without_chains_text_msg' ) , masonryStructureValue.charAt( current_masonry_structure * 5 + 3 ) , OnTypeTwoWithoutChains_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithoutChains.enabled( view_enabled ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.init( L( 'generic_type_two_with_chains_text_msg' ) , masonryStructureValue.charAt( current_masonry_structure * 5 + 4 ) , OnTypeTwoWithChains_Change ) ;
    $.widgetAppCheckBoxAeDESModeFormsSectionThreeMasonryStructuresTypeTwoWithChains.enabled( view_enabled ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowSectionThreeMasonryStructures.open() ;
    }
    else
    {
        $.aedesModeSectionThreeMasonryStructuresWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
