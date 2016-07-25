var args = arguments[0] || {};
var current_id = null ;
if( args.id )
{
    current_id = args.id ;
}
var current_image_path = args.image_path ;
var current_latitude = args.latitude ;
var current_longitude = args.longitude ;
var current_address = args.address ;
var current_heading = args.heading ;
var current_damages_level = args.damages_level ;
var current_damages_area = args.damages_area ;
var current_comment = args.comment ;
var current_index = args.index ;
var current_is_synchronized = args.is_synchronized ;
var current_is_enabled = args.is_enabled ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}
// If the "current_is_enabled" is set, this will win against the "current_is_synchronized"
if( typeof current_is_enabled != "undefined" )
{
    view_enabled = current_is_enabled ;
}

var current_heading_selected_value = "" ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowSinglePictureView.close() ;
        }
        else
        {
            $.singlePictureViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Window open event handler
function OnSinglePictureWindow_Open( e )
{
    // For some reasons the selected index of the heading combobox is not refreshed on reopening, so we must force a refresh
    RefreshHeadingSelectedIndex( current_heading_selected_value ) ;
}

// Latitude textfield change event handler
function OnLatitude_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.latitude = $.widgetAppTextFieldLatitude.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].latitude = $.widgetAppTextFieldLatitude.get_text_value() ;
    }
}

// Longitude textfield change event handler
function OnLongitude_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.longitude = $.widgetAppTextFieldLongitude.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].longitude = $.widgetAppTextFieldLongitude.get_text_value() ;
    }
}

// Address
function OnAddress_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.address = $.widgetAppTextFieldAddress.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].address = $.widgetAppTextFieldAddress.get_text_value() ;
    }
}

// Heading
function OnHeading_Change( e )
{
    current_heading_selected_value = "" ;
    switch( e.id )
    {
        case "1":
        {
            current_heading_selected_value = "N" ;
        }
        break ;

        case "2":
        {
            current_heading_selected_value = "S" ;
        }
        break ;

        case "3":
        {
            current_heading_selected_value = "W" ;
        }
        break ;

        case "4":
        {
            current_heading_selected_value = "E" ;
        }
        break ;

        case "5":
        {
            current_heading_selected_value = "R" ;
        }
        break ;

        case "6":
        {
            current_heading_selected_value = "I" ;
        }
        break ;
    }

    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.heading = current_heading_selected_value ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].heading = current_heading_selected_value ;
    }
}

// DamagesLevel
function OnDamagesLevel_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.damages_level = $.widgetAppTextFieldDamagesLevel.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].damages_level = $.widgetAppTextFieldDamagesLevel.get_text_value() ;
    }
}

// DamagesArea
function OnDamagesArea_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.damages_area = $.widgetAppTextFieldDamagesArea.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].damages_area = $.widgetAppTextFieldDamagesArea.get_text_value() ;
    }
}

// Comment
function OnComment_Change( e , type )
{
    if( current_id && current_index == -1 )
    {
        var existingPicture = ManagePictureExistingOnTheDB() ;
        if( existingPicture )
        {
            existingPicture.comment = $.widgetAppTextFieldComment.get_text_value() ;
        }
    }
    else
    {
        Alloy.Globals.CurrentPicsPath[current_index].comment = $.widgetAppTextFieldComment.get_text_value() ;
    }
}

// Export to gallery button click event handler
function OnBtnExportToGallery_Click( e )
{
    try
    {
        var file = Ti.Filesystem.getFile( current_image_path ) ;
        if( file.exists() )
        {
            Ti.Media.saveToPhotoGallery( file ,
            {
                success: function( e )
                {
                    alert( L( 'generic_content_exported_msg' ) ) ;
                } ,
                error: function( e )
                {
                    alert( L( 'generic_error_while_exporting_content_msg' ) ) ;
                }
            } ) ;
        }
        else
        {
            alert( L( 'generic_no_content_to_export_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Function to manage the situation where a picture is already in the DB and we are modifying the data
function ManagePictureExistingOnTheDB()
{
    var ret = null ;

    // Init of the array (if it's necessary)
    if( !Alloy.Globals.CurrentPicsPath )
    {
        Alloy.Globals.CurrentPicsPath = new Array() ;
    }

    // We will search if the item is already in the array
    for( var i = 0 ; i < Alloy.Globals.CurrentPicsPath.length ; i++ )
    {
        var currentPictureElem = Alloy.Globals.CurrentPicsPath[i] ;
        if( currentPictureElem.id && currentPictureElem.id == current_id )
        {
            ret = currentPictureElem ;
            current_index = i ;
            break ;
        }
    }

    if( ret )
    {
        // Nothing to do
    }
    else
    {
        // Inserting the image on the array of pictures
        current_index = Alloy.Globals.CurrentPicsPath.length ;
        Alloy.Globals.CurrentPicsPath.push( { id: current_id , latitude: $.widgetAppTextFieldLatitude.get_text_value() , longitude: $.widgetAppTextFieldLongitude.get_text_value() , address: $.widgetAppTextFieldAddress.get_text_value() , heading: current_heading_selected_value , damages_level: $.widgetAppTextFieldDamagesLevel.get_text_value() , damages_area: $.widgetAppTextFieldDamagesArea.get_text_value() , comment: $.widgetAppTextFieldComment.get_text_value() } ) ;
    }

    return ret ;
}

// Function to set the current heading selected index
function RefreshHeadingSelectedIndex( current_heading )
{
    switch( current_heading )
    {
        case "N":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "1" ) ;
            current_heading_selected_value = "N" ;
        }
        break ;

        case "S":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "2" ) ;
            current_heading_selected_value = "S" ;
        }
        break ;

        case "W":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "3" ) ;
            current_heading_selected_value = "W" ;
        }
        break ;

        case "E":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "4" ) ;
            current_heading_selected_value = "E" ;
        }
        break ;

        case "R":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "5" ) ;
            current_heading_selected_value = "R" ;
        }
        break ;

        case "I":
        {
            $.widgetAppComboBoxHeading.set_selected_index( "6" ) ;
            current_heading_selected_value = "I" ;
        }
        break ;

        default:
        {
            $.widgetAppComboBoxHeading.set_selected_index( "0" ) ;
            current_heading_selected_value = "" ;
        }
        break ;
    }
}

try
{
    if( current_id )
    {
        current_index = -1 ;
    }

    // Setting the image on the ImageView
    if( current_image_path )
    {
        // Set the image on the ImageView
        $.single_picture_view.setImage( current_image_path ) ;
    }

    // Init controls
    var headingParentView = null ;
    // On iOS devices the parentView must be thisView because is used a new Window to show the picker.
    // so if we use the container of the Widget, the new Window will appear compressed inside the container
    if( OS_IOS )
    {
        var thisView = $.getView() ;
        headingParentView = thisView ;
    }
    else
    {
        headingParentView = $.viewAppComboBoxHeading ;
    }
    // Init app comboboxes
    var headingValues =
    {
        0: { title: L( 'generic_heading_not_detected' ) } ,
        1: { title: L( 'generic_heading_north' ) } ,
        2: { title: L( 'generic_heading_south' ) } ,
        3: { title: L( 'generic_heading_west' ) } ,
        4: { title: L( 'generic_heading_east' ) } ,
        5: { title: L( 'generic_heading_roof' ) } ,
        6: { title: L( 'generic_heading_indoor' ) }
    } ;
    $.widgetAppComboBoxHeading.init( L( 'generic_heading_text_msg' ) , headingValues , OnHeading_Change , null , headingParentView ) ;
    $.widgetAppComboBoxHeading.enabled( view_enabled ) ;

    RefreshHeadingSelectedIndex( current_heading ) ;
    // Init app textfields
    $.widgetAppTextFieldLatitude.set_text_value( current_latitude ) ;
    $.widgetAppTextFieldLatitude.init( L( 'generic_latitude_txt_hint' ) , OnLatitude_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldLatitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldLongitude.set_text_value( current_longitude ) ;
    $.widgetAppTextFieldLongitude.init( L( 'generic_longitude_txt_hint' ) , OnLongitude_Change , Titanium.UI.KEYBOARD_NUMBERS_PUNCTUATION ) ;
    $.widgetAppTextFieldLongitude.enabled( view_enabled ) ;

    $.widgetAppTextFieldAddress.set_text_value( current_address ) ;
    $.widgetAppTextFieldAddress.init( L( 'generic_address_txt_hint' ) , OnAddress_Change ) ;
    $.widgetAppTextFieldAddress.enabled( view_enabled ) ;

    $.widgetAppTextFieldDamagesLevel.set_text_value( current_damages_level ) ;
    $.widgetAppTextFieldDamagesLevel.init( L( 'generic_damages_level_txt_hint' ) , OnDamagesLevel_Change , Titanium.UI.KEYBOARD_NUMBER_PAD , 2 , false , "5" ) ;
    $.widgetAppTextFieldDamagesLevel.enabled( view_enabled ) ;

    $.widgetAppTextFieldDamagesArea.set_text_value( current_damages_area ) ;
    $.widgetAppTextFieldDamagesArea.init( L( 'generic_damages_area_txt_hint' ) , OnDamagesArea_Change , Titanium.UI.KEYBOARD_NUMBER_PAD , 3 ) ;
    $.widgetAppTextFieldDamagesArea.enabled( view_enabled ) ;

    $.widgetAppTextFieldComment.set_text_value( current_comment ) ;
    $.widgetAppTextFieldComment.init( L( 'generic_comment_txt_hint' ) , OnComment_Change ) ;
    $.widgetAppTextFieldComment.enabled( view_enabled ) ;

    RegisterHideKeyboard( $.singlePictureViewWindow ,
    [
        $.widgetAppTextFieldLatitude.get_text_field() ,
        $.widgetAppTextFieldLongitude.get_text_field() ,
        $.widgetAppTextFieldAddress.get_text_field() ,
        $.widgetAppTextFieldDamagesLevel.get_text_field() ,
        $.widgetAppTextFieldDamagesArea.get_text_field() ,
        $.widgetAppTextFieldComment.get_text_field()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    if( OS_IOS )
    {
        $.navigationWindowSinglePictureView.open() ;
    }
    else
    {
        $.singlePictureViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
