var rows = null ;
var help = null ;

$.init = function( lbl_text , array_rows , on_combobox_change , array_help , current_view )
{
    try
    {
        // Set the text of the label
        $.lblAppComboBox.setText( lbl_text ) ;
        // Set the rows of the picker
        rows = array_rows ;

        $.widgetAppComboBox.init( current_view ) ;
        $.widgetAppComboBox.choices = rows ;

        // Set the ComboBox change event handler
        if( on_combobox_change )
        {
            $.widgetAppComboBox.on( 'change' , on_combobox_change );
        }

        // Set the array of help images
        if( array_help && array_help.length > 0 )
        {
            help = array_help ;
        }
        else
        {
           // Hide the help button
            $.btnAppComboBoxHelp.visible = false ;
            $.widgetAppComboBox.setRight( 10 ) ;
        }
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

$.get_selected_index = function()
{
    var ret_index = -1 ;
 
    try
    {
        ret_index = $.widgetAppComboBox.id ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }

    return ret_index ;
} ;

$.set_selected_index = function( selected_index )
{
    try
    {
        $.widgetAppComboBox.id = selected_index ;
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
        $.lblAppComboBox.setHeight( new_height ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;

function OnBtnHelp_Click( e )
{
    try
    {
        if( help && help.length > 0 )
        {
            var current_selected_index = $.get_selected_index() ;
            if( current_selected_index != -1 )
            {
                if( help.length > current_selected_index )
                {
                    // Controller creation for the Help View
                    Alloy.createController( 'ViewHelpView' , { image: help[current_selected_index] , title: rows[current_selected_index].title } ).getView().open() ;
                }
            }
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
        // Enable/disable the ComboBox
        $.widgetAppComboBox.enabled( enabled ) ;
    }
    catch( exception )
    {
        alert( L( 'generic_exception_msg' ) + exception.message ) ;
    }
} ;
