var args = arguments[0] || {};
var current_selected_pics = args.selected_pics ;
var current_da_msg = args.da_msg ;
var current_da_value = args.da_value ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back( { done_propagation_event_enabled: false } ) ;
}

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    Back( { done_propagation_event_enabled: false } ) ;
}

// Back function
function Back( data )
{
    try
    {
        // Remove the da:done event listener, if necessary
        Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "da:done" ) ;

        if( data.done_propagation_event_enabled )
        {
            // Fire the event da:done_propagation to close the TableGalleryView
            Ti.App.fireEvent( "da:done_propagation" ) ;
        }
        else
        {
            // Remove the da:done_propagation event listener, if necessary
            Alloy.Globals.ProtectedCleanUpEventListener( Ti.App , "da:done_propagation" ) ;
        }

        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDamageAssessmentsElem.close() ;
        }
        else
        {
            $.damageAssessmentsElemWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Next button click event handler
function OnBtnNext_Click( e )
{
    try
    {
        var picture = $.viewMainContainer.toImage() ;

        // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
        // The files in the temporary folder may not persist when the application is shut down and restarted.
        var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
        if( newFile.exists )
        {
            // A previous image will be dropped
            newFile.deleteFile() ;
        }
        newFile.write( picture ) ;

        var first_selected_pics_elem = current_selected_pics[0] ;
        var media_details =
        {
            da_value: current_da_value ,
            picture: newFile.getNativePath() ,
            // Latitude - Longitude - Address - Heading from the first picture (the address must be the same in all the pictures, since the building it's the same)
            latitude: first_selected_pics_elem.latitude ,
            longitude: first_selected_pics_elem.longitude ,
            address: first_selected_pics_elem.address ,
            heading: current_da_value
        } ;

        Alloy.Globals.ProtectedAddEventListener( Ti.App , "da:done" , Back ) ;

        // Controller creation for the Next View
        Alloy.Globals.createAndOpenControllerExt( 'MediaDamagesDetailsView' , { type: "DA" , media_details: media_details , heading_enabled: false } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var current_mode = "MovePics" ;
// CurrentMode button click event handler
function OnBtnCurrentMode_Click( e )
{
    switch( current_mode )
    {
        case "MovePics":
        {
            current_mode = "Draw" ;
            $.paint_view.eraseMode = false ;
            $.paint_view.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex + 1 ;
            $.btnCurrentMode.setTitle( L( 'damage_assessments_elem_draw_msg' ) ) ;
        }
        break ;

        case "Draw":
        {
            current_mode = "EraseDrawing" ;
            $.paint_view.eraseMode = true ;
            $.btnCurrentMode.setTitle( L( 'damage_assessments_elem_erase_drawing_msg' ) ) ;
        }
        break ;

        case "EraseDrawing":
        {
            current_mode = "MovePics" ;
            $.paint_view.zIndex = 1 ;
            $.btnCurrentMode.setTitle( L( 'damage_assessments_elem_move_pics_msg' ) ) ;
        }
        break ;
    }
}

try
{
    if( Alloy.Globals.DamageAssessmentsMakerPics )
    {
        Alloy.Globals.DamageAssessmentsMakerPics[current_da_value] = null ;
    }

    // Init app buttons
    $.widgetAppButtonNext.init( '/images/next_normal.png' , '/images/next_pressed.png' , '/images/next_disabled.png' , L( 'generic_next_btn_title' ) , OnBtnNext_Click ) ;

    // Set the title of the window
    $.damageAssessmentsElemWindow.setTitle( current_da_msg ) ;

    var PinchableAndDraggableImageView = require( 'PinchableAndDraggableImageView' ) ;
    for( var i = 0 ; i < current_selected_pics.length ; i++ )
    {
        var pinchableAndDraggableImageView = new PinchableAndDraggableImageView( current_selected_pics[i].image ) ;
        $.viewMainContainer.add( pinchableAndDraggableImageView ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamageAssessmentsElem.open() ;
    }
    else
    {
        $.damageAssessmentsElemWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
