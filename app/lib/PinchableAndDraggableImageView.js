function PinchableAndDraggableImageView( currentPic )
{
    var currentX = 0 ;               // Current left position of the image
    var currentY = 0 ;               // Current top position of the image
    var currentImageWidth = 200 ;
    var currentImageHeight = 200 ;
    var bIsAnimatingMoving = false ; // If the user is moving the image (with an animation)
    var bIsPinching = false ;        // If the user is pinching the image
    var default_zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex ;
    var touched_zIndex = Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex ;

    var image = Ti.UI.createImageView(
    {
        top: 10 ,
        left: 10 ,
        borderColor: "#000000" ,
        borderWidth: 0 ,
        width: currentImageWidth ,
        height: currentImageHeight ,
        image: currentPic ,
        defaultImage: "/images/img_not_found.png" ,
        zIndex: default_zIndex
    } ) ;

    // Support array, because animation does not update really the top and left position values (see official docs for details)
    var imagePosition =
    {
        top: image.top ,
        left: image.left
    } ;

    var borderEnabled = false ;
    image.addEventListener( 'longpress' , function( e )
    {
        // If the border is enabled then must be disabled
        if( borderEnabled )
        {
            borderEnabled = false ;
            image.borderWidth = 0 ;
            image.borderColor = "#000000" ; // Black
        }
        // If the border is disabled then must be enabled
        else
        {
            borderEnabled = true ;
            image.borderWidth = 3 ;
            image.borderColor = "blue" ;
        }
    } ) ;

    image.addEventListener( 'touchstart' , function( e )
    {
        // Set the initials values at the beginning of the touch operations
        currentX = e.x ;
        currentY = e.y ;
        currentImageHeight = image.height ;
        currentImageWidth = image.width ;
        // The Z-Index of the touched PinchableAndDraggableImageView must be higher than any other PinchableAndDraggableImageView Z-Index
        image.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex ;
    } ) ;
    image.addEventListener( 'pinch' , function( e )
    {
        bIsPinching = true ;

        // Pinching the image
        image.height = currentImageHeight * e.scale ;
        image.width = currentImageWidth * e.scale ;
    } ) ;
    image.addEventListener( 'touchmove' , function( e )
    {
        // if we are not here because of a pinching
        if( !bIsPinching )
        {
            // Updating the support array
            imagePosition.top += e.y - currentY ; 
            imagePosition.left += e.x - currentX ;

            // If we are performing an animation, it's useless to make another animation
            if( !bIsAnimatingMoving )
            {
                bIsAnimatingMoving = true ;
                image.animate(
                {
                    top: imagePosition.top, 
                    left: imagePosition.left,
                    duration: 50 // Milliseconds
                } , function( e ) // Callback at the end of the animation
                {
                    bIsAnimatingMoving = false ;
                } ) ;
            }
            // Updating the current left and top position of the image, for the next touchmove events before the touchend
            currentX = e.x ;
            currentY = e.y ;
        }
    } ) ;
    image.addEventListener( 'touchend' , function( e )
    {
        currentX = 0 ;
        currentY = 0 ;

        Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex++ ;
        Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex++ ;

        // The Z-Index return "normal"
        image.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex ;

        // We are not pinching anymore
        bIsPinching = false ;
    } ) ;

    return image ;
}

module.exports = PinchableAndDraggableImageView ;