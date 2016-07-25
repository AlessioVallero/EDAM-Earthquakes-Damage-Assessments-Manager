var help = null ;

$.init = function( lbl_text , cb_value , on_checkbox_click , elem_help )
{
    try
    {
        // Set the text of the label
        $.lblAppCheckBox.setText( lbl_text ) ;
        // Set the value of the checkbox
        if( cb_value == "1" )
        {
            $.cbAppCheckBox.on() ;
        }
        else
        {
            $.cbAppCheckBox.off() ;
        }

        // Set the CheckBox click event handler
        if( on_checkbox_click )
        {
            $.cbAppCheckBox.addEventListener( 'click' , on_checkbox_click ) ;
        }

        // Set the help image
        if( elem_help )
        {
            help = elem_help ;
        }
        else
        {
           // Hide the help button and move the checkbox to the left position of the button, to recover space
            $.btnAppCheckBoxHelp.visible = false ;
            $.cbAppCheckBox.setLeft( $.btnAppCheckBoxHelp.getLeft() ) ;
        }
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.get_value = function()
{
    var ret_value = false ;
 
    try
    {
        // Get the checkbox value
        ret_value = $.cbAppCheckBox.value ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }

    return ret_value ;
} ;

$.set_value = function( new_value )
{
    try
    {
        // Set the value of the checkbox
        if( new_value == "1" )
        {
            $.cbAppCheckBox.off() ;
        }
        else
        {
            $.cbAppCheckBox.on() ;
        }
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.set_label_height = function( new_height )
{
    try
    {
        // Set the height of the label
        $.lblAppCheckBox.setHeight( new_height ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

// Attach some simple on/off actions
$.cbAppCheckBox.on = function()
{
    this.backgroundColor = '#007690' ;
    this.title = '\u2713' ;
    this.value = "1" ;
} ;
 
$.cbAppCheckBox.off = function()
{
    this.backgroundColor = '#aaa' ;
    this.title = '' ;
    this.value = "0" ;
} ;
 
$.cbAppCheckBox.addEventListener( 'click' , function( e )
{
    if( e.source.value == "0" )
    {
        e.source.on() ;
    }
    else
    {
        e.source.off() ;
    }
} ) ;

function OnBtnHelp_Click( e )
{
    try
    {
        if( help )
        {
            // Controller creation for the Help View
            Alloy.createController( 'ViewHelpView' , { image: help , title: $.lblAppCheckBox.getText() } ).getView().open() ;
        }
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

$.enabled = function( enabled )
{
    try
    {
        // Set the enabled value of the CheckBox
        $.cbAppCheckBox.enabled = enabled ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;
