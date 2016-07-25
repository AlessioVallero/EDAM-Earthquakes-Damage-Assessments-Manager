function SliderProgressBar(progressTitle) {
    var progressMessage = "";
    progressTitle && (progressMessage = progressTitle);
    var conf = {
        top: 150,
        left: 0,
        width: "100%",
        height: 50,
        min: 0,
        max: 100,
        value: 0,
        message: progressMessage,
        shadowColor: "#555",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Helvetica Neue"
        },
        color: "#fff",
        textAlign: "center",
        borderColor: "transparent",
        backgroundColor: "transparent",
        thumbImage: "/images/transparent_pixel.png"
    };
    var view = Ti.UI.createView(conf);
    conf.top = 0;
    conf.left = 0;
    var slider = Ti.UI.createSlider(conf);
    view.slider = slider;
    conf.text = slider.message + parseInt(slider.value) + "%";
    var label = Ti.UI.createLabel(conf);
    slider.label = label;
    slider.addEventListener("change", function(e) {
        var sl = e.source;
        sl.label.text = sl.message + parseInt(sl.value) + "%";
    });
    view.add(slider);
    view.add(label);
    view.setValue = function(val) {
        view.slider.value = val;
    };
    view.getValue = function() {
        return view.slider.value;
    };
    return view;
}

module.exports = SliderProgressBar;