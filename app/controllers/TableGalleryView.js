var args = arguments[0] || {};
var current_media_contents = args.media_contents ;
var current_type = args.type ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}
var current_is_damage_assessments_maker_view = args.is_damage_assessments_maker_view ;
var current_da_msg = args.da_msg ;
var current_da_value = args.da_value ;

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.tableViewGallery ) ;

var picture_controllers = new Array() ;
var video_controllers = new Array() ;

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
        Alloy.Globals.ProtectedRemoveEventListener( Ti.App , "da:done_propagation" , Back ) ;

        controls = null ;
        selectedPics = null ;
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowTableGalleryView.close() ;
        }
        else
        {
            $.tableGalleryViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var selectedPics = new Array() ;

// TableView click event handler
function OnTableViewGallery_Click( e )
{
    try
    {
        BusyAction( $.activity_indicator , controls , function()
        {
            var bRet = false ;

            // If it's clicked the delete button
            if( e.source.clickName == 'deleteButton' )
            {
                if( view_enabled )
                {
                    if( e.row )
                    {
                        // AlertDialog to ask user if is sure to delete the media content, because this operation cannot be reverted in the future
                        var alertDialogDeleteMediaContent = Titanium.UI.createAlertDialog(
                        {
                            title: L( 'generic_delete_media_content_title' ) ,
                            message: L( 'delete_media_content_msg' ) ,             
                            buttonNames: [ L( 'generic_yes_msg' ) , L( 'generic_no_msg' ) ] ,
                            cancel: 1
                        } ) ;
                        alertDialogDeleteMediaContent.addEventListener( 'click' , function( event )
                        {
                            if( event.index == 0 )
                            {
                                // Row in the DB
                                if( e.row.rowPicId || e.row.rowVidId )
                                {
                                    var media_table = null ;
                                    var media_path_column = null ;
                                    var media_id = null ;
                                    if( e.row.rowType == "PIC" )
                                    {
                                        media_id = e.row.rowPicId ;
                                        if( current_type == "UsersResidents" )
                                        {
                                            media_table = "UsersResidentsFormsImages" ;
                                        }
                                        else if( current_type == "AeDES" )
                                        {
                                            media_table = "AeDESFormsImages" ;
                                        }
                                        else if( current_type == "Shed" )
                                        {
                                            media_table = "ShedFormsImages" ;
                                        }
                                        else if( current_type == "ATC20" )
                                        {
                                            media_table = "ATC20FormsImages" ;
                                        }
                                        media_path_column = "IMAGE_PATH" ;

                                        if( Alloy.Globals.CurrentPicsPath && Alloy.Globals.CurrentPicsPath.length > 0 )
                                        {
                                            for( var i = 0 ; i < Alloy.Globals.CurrentPicsPath.length ; i++ )
                                            {
                                                // If there is an element for this row on the array, this means that the original content is modified and ready to be saved, so we must delete it too
                                                if( Alloy.Globals.CurrentPicsPath[i].id == media_id && !Alloy.Globals.CurrentPicsPath[i].media )
                                                {
                                                    Alloy.Globals.CurrentPicsPath.splice( i , 1 ) ;
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        media_id = e.row.rowVidId ;
                                        if( current_type == "UsersResidents" )
                                        {
                                            media_table = "UsersResidentsFormsVideos" ;
                                        }
                                        else if( current_type == "AeDES" )
                                        {
                                            media_table = "AeDESFormsVideos" ;
                                        }
                                        else if( current_type == "Shed" )
                                        {
                                            media_table = "ShedFormsVideos" ;
                                        }
                                        else if( current_type == "ATC20" )
                                        {
                                            media_table = "ATC20FormsVideos" ;
                                        }
                                        media_path_column = "VIDEO_PATH" ;

                                        if( Alloy.Globals.CurrentVideosPath && Alloy.Globals.CurrentVideosPath.length > 0 )
                                        {
                                            for( var i = 0 ; i < Alloy.Globals.CurrentVideosPath.length ; i++ )
                                            {
                                                // If there is an element for this row on the array, this means that the original content is modified and ready to be saved, so we must delete it too
                                                if( Alloy.Globals.CurrentVideosPath[i].id == media_id && !Alloy.Globals.CurrentVideosPath[i].media )
                                                {
                                                    Alloy.Globals.CurrentVideosPath.splice( i , 1 ) ;
                                                }
                                            }
                                        }
                                    }

                                    if( media_table && media_id )
                                    {
                                        // Delete media from the DB
                                        var recoverMedia = Alloy.createCollection( media_table ) ;
                                        recoverMedia.fetch( { query: "SELECT * FROM " + media_table + " where ID = " + media_id } ) ;
                                        while( recoverMedia.length > 0 )
                                        {
                                            var model = recoverMedia.at( 0 ) ;

                                            var path = model.get( media_path_column ) ;
                                            var file = Alloy.Globals.getFileForRead( path ) ;
                                            if( file )
                                            {
                                                // The media will be dropped
                                                file.deleteFile() ;
                                            }

                                            recoverMedia.remove( model ) ;
                                            model.destroy() ;
                                        }

                                        // Remove row from the table too
                                        $.tableViewGallery.deleteRow( e.index ) ;
                                    }
                                }
                                else // Row in RAM
                                {
                                    if( e.row.rowType == "PIC" )
                                    {
                                        for( var i = e.row.rowIndex + 1 ; i < $.tableViewGallery.data[0].rows.length ; i++ )
                                        {
                                            if( $.tableViewGallery.data[0].rows[i].rowType == "PIC" )
                                            {
                                                // Decrease the index of the rows pictures that are after this one
                                                $.tableViewGallery.data[0].rows[i].rowIndex-- ;
                                            }
                                        }
                                        // At position e.row.rowIndex, remove 1 element
                                        Alloy.Globals.CurrentPicsPath.splice( e.row.rowIndex , 1 ) ;
                                    }
                                    else
                                    {
                                        for( var i = e.row.rowIndex + 1 ; i < $.tableViewGallery.data[0].rows.length ; i++ )
                                        {
                                            if( $.tableViewGallery.data[0].rows[i].rowType == "VID" )
                                            {
                                                // Decrease the index of the rows videos that are after this one
                                                $.tableViewGallery.data[0].rows[i].rowIndex-- ;
                                            }
                                        }
                                        // At position e.row.rowIndex, remove 1 element
                                        Alloy.Globals.CurrentVideosPath.splice( e.row.rowIndex , 1 ) ;
                                    }

                                    // Remove row from the table too
                                    $.tableViewGallery.deleteRow( e.index ) ;
                                }

                                // Refresh of the TableView's height
                                $.tableViewGallery.setHeight( $.tableViewGallery.data[0].rows.length * 130 ) ;

                                if( $.tableViewGallery.data[0] && $.tableViewGallery.data[0].rows && $.tableViewGallery.data[0].rows.length > 0 )
                                {
                                    $.tableViewGallery.setVisible( true ) ;
                                }
                                else
                                {
                                    $.tableViewGallery.setVisible( false ) ;
                                }
                            }
                        } ) ;
                        // Show alert message
                        alertDialogDeleteMediaContent.show() ;
                    }
                }
            }
            else if( e.source.clickName == 'selectedButton' )
            {
                if( e.row )
                {
                    // If was not selected, this picture will be selected and inserted in our array of selections
                    if( e.source.value == "0" )
                    {
                        e.source.backgroundColor = '#007690' ;
                        e.source.title = '\u2713' ;
                        e.source.value = "1" ;

                        selectedPics.push( { image: e.row.rowId , latitude: e.row.rowLatitude , longitude: e.row.rowLongitude , address: e.row.rowAddress } ) ;
                    }
                    else // If was selected, this picture will be removed from our array of selections
                    {
                        e.source.backgroundColor = '#aaa' ;
                        e.source.title = '' ;
                        e.source.value = "0" ;

                        var index = -1 ;
                        for( var i = 0 ; i < selectedPics.length ; i++ )
                        {
                            if( selectedPics[i].image == e.row.rowId )
                            {
                                index = i ;
                                break ;
                            }
                        }
                        if( index != -1 )
                        {
                            selectedPics.splice( index , 1 ) ;
                        }
                    }

                    // Refresh the TableView
                    $.tableViewGallery.setData( $.tableViewGallery.getData() ) ;
                }
            }
            else
            {
                if( e.row.rowType == "PIC" )
                {
                    // Searching for an already existing controller (if this pic was already been opened before)
                    var current_controller = null ;
                    for( var i = 0 ; i < picture_controllers.length ; i++ )
                    {
                        if( picture_controllers[i].id == e.row.rowId )
                        {
                            current_controller = picture_controllers[i].controller ;
                            break ;
                        }
                    }
    
                    // If this is the first time that the user want to visualize this pic, we'll create the controller
                    if( current_controller == null )
                    {
                        var is_enabled = current_is_damage_assessments_maker_view ? !current_is_damage_assessments_maker_view : undefined ;
                        current_controller = Alloy.createController( 'SinglePictureView' , { image_path: e.row.rowId , latitude: e.row.rowLatitude , longitude: e.row.rowLongitude , address: e.row.rowAddress , heading: e.row.rowHeading , damages_level: e.row.rowDamagesLevel , damages_area: e.row.rowDamagesArea , comment: e.row.rowComment , index: e.row.rowIndex , id: e.row.rowPicId , is_synchronized: current_is_synchronized , is_enabled: is_enabled } ) ;
                        // Controller creation for the Next View
                        picture_controllers.push( { id: e.row.rowId , controller: current_controller } ) ;
                    }

                    Alloy.Globals.openExistingControllerExt( current_controller ) ;
                }
                else
                {
                    // Searching for an already existing controller (if this video was already been opened before)
                    var current_controller = null ;
                    for( var i = 0 ; i < video_controllers.length ; i++ )
                    {
                        if( video_controllers[i].id == e.row.rowId )
                        {
                            current_controller = video_controllers[i].controller ;
                            break ;
                        }
                    }
    
                    // If this is the first time that the user want to visualize this pic, we'll create the controller
                    if( current_controller == null )
                    {
                        var is_enabled = current_is_damage_assessments_maker_view ? !current_is_damage_assessments_maker_view : undefined ;
                        current_controller = Alloy.createController( 'SingleVideoView' , { video_path: e.row.rowId , latitude: e.row.rowLatitude , longitude: e.row.rowLongitude , address: e.row.rowAddress , heading: e.row.rowHeading , damages_level: e.row.rowDamagesLevel , damages_area: e.row.rowDamagesArea , comment: e.row.rowComment , index: e.row.rowIndex , id: e.row.rowVidId , is_synchronized: current_is_synchronized , is_enabled: is_enabled } ) ;
                        // Controller creation for the Next View
                        video_controllers.push( { id: e.row.rowId , controller: current_controller } ) ;
                    }

                    Alloy.Globals.openExistingControllerExt( current_controller ) ;
                }
            }

            bRet = true ;

            return bRet ;
        } ) ;
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
        if( selectedPics && selectedPics.length > 0 )
        {
            Alloy.Globals.ProtectedAddEventListener( Ti.App , "da:done_propagation" , Back ) ;
            // Controller creation for the Next View
            Alloy.Globals.createAndOpenControllerExt( 'DAElementDamageAssessmentsView' , { selected_pics: selectedPics , da_msg: current_da_msg , da_value: current_da_value } ) ;
        }
        else
        {
            alert( L( 'no_pic_selected_msg' ) ) ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Import from gallery button click event handler
function OnBtnImportFromGallery_Click( e )
{
    try
    {
        // Obtain an image/video from the gallery
        Titanium.Media.openPhotoGallery(
        {
            success:function( event )
            {
                // Checking if it is photo or a video
                if( event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO )
                {
                    // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the image in a temporary folder and use the nativePath
                    // The files in the temporary folder may not persist when the application is shut down and restarted.
                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".png" ) ;
                    if( newFile.exists )
                    {
                        // A previous image will be dropped
                        newFile.deleteFile() ;
                    }
                    newFile.write( event.media ) ;

                    // Getting media
                    var mediaDetails = { media: newFile.getNativePath() , latitude: 0 , longitude: 0 , address: "" , damages_level: "0" , damages_area: "0" , comment: "" , media_found: true } ;

                    // Init of the array (if it's necessary)
                    if( !Alloy.Globals.CurrentPicsPath )
                    {
                        Alloy.Globals.CurrentPicsPath = new Array() ;
                    }

                    mediaDetails["index"] = Alloy.Globals.CurrentPicsPath.length ;
                    mediaDetails["type"] = "PIC" ;

                    // Inserting the image on the array of pictures
                    Alloy.Globals.CurrentPicsPath.push( mediaDetails ) ;
                }
                else if( event.mediaType == Ti.Media.MEDIA_TYPE_VIDEO )
                {
                    // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the video in a temporary folder and use the nativePath
                    // The files in the temporary folder may not persist when the application is shut down and restarted.
                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".3gp" ) ;
                    if( newFile.exists )
                    {
                        // A previous image will be dropped
                        newFile.deleteFile() ;
                    }
                    newFile.write( event.media ) ;

                    // Getting media
                    var mediaDetails = { media: newFile.getNativePath() , latitude: 0 , longitude: 0 , address: "" , damages_level: "0" , damages_area: "0" , comment: "" , media_found: true } ;

                    // Init of the array (if it's necessary)
                    if( !Alloy.Globals.CurrentVideosPath )
                    {
                        Alloy.Globals.CurrentVideosPath = new Array() ;
                    }

                    mediaDetails["index"] = Alloy.Globals.CurrentVideosPath.length ;
                    mediaDetails["type"] = "VID" ;

                    // Inserting the video on the array of videos
                    Alloy.Globals.CurrentVideosPath.push( mediaDetails ) ;
                }

                $.tableViewGallery.setVisible( true ) ;
                // Init the TableView
                $.tableViewGallery.appendRow( CreateMediaContentTableViewRow( mediaDetails ) ) ;
                $.tableViewGallery.setHeight( $.tableViewGallery.data[0].rows.length * 130 ) ;

                alert( L( "generic_content_imported_msg" ) ) ;
            } ,
            mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO]
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Import video from gallery button click event handler
function OnBtnImportVideoFromGallery_Click( e )
{
    try
    {
        var intent = Titanium.Android.createIntent(
        { 
            action: Ti.Android.ACTION_PICK,
            type: "video/*"
        } ) ; //android.media.action.VIDEO_CAPTURE

        intent.addCategory( Ti.Android.CATEGORY_DEFAULT ) ;
 
        $.tableGalleryViewWindow.getActivity().startActivityForResult( intent , function( e )
        {
            if( e.error )
            {
                Ti.UI.createNotification(
                {
                    duration: Ti.UI.NOTIFICATION_DURATION_LONG ,
                    message: 'Error ' + e.error
                } ).show() ;
            }
            else if( e.resultCode == Ti.Android.RESULT_OK )
            {
                if( e.intent.data )
                {
                    // Since the Blob object sometimes cause strange effect on a TableGalleryView, we'll write the video in a temporary folder and use the nativePath
                    // The files in the temporary folder may not persist when the application is shut down and restarted.
                    var newFile = Titanium.Filesystem.getFile( Titanium.Filesystem.getTempDirectory() , Ti.Platform.createUUID() + ".3gp" ) ;
                    if( newFile.exists )
                    {
                        // A previous video will be dropped
                        newFile.deleteFile() ;
                    }

                    var sourceVideo = Ti.Filesystem.getFile( e.intent.data ) ;
                    // Note: sourceVideo.exists() will return false, because this is a URI into the MediaStore.
                    // BUT we can still call "copy" to save the data to an actual file
                    sourceVideo.copy( newFile.nativePath ) ;

                    // Init of the array (if it's necessary)
                    if( !Alloy.Globals.CurrentVideosPath )
                    {
                        Alloy.Globals.CurrentVideosPath = new Array() ;
                    }

                    var mediaDetails = { media: newFile.getNativePath() , latitude: 0 , longitude: 0 , address: "" , damages_level: "0" , damages_area: "0" , comment: "" , media_found: true } ;

                    mediaDetails["index"] = Alloy.Globals.CurrentVideosPath.length ;
                    mediaDetails["type"] = "VID" ;

                    // Inserting the video on the array of videos
                    Alloy.Globals.CurrentVideosPath.push( mediaDetails ) ;

                    $.tableViewGallery.setVisible( true ) ;
                    // Init the TableView
                    $.tableViewGallery.appendRow( CreateMediaContentTableViewRow( mediaDetails ) ) ;
                    $.tableViewGallery.setHeight( $.tableViewGallery.data[0].rows.length * 130 ) ;
    
                    alert( L( "generic_content_imported_msg" ) ) ;
                }
            }
        } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Function create media content TableViewRow
function CreateMediaContentTableViewRow( media_content )
{
    var row = Ti.UI.createTableViewRow() ;
    // The Id of the media, if it's already on the DB
    row.rowId = media_content.media ;
    row.rowType = media_content.type ;
    row.rowLatitude = media_content.latitude ;
    row.rowLongitude = media_content.longitude ;
    row.rowAddress = media_content.address ;
    row.rowHeading = media_content.heading ;
    row.rowDamagesLevel = media_content.damages_level ;
    row.rowDamagesArea = media_content.damages_area ;
    row.rowComment = media_content.comment ;
    // The index on the global array, if it's not already saved on the DB
    row.rowIndex = media_content.index ;
    row.setHeight( 130 ) ;

    // The videos have a generic image as preview
    var image_uri = "/images/generic_video.png" ;
    if( media_content.type == "PIC" )
    {
        image_uri = media_content.media ;
        row.rowPicId = media_content.id ;
    }
    else
    {
        row.rowVidId = media_content.id ;
    }

    // Picture/Video
    var image = Ti.UI.createImageView(
    {
        left: 5 ,
        width: 130 ,
        image: image_uri ,
        defaultImage: "/images/img_not_found.png"
    } ) ;
    row.add( image ) ;

    if( current_is_damage_assessments_maker_view )
    {
        // Selected button
        var selectedButton = Ti.UI.createButton(
        {
            right: 20 ,
            width: 30 ,
            title: '' ,
            height: 30 ,
            borderColor: '#666' ,
            borderWidth: 2 ,
            borderRadius: 3 ,
            backgroundColor: '#aaa' ,
            backgroundImage: 'none' ,
            color: '#fff' ,
            clickName: 'selectedButton' ,
            font:
            {
                fontSize: 22 ,
                fontWeight: 'bold'
            } ,
            value: "0" // value is a custom property in this case here.
        } ) ; 
        row.add( selectedButton ) ;
    }
    else
    {
        // Delete button
        var deleteButton = Ti.UI.createButton(
        {
            color: 'black' ,
            backgroundColor: 'red' ,
            title: L( 'generic_delete_title' ) ,
            right: 8 ,
            width: 105 ,
            clickName: 'deleteButton' ,
            height: 34
        } ) ; 
        row.add( deleteButton ) ;

        // The style in the classic mode it's always the same, so we can set a className
        row.className = "Media" ; 
    }

    return row ;
}

try
{
    // If we are using this View on a BuildingDamageAssessmentsView or ShedDamageAssessmentsView, we must Init the Next widget and move the TableView
    // If we are here from a "normal" view, we must remove the Next widget
    if( current_is_damage_assessments_maker_view )
    {
        $.tableGalleryViewWindow.setTitle( L( 'table_gallery_view_da_title' ) ) ;

        // On iOS we only need to remove one import button, on Android both the pic and the video import buttons
        if( OS_IOS )
        {
            $.tableGalleryViewWindow.remove( $.viewAppButtonImportFromGallery ) ;
            $.viewAppButtonImportFromGallery = null ;
        }
        else
        {
            $.tableGalleryViewWindow.remove( $.viewAppButtonImportPicFromGallery ) ;
            $.viewAppButtonImportPicFromGallery = null ;
            $.tableGalleryViewWindow.remove( $.viewAppButtonImportVideoFromGallery ) ;
            $.viewAppButtonImportVideoFromGallery = null ;
            $.tableGalleryViewWindow.remove( $.viewAppButtonImport ) ;
            $.viewAppButtonImport = null ;
        }
        $.widgetAppButtonNext.init( '/images/next_normal.png' , '/images/next_pressed.png' , '/images/next_disabled.png' , L( 'generic_next_btn_title' ) , OnBtnNext_Click ) ;     
    }
    else
    {
        $.tableGalleryViewWindow.setTitle( L( 'table_gallery_view_standard_title' ) ) ;

        $.tableGalleryViewWindow.remove( $.viewAppButtonNext ) ;
        $.viewAppButtonNext = null ;
        // On iOS we only need to init one import button, on Android both the pic and the video import buttons
        if( OS_IOS )
        {
            $.widgetAppButtonImportFromGallery.init( '/images/import_from_gallery_normal.png' , '/images/import_from_gallery_pressed.png' , '/images/import_from_gallery_disabled.png' , L( 'generic_import_from_gallery_btn_title' ) , OnBtnImportFromGallery_Click ) ;
        }
        else
        {
            $.widgetAppButtonImportPicFromGallery.init( '/images/import_pic_normal.png' , '/images/import_pic_pressed.png' , '/images/import_pic_disabled.png' , L( 'generic_import_pic_from_gallery_btn_title' ) , OnBtnImportFromGallery_Click ) ;
            $.widgetAppButtonImportPicFromGallery.set_label_height( 42 ) ;
            $.widgetAppButtonImportVideoFromGallery.init( '/images/import_video_normal.png' , '/images/import_video_pressed.png' , '/images/import_video_disabled.png' , L( 'generic_import_video_from_gallery_btn_title' ) , OnBtnImportVideoFromGallery_Click ) ;
            $.widgetAppButtonImportVideoFromGallery.set_label_height( 42 ) ;
        }
    }

    // Init the TableView
    var table_data = [] ;
    // Creating the ImageView's array
    for( var i = 0 ; i < current_media_contents.length ; i++ )
    {
        var media_content = current_media_contents[i] ;
        // We will add only the contents with the media set
        if( media_content.media )
        {
            table_data.push( CreateMediaContentTableViewRow( media_content ) ) ;
        }
    }
    $.tableViewGallery.setData( table_data ) ;
    $.tableViewGallery.setHeight( table_data.length * 130 ) ;

    if( table_data.length > 0 )
    {
        $.tableViewGallery.setVisible( true ) ;
    }
    else
    {
        $.tableViewGallery.setVisible( false ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowTableGalleryView.open() ;
    }
    else
    {
        $.tableGalleryViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
