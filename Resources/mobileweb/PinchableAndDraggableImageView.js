function PinchableAndDraggableImageView(currentPic) {
    var currentX = 0;
    var currentY = 0;
    var currentImageWidth = 200;
    var currentImageHeight = 200;
    var bIsAnimatingMoving = false;
    var bIsPinching = false;
    var default_zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex;
    Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex;
    var image = Ti.UI.createImageView({
        top: 10,
        left: 10,
        borderColor: "#000000",
        borderWidth: 0,
        width: currentImageWidth,
        height: currentImageHeight,
        image: currentPic,
        defaultImage: "/images/img_not_found.png",
        zIndex: default_zIndex
    });
    var imagePosition = {
        top: image.top,
        left: image.left
    };
    var borderEnabled = false;
    image.addEventListener("longpress", function() {
        if (borderEnabled) {
            borderEnabled = false;
            image.borderWidth = 0;
            image.borderColor = "#000000";
        } else {
            borderEnabled = true;
            image.borderWidth = 3;
            image.borderColor = "blue";
        }
    });
    image.addEventListener("touchstart", function(e) {
        currentX = e.x;
        currentY = e.y;
        currentImageHeight = image.height;
        currentImageWidth = image.width;
        image.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex;
    });
    image.addEventListener("pinch", function(e) {
        bIsPinching = true;
        image.height = currentImageHeight * e.scale;
        image.width = currentImageWidth * e.scale;
    });
    image.addEventListener("touchmove", function(e) {
        if (!bIsPinching) {
            imagePosition.top += e.y - currentY;
            imagePosition.left += e.x - currentX;
            if (!bIsAnimatingMoving) {
                bIsAnimatingMoving = true;
                image.animate({
                    top: imagePosition.top,
                    left: imagePosition.left,
                    duration: 50
                }, function() {
                    bIsAnimatingMoving = false;
                });
            }
            currentX = e.x;
            currentY = e.y;
        }
    });
    image.addEventListener("touchend", function() {
        currentX = 0;
        currentY = 0;
        Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex++;
        Alloy.Globals.PinchableAndDraggableImageView_Touched_zIndex++;
        image.zIndex = Alloy.Globals.PinchableAndDraggableImageView_Default_zIndex;
        bIsPinching = false;
    });
    return image;
}

module.exports = PinchableAndDraggableImageView;