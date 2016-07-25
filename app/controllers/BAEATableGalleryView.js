var args = arguments[0] || {};
var current_media_contents = args.media_contents ;
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Array of controls to disable/enable during a busy state
var controls = new Array() ;

if( OS_IOS )
{
    controls.push( $.btn_ios_back ) ;
}

controls.push( $.baeaTableViewGallery ) ;

// This avoid a physical back button event to occur during a critical job
var bIsWorkInProgress = false ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    Back() ;
}

// Android's physical back button click event handler
function OnAndroidBackButton_Click( e )
{
    // We can go back only if a saving is not in progress
    if( !bIsWorkInProgress )
    {
        Back() ;
    }
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
            $.navigationWindowBAEATableGalleryView.close() ;
        }
        else
        {
            $.baeaTableGalleryViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

var selectedPics = new Array() ;

// TableView click event handler
function OnBAEATableViewGallery_Click( e )
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
                                if( e.row.rowPicId )
                                {
                                    // Delete media from the DB
                                    var recoverMedia = Alloy.createCollection( "BAEAFormsImages" ) ;
                                    recoverMedia.fetch( { query: "SELECT * FROM BAEAFormsImages where ID = " + e.row.rowPicId } ) ;
                                    while( recoverMedia.length > 0 )
                                    {
                                        var model = recoverMedia.at( 0 ) ;

                                        var image_path = model.get( "IMAGE_PATH" ) ;
                                        var file = Alloy.Globals.getFileForRead( image_path ) ;
                                        if( file )
                                        {
                                            // The picture will be dropped
                                            file.deleteFile() ;
                                        }

                                        recoverMedia.remove( model ) ;
                                        model.destroy() ;
                                    }

                                    // Remove row from RAM and table too
                                    // At position e.row.rowIndex, remove 1 element
                                    current_media_contents["PERMANENT"].splice( e.row.rowIndex , 1 ) ;
                                    $.baeaTableViewGallery.deleteRow( e.index ) ;

                                    for( var i = e.index + 1 ; i < $.baeaTableViewGallery.data[0].rows.length ; i++ )
                                    {
                                        if( $.baeaTableViewGallery.data[0].rows[i].rowIsNew )
                                        {
                                            break ;
                                        }

                                        // Decrease the index of the rows pictures that are after this one
                                        $.baeaTableViewGallery.data[0].rows[i].rowIndex-- ;
                                    }
                                }
                                else // Row in RAM
                                {
                                    if( e.row.rowIsNew )
                                    {
                                        for( var i = e.index + 1 ; i < $.baeaTableViewGallery.data[0].rows.length ; i++ )
                                        {
                                            // Decrease the index of the rows pictures that are after this one
                                            $.baeaTableViewGallery.data[0].rows[i].rowIndex-- ;
                                        }

                                        // At position e.row.rowIndex, remove 1 element
                                        current_media_contents["TEMPORARY"].splice( e.row.rowIndex , 1 ) ;
                                    }
                                    else
                                    {
                                        for( var i = e.index + 1 ; i < $.baeaTableViewGallery.data[0].rows.length ; i++ )
                                        {
                                            if( $.baeaTableViewGallery.data[0].rows[i].rowIsNew )
                                            {
                                                break ;
                                            }

                                            // Decrease the index of the rows pictures that are after this one
                                            $.baeaTableViewGallery.data[0].rows[i].rowIndex-- ;
                                        }

                                        // At position e.row.rowIndex, remove 1 element
                                        current_media_contents["PERMANENT"].splice( e.row.rowIndex , 1 ) ;
                                    }

                                    // Remove row from the table too
                                    $.baeaTableViewGallery.deleteRow( e.index ) ;
                                }

                                // Refresh of the TableView's height
                                $.baeaTableViewGallery.setHeight( $.baeaTableViewGallery.data[0].rows.length * 130 ) ;

                                if( $.baeaTableViewGallery.data[0] && $.baeaTableViewGallery.data[0].rows && $.baeaTableViewGallery.data[0].rows.length > 0 )
                                {
                                    $.baeaTableViewGallery.setVisible( true ) ;
                                }
                                else
                                {
                                    $.baeaTableViewGallery.setVisible( false ) ;

                                    Back() ;
                                }
                            }
                        } ) ;
                        // Show alert message
                        alertDialogDeleteMediaContent.show() ;
                    }
                }
            }
            else
            {
                Alloy.Globals.createAndOpenControllerExt( 'BAEASinglePictureView' , { image_path: e.row.rowId } ) ;
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

// Function create media content TableViewRow
function CreateMediaContentTableViewRow( media_content , is_new , index )
{
    var row = Ti.UI.createTableViewRow() ;
    // If the photo is in the Temporary array or not
    row.rowIsNew = is_new ;
    // The Id of the media, if it's already on the DB
    row.rowId = media_content.media ;
    // The index in the RAM array
    row.rowIndex = index ;
    row.setHeight( 130 ) ;

    var image_uri = media_content.media ;
    row.rowPicId = media_content.id ;

    // Picture/Video
    var image = Ti.UI.createImageView(
    {
        left: 5 ,
        width: 130 ,
        image: image_uri ,
        defaultImage: "/images/img_not_found.png"
    } ) ;
    row.add( image ) ;

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

    return row ;
}

try
{
    $.baeaTableGalleryViewWindow.setTitle( L( 'baea_table_gallery_view_title' ) ) ;

    // Init the TableView
    var table_data = [] ;
    // Creating the ImageView's array
    for( var i = 0 ; current_media_contents["PERMANENT"] && i < current_media_contents["PERMANENT"].length ; i++ )
    {
        var media_content = current_media_contents["PERMANENT"][i] ;
        // We will add only the contents with the media set
        if( media_content.media )
        {
            table_data.push( CreateMediaContentTableViewRow( media_content , false , i ) ) ;
        }
    }
    for( var i = 0 ; current_media_contents["TEMPORARY"] && i < current_media_contents["TEMPORARY"].length ; i++ )
    {
        var media_content = current_media_contents["TEMPORARY"][i] ;
        // We will add only the contents with the media set
        if( media_content.media )
        {
            table_data.push( CreateMediaContentTableViewRow( media_content , true , i ) ) ;
        }
    }

    $.baeaTableViewGallery.setData( table_data ) ;
    $.baeaTableViewGallery.setHeight( table_data.length * 130 ) ;

    if( table_data.length > 0 )
    {
        $.baeaTableViewGallery.setVisible( true ) ;
    }
    else
    {
        $.baeaTableViewGallery.setVisible( false ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowBAEATableGalleryView.open() ;
    }
    else
    {
        $.baeaTableGalleryViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
