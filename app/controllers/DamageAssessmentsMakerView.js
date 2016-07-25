var args = arguments[0] || {};
var current_type = args.type ;
var current_media_contents = args.media_contents ;

var north_side_array = new Array() ;
var south_side_array = new Array() ;
var west_side_array = new Array() ;
var east_side_array = new Array() ;
var roof_array = new Array() ;
var indoor_array = new Array() ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

controls.push( $.btn_north_side ) ;
controls.push( $.btn_east_side ) ;
controls.push( $.btn_south_side ) ;
controls.push( $.btn_west_side ) ;
controls.push( $.btn_roof ) ;
controls.push( $.btn_indoor ) ;
controls.push( $.widgetAppButtonDone.get_button() ) ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    Back() ;
}

// Back function
function Back()
{
    try
    {
        controls = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDamageAssessmentsMaker.close() ;
        }
        else
        {
            $.damageAssessmentsMakerWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// North side button click event handler
function OnBtnNorthSide_Click( e )
{
    try
    {
        if( north_side_array && north_side_array.length > 0 )
        {
            var sideValue = "N" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_side_already_completed_title' ) ,
                    message: L( 'side_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: north_side_array , type: current_type , da_msg: L( 'btn_north_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: north_side_array , type: current_type , da_msg: L( 'btn_north_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_side_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// East side button click event handler
function OnBtnEastSide_Click( e )
{
    try
    {
        if( east_side_array && east_side_array.length > 0 )
        {
            var sideValue = "E" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_side_already_completed_title' ) ,
                    message: L( 'side_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: east_side_array , type: current_type , da_msg: L( 'btn_east_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: east_side_array , type: current_type , da_msg: L( 'btn_east_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_side_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// South side button click event handler
function OnBtnSouthSide_Click( e )
{
    try
    {
        if( south_side_array && south_side_array.length > 0 )
        {
            var sideValue = "S" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_side_already_completed_title' ) ,
                    message: L( 'side_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: south_side_array , type: current_type , da_msg: L( 'btn_south_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: south_side_array , type: current_type , da_msg: L( 'btn_south_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_side_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// West side button click event handler
function OnBtnWestSide_Click( e )
{
    try
    {
        if( west_side_array && west_side_array.length > 0 )
        {
            var sideValue = "W" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[sideValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_side_already_completed_title' ) ,
                    message: L( 'side_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: west_side_array , type: current_type , da_msg: L( 'btn_west_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: west_side_array , type: current_type , da_msg: L( 'btn_west_side_text' ) , da_value: sideValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_side_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Roof button click event handler
function OnBtnRoof_Click( e )
{
    try
    {
        if( roof_array && roof_array.length > 0 )
        {
            var roofValue = "R" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[roofValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_roof_already_completed_title' ) ,
                    message: L( 'roof_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: roof_array , type: current_type , da_msg: L( 'btn_roof_text' ) , da_value: roofValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: roof_array , type: current_type , da_msg: L( 'btn_roof_text' ) , da_value: roofValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_roof_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Indoor button click event handler
function OnBtnIndoor_Click( e )
{
    try
    {
        if( indoor_array && indoor_array.length > 0 )
        {
            var indoorValue = "I" ;
            if( Alloy.Globals.DamageAssessmentsMakerPics && Alloy.Globals.DamageAssessmentsMakerPics[indoorValue] )
            {
                // AlertDialog to ask user about a previously completed side
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_indoor_already_completed_title' ) ,
                    message: L( 'indoor_already_completed_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        // Controller creation for the Next View
                        Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: indoor_array , type: current_type , da_msg: L( 'btn_indoor_text' ) , da_value: indoorValue , is_damage_assessments_maker_view: true } ) ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
            else
            {
                // Controller creation for the Next View
                Alloy.Globals.createAndOpenControllerExt( 'TableGalleryView' , { media_contents: indoor_array , type: current_type , da_msg: L( 'btn_indoor_text' ) , da_value: indoorValue , is_damage_assessments_maker_view: true } ) ;
            }
        }
        else
        {
            alert( L( 'no_indoor_media_for_the_gallery_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Function to insert the sides, the roof and the indoor on the pictures array
function InsertDAElements()
{
    // Init of the array (if it's necessary)
    if( !Alloy.Globals.CurrentPicsPath )
    {
        Alloy.Globals.CurrentPicsPath = new Array() ;
    }

    var current_time = new Date().toISOString().replace( /(-)|(\.)|(:)/g , "" ) ;
    if( Alloy.Globals.DamageAssessmentsMakerPics["N"] )
    {
        var north_side = Alloy.Globals.DamageAssessmentsMakerPics["N"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: north_side.picture , latitude: north_side.latitude , longitude: north_side.longitude , address: north_side.address , heading: north_side.heading , damages_level: north_side.damages_level , damages_area: north_side.damages_area , comment: north_side.comment , path: ( "NorthSide_" + current_time ) } ) ;
    }

    if( Alloy.Globals.DamageAssessmentsMakerPics["E"] )
    {
        var east_side = Alloy.Globals.DamageAssessmentsMakerPics["E"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: east_side.picture , latitude: east_side.latitude , longitude: east_side.longitude , address: east_side.address , heading: east_side.heading , damages_level: east_side.damages_level , damages_area: east_side.damages_area , comment: east_side.comment , path: ( "EastSide_" + current_time ) } ) ;
    }

    if( Alloy.Globals.DamageAssessmentsMakerPics["S"] )
    {
        var south_side = Alloy.Globals.DamageAssessmentsMakerPics["S"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: south_side.picture , latitude: south_side.latitude , longitude: south_side.longitude , address: south_side.address , heading: south_side.heading , damages_level: south_side.damages_level , damages_area: south_side.damages_area , comment: south_side.comment , path: ( "SouthSide_" + current_time ) } ) ;
    }

    if( Alloy.Globals.DamageAssessmentsMakerPics["W"] )
    {
        var west_side = Alloy.Globals.DamageAssessmentsMakerPics["W"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: west_side.picture , latitude: west_side.latitude , longitude: west_side.longitude , address: west_side.address , heading: west_side.heading , damages_level: west_side.damages_level , damages_area: west_side.damages_area , comment: west_side.comment , path: ( "WestSide_" + current_time ) } ) ;
    }

    if( Alloy.Globals.DamageAssessmentsMakerPics["R"] )
    {
        var roof = Alloy.Globals.DamageAssessmentsMakerPics["R"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: roof.picture , latitude: roof.latitude , longitude: roof.longitude , address: roof.address , heading: roof.heading , damages_level: roof.damages_level , damages_area: roof.damages_area , comment: roof.comment , path: ( "Roof_" + current_time ) } ) ;
    }

    if( Alloy.Globals.DamageAssessmentsMakerPics["I"] )
    {
        var indoor = Alloy.Globals.DamageAssessmentsMakerPics["I"] ;
        // Inserting the image on the array of photos
        Alloy.Globals.CurrentPicsPath.push( { media: indoor.picture , latitude: indoor.latitude , longitude: indoor.longitude , address: indoor.address , heading: indoor.heading , damages_level: indoor.damages_level , damages_area: indoor.damages_area , comment: indoor.comment , path: ( "Indoor_" + current_time ) } ) ;
    }
}

// Done button click event handler
function OnBtnDone_Click( e )
{
    try
    {
        if( Alloy.Globals.DamageAssessmentsMakerPics &&
            ( Alloy.Globals.DamageAssessmentsMakerPics["N"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["E"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["S"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["W"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["R"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["I"] ) )
        {
            if( Alloy.Globals.DamageAssessmentsMakerPics["N"] &&
              Alloy.Globals.DamageAssessmentsMakerPics["E"] &&
              Alloy.Globals.DamageAssessmentsMakerPics["S"] &&
              Alloy.Globals.DamageAssessmentsMakerPics["W"] &&
              Alloy.Globals.DamageAssessmentsMakerPics["R"] ||
              Alloy.Globals.DamageAssessmentsMakerPics["I"] )
            {
                InsertDAElements() ;

                Back() ;
            }
            else
            {
                // AlertDialog to ask user if he want to proceed with some incompleted elements
                var alertDialog = Titanium.UI.createAlertDialog(
                {
                    title: L( 'generic_da_element_missing_title' ) ,
                    message: L( 'da_element_missing_text_msg' ) ,             
                    buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                    cancel: 1
                } ) ;
                alertDialog.addEventListener( 'click' , function( e )
                {
                    if( e.index == 0 )
                    {
                        InsertDAElements() ;

                        Back() ;
                    }
                } ) ;
                // Show alert message about authentication
                alertDialog.show() ;
            }
        }
        else
        {
            alert( L( 'da_elements_not_completed_text_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    Alloy.Globals.DamageAssessmentsMakerPics = null ;

    // Filtering the media contents by side (for being considered as the same side, must be the same side or empty)
    if( current_media_contents && current_media_contents.length > 0 )
    {
        for( var i = 0 ; i < current_media_contents.length ; i++ )
        {
            var current_media_elem = current_media_contents[i] ;
            if( current_media_elem.heading )
            {
                switch( current_media_elem.heading )
                {
                    case "N":
                    {
                        north_side_array.push( current_media_elem ) ;
                    }
                    break ;

                    case "S":
                    {
                        south_side_array.push( current_media_elem ) ;
                    }
                    break ;

                    case "W":
                    {
                        west_side_array.push( current_media_elem ) ;
                    }
                    break ;

                    case "E":
                    {
                        east_side_array.push( current_media_elem ) ;
                    }
                    break ;

                    case "R":
                    {
                        roof_array.push( current_media_elem ) ;
                    }
                    break ;

                    case "I":
                    {
                        indoor_array.push( current_media_elem ) ;
                    }
                    break ;
                }
            }
            else
            {
                north_side_array.push( current_media_elem ) ;
                south_side_array.push( current_media_elem ) ;
                west_side_array.push( current_media_elem ) ;
                east_side_array.push( current_media_elem ) ;
                roof_array.push( current_media_elem ) ;
                indoor_array.push( current_media_elem ) ;
            }
        }
    }

    // Disabling the buttons that doesn't contains any media contents
    if( north_side_array.length < 1 )
    {
        $.btn_north_side.enabled = false ;
    }
    if( south_side_array.length < 1 )
    {
        $.btn_south_side.enabled = false ;
    }
    if( west_side_array.length < 1 )
    {
        $.btn_west_side.enabled = false ;
    }
    if( east_side_array.length < 1 )
    {
        $.btn_east_side.enabled = false ;
    }
    if( roof_array.length < 1 )
    {
        $.btn_roof.enabled = false ;
    }
    if( indoor_array.length < 1 )
    {
        $.btn_indoor.enabled = false ;
    }

    if( current_type == "Shed" )
    {
        $.damageAssessmentsMakerWindow.setTitle( L( 'shed_damage_assessments_view_title' ) ) ;
    }
    else
    {
        $.damageAssessmentsMakerWindow.setTitle( L( 'building_damage_assessments_view_title' ) ) ;
    }

    // Init app buttons
    $.widgetAppButtonDone.init( '/images/done_normal.png' , '/images/done_pressed.png' , '/images/done_disabled.png' , L( 'generic_done_btn_title' ) , OnBtnDone_Click ) ;

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamageAssessmentsMaker.open() ;
    }
    else
    {
        $.damageAssessmentsMakerWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
