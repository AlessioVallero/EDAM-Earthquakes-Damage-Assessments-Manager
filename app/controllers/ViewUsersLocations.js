var args = arguments[0] || {} ;
var current_users_coordinates = args.users_coordinates ;
var current_mode = args.mode ;
var current_title = args.title ;
if( typeof current_mode == 'undefined' )
{
    // EDAM in the world
    current_mode = "EITW" ;
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
            $.navigationWindowViewUsersLocationsView.close() ;
        }
        else
        {
            $.viewUsersLocationsViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    if( current_mode == "YL" )
    {
        $.viewUsersLocationsViewWindow.setTitle( L( 'generic_your_location_title' ) ) ;

        $.map.addAnnotation( Alloy.Globals.Map.createAnnotation(
        {
            latitude: current_users_coordinates["LATITUDE"] ,
            longitude: current_users_coordinates["LONGITUDE"] ,
            pincolor: Alloy.Globals.Map.ANNOTATION_AZURE ,
            image: '/images/app_icon.png'
        } ) ) ;
    }
    else if( current_users_coordinates && current_users_coordinates.length > 0 )
    {
        if( current_mode == "EITW" )
        {
            $.viewUsersLocationsViewWindow.setTitle( L( 'users_locations_view_title' ) ) ;

            for( var i = 0 ; i < current_users_coordinates.length ; i++ )
            {
                var currentElem = current_users_coordinates[i] ;

                var currentUsername = currentElem["USERNAME"] ;
                if( currentUsername == Alloy.Globals.SessionUsername )
                {
                    currentUsername = L( 'generic_me_msg' ) ;
                }

                var subtitleMsg = null ;
                if( typeof currentElem["OS"] !== 'undefined' && currentElem["OS"] && currentElem["OS"].toLowerCase() != 'null' )
                {
                    subtitleMsg = L( 'user_location_last_use_text_msg' ) + currentElem["DATE"] + ' UTC ' + L( 'generic_on_msg' ) + currentElem["OS"] ;
                }
                else
                {
                    subtitleMsg = L( 'user_location_last_use_text_msg' ) + currentElem["DATE"] + ' UTC' ;
                }
                $.map.addAnnotation( Alloy.Globals.Map.createAnnotation(
                {
                    latitude: currentElem["LATITUDE"] ,
                    longitude: currentElem["LONGITUDE"] ,
                    pincolor: Alloy.Globals.Map.ANNOTATION_AZURE ,
                    image: '/images/app_icon.png' ,
                    title: currentUsername ,
                    subtitle: subtitleMsg
                } ) ) ;
            }
        }
        else if( current_mode == "BAEA" )
        {
            $.viewUsersLocationsViewWindow.setTitle( current_title ) ;

            for( var i = 0 ; i < current_users_coordinates.length ; i++ )
            {
                var currentElem = current_users_coordinates[i] ;

                var annotationTitle = "" ;
                switch( currentElem['SECTION'] )
                {
                    case "FR":
                    {
                        annotationTitle = L( 'baea_mode_section_fault_rupture_title' ) ;
                    }
                    break ;

                    case "LQ":
                    {
                        annotationTitle = L( 'baea_mode_section_liquefaction_title' ) ;
                    }
                    break ;

                    case "LA":
                    {
                        annotationTitle = L( 'baea_mode_section_landslide_title' ) ;
                    }
                    break ;

                    case "TS":
                    {
                        annotationTitle = L( 'baea_mode_section_tsunami_title' ) ;
                    }
                    break ;

                    case "LI":
                    {
                        annotationTitle = L( 'baea_mode_section_lifelines_title' ) ;
                    }
                    break ;

                    case "BU":
                    {
                        annotationTitle = L( 'baea_mode_section_buildings_title' ) ;
                    }
                    break ;

                    case "GE":
                    {
                        annotationTitle = L( 'baea_mode_section_general_title' ) ;
                    }
                    break ;
                }

                $.map.addAnnotation( Alloy.Globals.Map.createAnnotation(
                {
                    latitude: currentElem["LATITUDE"] ,
                    longitude: currentElem["LONGITUDE"] ,
                    pincolor: Alloy.Globals.Map.ANNOTATION_AZURE ,
                    image: '/images/pin-m-feature+00c.png' ,
                    title: annotationTitle ,
                    subtitle: currentElem['DATE'] + " UTC - " + L( 'generic_site_name_txt_hint' ) + ": " + currentElem['SITE'] + " - " + L( 'generated_created_by_text_msg' ) + " " + currentElem['OPERATOR']
                } ) ) ;
            }
        }
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    if( OS_IOS )
    {
        $.navigationWindowViewUsersLocationsView.open() ;
    }
    else
    {
        $.viewUsersLocationsViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}