$.init = function( btn_background_image_path , btn_background_pressed_image_path , btn_background_disabled_image_path , lbl_text , on_btn_click_function )
{
    try
    {
        // Set the background image of the button on normal conditions
        $.btnAppButton.setBackgroundImage( btn_background_image_path ) ;
        // Set the background image of the button when is pressed
        $.btnAppButton.setBackgroundSelectedImage( btn_background_pressed_image_path ) ;
        // Set the background image of the button on disabled conditions
        $.btnAppButton.setBackgroundDisabledImage( btn_background_disabled_image_path ) ;
        // Set the text of the label
        $.lblAppButton.setText( lbl_text ) ;
        // Set the onClick event handler
        $.btnAppButton.addEventListener( 'click' , on_btn_click_function ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.set_label_height = function( label_height )
{
    try
    {
        // Set the label height
        $.lblAppButton.height = label_height ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.set_label_text = function( label_text )
{
    try
    {
        // Set the label text
        $.lblAppButton.setText( label_text ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.get_button = function()
{
    return $.btnAppButton ;
} ;

$.enabled = function( enabled )
{
    try
    {
        // Set the enabled value of the Button
        $.btnAppButton.enabled = enabled ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;
