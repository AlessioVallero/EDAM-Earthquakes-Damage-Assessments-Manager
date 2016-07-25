function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.PaintView/" + s : s.substring(0, index) + "/com.diseg.PaintView/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isId: true,
    priority: 100000.0002,
    key: "paint_view_container",
    style: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}, {
    isId: true,
    priority: 100000.0003,
    key: "images_btn_view",
    style: {
        top: 20,
        width: 279,
        height: 155
    }
}, {
    isId: true,
    priority: 100000.0004,
    key: "btnStrokeColorEraser",
    style: {
        backgroundImage: "/images/rubber.png",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4
    }
}, {
    isId: true,
    priority: 100000.0005,
    key: "lblStrokeColorEraser",
    style: {
        text: L("generic_erase_msg"),
        top: 60,
        left: 0,
        width: 60,
        height: 25,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "11"
        },
        color: "#000",
        textAlign: "center"
    }
}, {
    isId: true,
    priority: 100000.0006,
    key: "viewAppButtonDone",
    style: {
        top: 0,
        left: 82,
        width: 60,
        height: 84
    }
}, {
    isId: true,
    priority: 100000.0007,
    key: "btnStrokeColorRed",
    style: {
        backgroundImage: "/images/red_normal.png",
        backgroundSelectedImage: "/images/red_pressed.png",
        backgroundDisabledImage: "/images/red_disabled.png",
        top: 88,
        left: 0,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    }
}, {
    isId: true,
    priority: 100000.0008,
    key: "btnStrokeColorBlue",
    style: {
        backgroundImage: "/images/blue_normal.png",
        backgroundSelectedImage: "/images/blue_pressed.png",
        backgroundDisabledImage: "/images/blue_disabled.png",
        top: 88,
        left: 58,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    }
}, {
    isId: true,
    priority: 100000.0009,
    key: "btnStrokeColorBlack",
    style: {
        backgroundImage: "/images/black_normal.png",
        backgroundSelectedImage: "/images/black_pressed.png",
        backgroundDisabledImage: "/images/black_disabled.png",
        top: 88,
        left: 116,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
    }
}, {
    isId: true,
    priority: 100000.0014,
    key: "paint_view",
    style: {
        backgroundColor: "#ffffff",
        top: 167,
        strokeAlpha: 255,
        strokeColor: "#000",
        strokeWidth: 10,
        eraseMode: false
    }
}, {
    isId: true,
    priority: 100101.001,
    key: "btnStrokeTransparency",
    style: {
        top: 0,
        left: 174,
        width: 108,
        height: 50,
        font: {
            fontSize: 11,
            fontFamily: "Arial"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        title: L("full_stroke_alpha_title")
    }
}, {
    isId: true,
    priority: 100101.0012,
    key: "btnStrokeWidth",
    style: {
        top: 60,
        left: 174,
        width: 115,
        height: 50,
        font: {
            fontSize: 11,
            fontFamily: "Arial"
        },
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        title: L("full_stroke_width_title")
    }
} ];