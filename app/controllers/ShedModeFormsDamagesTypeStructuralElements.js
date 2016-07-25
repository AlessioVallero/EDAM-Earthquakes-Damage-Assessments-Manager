var args = arguments[0] || {};
var current_is_synchronized = args.is_synchronized ;
var view_enabled = true ;
if( typeof current_is_synchronized != "undefined" )
{
    view_enabled = ( current_is_synchronized == "0" ) ;
}

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowDamagesTypeStructuralElements.close() ;
        }
        else
        {
            $.shedModeDamagesTypeStructuralElementsWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

// Table view type click event handler
function OnTableViewShedModeFormsDamagesTypeStructuralElements_Click( e )
{
    try
    {
        var help_image = null ;
        switch( e.index )
        {
            case 0:
            {
                help_image = "/images/Help/loss_of_support_of_the_beam.png" ;
            }
            break ;

            case 1:
            {
                help_image = "/images/Help/shear_failure_of_the_support_pillar.png" ;
            }
            break ;

            case 2:
            {
                help_image = "/images/Help/collapse_of_the_transverse_beam.png" ;
            }
            break ;

            case 3:
            {
                help_image = "/images/Help/rotation_of_the_pillar.png" ;
            }
            break ;

            case 4:
            {
                help_image = "/images/Help/connection_break.png" ;
            }
            break ;

            case 5:
            {
                help_image = "/images/Help/crisis_of_the_concrete_cover_of_the_plug.png" ;
            }
            break ;

            case 6:
            {
                help_image = "/images/Help/collapse_of_the_roof_tiles.png" ;
            }
            break ;

            case 7:
            {
                help_image = "/images/Help/permanent_rotations_of_the_beam_incoverage.png" ;
            }
            break ;

            case 8:
            {
                help_image = "/images/Help/crisis_of_the_fork.png" ;
            }
            break ;

            case 9:
            {
                help_image = "/images/Help/collapse_of_a_cover_plate.png" ;
            }
            break ;
        }

        Alloy.Globals.createAndOpenControllerExt( 'ShedModeFormsDamagesTypeDetails' , { type_id: e.index , type_section: 0 , father_title: e.row.children[0].text , is_synchronized: current_is_synchronized , help_image: help_image } ) ;
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the ScrollView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowDamagesTypeStructuralElements.open() ;
    }
    else
    {
        $.shedModeDamagesTypeStructuralElementsWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
