function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppComboBox/" + s : s.substring(0, index) + "/com.diseg.AppComboBox/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0023,
    key: "lblAppComboBox",
    style: {
        left: 0,
        width: 80,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right"
    }
}, {
    isId: true,
    priority: 100000.0024,
    key: "widgetAppComboBox",
    style: {
        left: 90,
        right: 50,
        height: 50,
        width: Ti.UI.FILL,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        dropButton: {
            color: "black",
            selectedColor: "yellow",
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN
        }
    }
}, {
    isId: true,
    priority: 100000.0025,
    key: "btnAppComboBoxHelp",
    style: {
        right: 10,
        width: 32,
        title: "",
        height: 32,
        backgroundImage: "/images/help_normal.png",
        backgroundSelectedImage: "/images/help_pressed.png",
        backgroundDisabledImage: "/images/help_disabled.png"
    }
} ];