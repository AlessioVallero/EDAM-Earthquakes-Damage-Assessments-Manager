var args = arguments[0] || {};
var current_image = args.image ;

// Back button click event handler
function OnBtnBack_Click( e )
{
    try
    {
        // On iOS devices, the NavigationWindow will be closed.
        // Instead on Android devices, the Window will be close
        if( OS_IOS )
        {
            $.navigationWindowViewDetailedEvaluationSketchView.close() ;
        }
        else
        {
            $.viewDetailedEvaluationSketchViewWindow.close() ;
        }
    }
    catch( exception )
    {
        Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
    }
}

try
{
    // Setting the DetailedEvaluationSketch image on the ImageView
    if( current_image )
    {
        $.image_view_detailed_evaluation_sketch.setImage( current_image ) ;
    }

    // On iOS devices will be opened the NavigationWindow, on Android will be opened the Window instead
    // Also the top margin of the TableView must be different depending on the device type
    if( OS_IOS )
    {
        $.navigationWindowViewDetailedEvaluationSketchView.open() ;
    }
    else
    {
        $.viewDetailedEvaluationSketchViewWindow.open() ;
    }
}
catch( exception )
{
    Alloy.Globals.AlertUserAndLogAsync( L( 'generic_exception_msg' ) + exception.message ) ;
}
