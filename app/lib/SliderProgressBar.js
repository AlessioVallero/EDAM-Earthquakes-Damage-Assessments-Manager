function SliderProgressBar( progressTitle )
{   
    var progressMessage = "" ;
    if( progressTitle )
    {
        progressMessage = progressTitle ;
    }
    // Some default settings
    var conf =
    {
        top: 150 ,
        left: 0 ,
        width: "100%" ,
        height: 50 ,
        min: 0 ,
        max: 100 ,
        value: 0 ,
        message: progressMessage ,
        shadowColor: '#555' ,
        shadowOffset:
        {
            x: 1 ,
            y: 1
        } ,
        font:
        {
            fontSize: 20 ,
            fontWeight: 'bold' ,
            fontFamily: 'Helvetica Neue'
        } ,
        color: '#fff' ,
        textAlign: "center" ,
        borderColor: "transparent" ,
        backgroundColor: "transparent" ,
        //use file as tracker image, to hide it
        thumbImage: '/images/transparent_pixel.png'
    } ;

    // Create view as container
    var view = Ti.UI.createView( conf ) ;

    // Resetting position inside view
    conf.top = 0 ;
    conf.left = 0 ;

    // Create slider
    var slider = Ti.UI.createSlider( conf ) ;
    view.slider = slider ;

    // Adding text to label
    conf.text = slider.message + parseInt( slider.value ) + "%" ;

    // Create label
    var label = Ti.UI.createLabel( conf ) ;
    slider.label = label ;

    // Update label on event listener
    slider.addEventListener( "change" , function( e )
    {
        // Updating label
        var sl = e.source ;
        sl.label.text = sl.message + parseInt( sl.value ) + "%" ;
    } ) ;

    // Adding everything to view
    view.add( slider ) ;
    view.add( label ) ;

    // Set function to update value
    view.setValue = function( val )
    {
        view.slider.value = val ;
    } ;

    // Set function to update value
    view.getValue = function()
    {
        return view.slider.value ;
    } ;

    // Returning view
    return view ;
}

module.exports = SliderProgressBar ;
