// Public init function
$.init = function( on_btn_done_event_handler )
{
    try
    {
        // Init app button
        $.widgetAppButtonDone.init( '/images/done_normal.png' , '/images/done_pressed.png' , '/images/done_disabled.png' , L( 'generic_done_btn_title' ) , on_btn_done_event_handler ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

// Get the Done button
$.get_done_button = function()
{
    return $.widgetAppButtonDone.get_button() ;
} ;

// Public return current image function
$.get_current_image = function( need_transparent_background )
{
    var oldBackgroundColor = $.paint_view.getBackgroundColor() ;

    if( need_transparent_background )
    {
        $.paint_view.setBackgroundColor( 'transparent' ) ;
    }

    var ret_image = $.paint_view.toImage() ;

    if( need_transparent_background )
    {
        $.paint_view.setBackgroundColor( oldBackgroundColor ) ;
    }

    // iOS devices need the entire Image object,
    // Android devices only the media part
    if( OS_IOS )
    {
        return ret_image ;
    }
    else
    {
        return ret_image.media ;
    }
} ;

// Setting the stroke color to red
function OnBtnStrokeColorRed_Click( e )
{
    $.paint_view.strokeColor = 'red' ;
}

// Setting the stroke color to blue
function OnBtnStrokeColorBlue_Click( e )
{
    $.paint_view.strokeColor = '#0000ff' ;
}

// Setting the stroke color to black
function OnBtnStrokeColorBlack_Click( e )
{
    $.paint_view.strokeColor = '#000' ;
}

// Enabling/Disabling the erase mode and changing the background image
function OnBtnStrokeColorEraser_Click( e )
{
    try
    {
        var bEraseMode = ( $.paint_view.eraseMode ) ? false : true ;
        if( bEraseMode )
        {
            // Now we are erasing: the icon became a pen and the stroke color white
            $.btnStrokeColorEraser.setBackgroundImage( "/images/pen.png" ) ;
            $.lblStrokeColorEraser.setText( L( 'generic_draws_msg' ) ) ;
        }
        else
        {
            // Now we are writing: the icon became a rubber and the stroke color the last one before entering the erase mode
            $.btnStrokeColorEraser.setBackgroundImage( "/images/rubber.png" ) ;
            $.lblStrokeColorEraser.setText( L( 'generic_erase_msg' ) ) ;
        }

        $.paint_view.eraseMode = bEraseMode ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Setting the stroke transparency (also called 'alpha') and changing the title
function OnBtnStrokeTransparency_Click( e )
{
    try
    {
        $.paint_view.strokeAlpha = ( $.paint_view.strokeAlpha === 255 ) ? 127 : 255 ;
        e.source.title = ( $.paint_view.strokeAlpha === 255 ) ? L( 'full_stroke_alpha_title' ) : L( 'half_stroke_alpha_title' ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Setting the stroke width and changing the title
function OnBtnStrokeWidth_Click( e )
{
    try
    {
        $.paint_view.strokeWidth = ( $.paint_view.strokeWidth === 10 ) ? 5 : 10 ;
        e.source.title = ( $.paint_view.strokeWidth === 10 ) ? L( 'full_stroke_width_title' ) : L ( 'half_stroke_width_title' ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}
