var args = arguments[0] || {};
var current_type = args.type ;
var current_media_details = args.media_details ;
var current_heading_enabled = args.heading_enabled ;
var heading_button_enabled = true ;
if( typeof current_heading_enabled != "undefined" )
{
    heading_button_enabled = current_heading_enabled ;
}

var current_heading_selected_value = "" ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Back function
function Back()
{
    try
    {
        // Remove the da:done event listener, if necessary
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "da:done" ) ;

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowMediaDamagesDetails.close() ;
        }
        else
        {
            $.mediaDamagesDetailsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Heading picker event handler
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
            current_heading_selected_value = "S" ;
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
}

// Done button click event handler
function OnBtnDone_Click( e )
{
    try
    {
        current_media_details["heading"] = current_heading_selected_value ;
        current_media_details["damages_level"] = $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.get_text_value() ;
        current_media_details["damages_area"] = $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.get_text_value() ;
        current_media_details["comment"] = $.widgetAppTextAreaMediaDamagesDetailsComment.get_text_value() ;

        switch( current_type )
        {
            case "FormPic":
            {
                // Inserting the image on the array of pictures
                Alloy.Globals.CurrentPicsPath.push( current_media_details ) ;

                // We must close this Window too
                Back() ;
            }
            break;

            case "FormVideo":
            {
                // Inserting the video on the array of videos
                Alloy.Globals.CurrentVideosPath.push( current_media_details ) ;

                // We must close this Window too
                Back() ;
            }
            break;

            case "DA":
            {
                var da_elem = current_media_details.da_value ;
                // AlertDialog to ask user about a da_elem that is completed
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_da_element_done_title' ) ,
                    message: L( 'da_element_done_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Creating the image for this da_elem from the container View
                        if( !Alloy.Globals.DamageAssessmentsMakerPics )
                        {
                            Alloy.Globals.DamageAssessmentsMakerPics = new Array() ;
                        }

                        Alloy.Globals.DamageAssessmentsMakerPics[da_elem] = current_media_details ;

                        // Fire the event da:done to close the DamageAssessmentsView and the TableGalleryView
                        Ti.App.fireEvent( "da:done" , { done_propagation_event_enabled: true } ) ;

                        // We must close this Window too
                        Back() ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            break;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
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
        headingParentView = $.viewAppComboBoxMediaDamagesDetailsHeading ;
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
    $.widgetAppComboBoxMediaDamagesDetailsHeading.init( L( 'generic_heading_text_msg' ) , headingValues , OnHeading_Change , null , headingParentView ) ;
    $.widgetAppComboBoxMediaDamagesDetailsHeading.enabled( heading_button_enabled ) ;

    switch( current_media_details["heading"] )
    {
        case "N":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "1" ) ;
            current_heading_selected_value = "N" ;
        }
        break ;

        case "S":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "2" ) ;
            current_heading_selected_value = "S" ;
        }
        break ;

        case "W":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "3" ) ;
            current_heading_selected_value = "W" ;
        }
        break ;

        case "E":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "4" ) ;
            current_heading_selected_value = "E" ;
        }
        break ;

        case "R":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "5" ) ;
            current_heading_selected_value = "R" ;
        }
        break ;

        case "I":
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "6" ) ;
            current_heading_selected_value = "I" ;
        }
        break ;

        default:
        {
            $.widgetAppComboBoxMediaDamagesDetailsHeading.set_selected_index( "0" ) ;
            current_heading_selected_value = "" ;
        }
        break ;
    }
    // Init app buttons
    $.widgetAppButtonDone.init( '/images/done_normal.png' , '/images/done_pressed.png' , '/images/done_disabled.png' , L( 'generic_done_btn_title' ) , OnBtnDone_Click ) ;
    // Init app textfields
    $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.init( L( 'generic_damages_level_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD , 2 , false , "5" ) ;
    $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.set_text_value( "0" ) ;
    $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.init( L( 'generic_damages_area_txt_hint' ) , null , Titanium.UI.KEYBOARD_NUMBER_PAD , 3 ) ;
    $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.set_text_value( "0" ) ;
    // Init app textareas
    $.widgetAppTextAreaMediaDamagesDetailsComment.init( L( 'generic_comment_txt_hint' ) ) ;

    RegisterHideKeyboard( $.mediaDamagesDetailsWindow ,
    [
        $.widgetAppTextFieldMediaDamagesDetailsDamagesLevel.get_text_field() ,
        $.widgetAppTextFieldMediaDamagesDetailsDamagesArea.get_text_field() ,
        $.widgetAppTextAreaMediaDamagesDetailsComment.get_text_area()
    ] ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowMediaDamagesDetails.open() ;
    }
    else
    {
        $.mediaDamagesDetailsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
