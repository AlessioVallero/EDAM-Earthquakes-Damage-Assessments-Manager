function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.PaintView/" + s : s.substring(0, index) + "/com.diseg.PaintView/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnStrokeColorRed_Click() {
        $.paint_view.strokeColor = "red";
    }
    function OnBtnStrokeColorBlue_Click() {
        $.paint_view.strokeColor = "#0000ff";
    }
    function OnBtnStrokeColorBlack_Click() {
        $.paint_view.strokeColor = "#000";
    }
    function OnBtnStrokeColorEraser_Click() {
        try {
            var bEraseMode = $.paint_view.eraseMode ? false : true;
            if (bEraseMode) {
                $.btnStrokeColorEraser.setBackgroundImage("/images/pen.png");
                $.lblStrokeColorEraser.setText(L("generic_draws_msg"));
            } else {
                $.btnStrokeColorEraser.setBackgroundImage("/images/rubber.png");
                $.lblStrokeColorEraser.setText(L("generic_erase_msg"));
            }
            $.paint_view.eraseMode = bEraseMode;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnStrokeTransparency_Click(e) {
        try {
            $.paint_view.strokeAlpha = 255 === $.paint_view.strokeAlpha ? 127 : 255;
            e.source.title = L(255 === $.paint_view.strokeAlpha ? "full_stroke_alpha_title" : "half_stroke_alpha_title");
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnStrokeWidth_Click(e) {
        try {
            $.paint_view.strokeWidth = 10 === $.paint_view.strokeWidth ? 5 : 10;
            e.source.title = L(10 === $.paint_view.strokeWidth ? "full_stroke_width_title" : "half_stroke_width_title");
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    new (require("alloy/widget"))("com.diseg.PaintView");
    this.__widgetId = "com.diseg.PaintView";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.paint_view_container = Ti.UI.createView({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        id: "paint_view_container"
    });
    $.__views.paint_view_container && $.addTopLevelView($.__views.paint_view_container);
    $.__views.images_btn_view = Ti.UI.createView({
        top: 20,
        width: 279,
        height: 155,
        id: "images_btn_view"
    });
    $.__views.paint_view_container.add($.__views.images_btn_view);
    $.__views.btnStrokeColorRed = Ti.UI.createButton({
        backgroundImage: "/images/red_normal.png",
        backgroundSelectedImage: "/images/red_pressed.png",
        backgroundDisabledImage: "/images/red_disabled.png",
        top: 88,
        left: 0,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnStrokeColorRed"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeColorRed);
    OnBtnStrokeColorRed_Click ? $.__views.btnStrokeColorRed.addEventListener("click", OnBtnStrokeColorRed_Click) : __defers["$.__views.btnStrokeColorRed!click!OnBtnStrokeColorRed_Click"] = true;
    $.__views.btnStrokeColorBlue = Ti.UI.createButton({
        backgroundImage: "/images/blue_normal.png",
        backgroundSelectedImage: "/images/blue_pressed.png",
        backgroundDisabledImage: "/images/blue_disabled.png",
        top: 88,
        left: 58,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnStrokeColorBlue"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeColorBlue);
    OnBtnStrokeColorBlue_Click ? $.__views.btnStrokeColorBlue.addEventListener("click", OnBtnStrokeColorBlue_Click) : __defers["$.__views.btnStrokeColorBlue!click!OnBtnStrokeColorBlue_Click"] = true;
    $.__views.btnStrokeColorBlack = Ti.UI.createButton({
        backgroundImage: "/images/black_normal.png",
        backgroundSelectedImage: "/images/black_pressed.png",
        backgroundDisabledImage: "/images/black_disabled.png",
        top: 88,
        left: 116,
        width: 48,
        height: 48,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "btnStrokeColorBlack"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeColorBlack);
    OnBtnStrokeColorBlack_Click ? $.__views.btnStrokeColorBlack.addEventListener("click", OnBtnStrokeColorBlack_Click) : __defers["$.__views.btnStrokeColorBlack!click!OnBtnStrokeColorBlack_Click"] = true;
    $.__views.btnStrokeColorEraser = Ti.UI.createButton({
        backgroundImage: "/images/rubber.png",
        top: 0,
        left: 0,
        width: 60,
        height: 60,
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        id: "btnStrokeColorEraser"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeColorEraser);
    OnBtnStrokeColorEraser_Click ? $.__views.btnStrokeColorEraser.addEventListener("click", OnBtnStrokeColorEraser_Click) : __defers["$.__views.btnStrokeColorEraser!click!OnBtnStrokeColorEraser_Click"] = true;
    $.__views.lblStrokeColorEraser = Ti.UI.createLabel({
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
        textAlign: "center",
        id: "lblStrokeColorEraser"
    });
    $.__views.images_btn_view.add($.__views.lblStrokeColorEraser);
    $.__views.viewAppButtonDone = Ti.UI.createView({
        top: 0,
        left: 82,
        width: 60,
        height: 84,
        id: "viewAppButtonDone"
    });
    $.__views.images_btn_view.add($.__views.viewAppButtonDone);
    $.__views.widgetAppButtonDone = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonDone",
        __parentSymbol: $.__views.viewAppButtonDone
    });
    $.__views.widgetAppButtonDone.setParent($.__views.viewAppButtonDone);
    $.__views.btnStrokeTransparency = Ti.UI.createButton({
        top: 0,
        left: 174,
        width: 115,
        height: 50,
        font: {
            fontSize: 11,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        backgroundColor: "#808080",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        title: L("full_stroke_alpha_title"),
        id: "btnStrokeTransparency"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeTransparency);
    OnBtnStrokeTransparency_Click ? $.__views.btnStrokeTransparency.addEventListener("click", OnBtnStrokeTransparency_Click) : __defers["$.__views.btnStrokeTransparency!click!OnBtnStrokeTransparency_Click"] = true;
    $.__views.btnStrokeWidth = Ti.UI.createButton({
        top: 60,
        left: 174,
        width: 115,
        height: 50,
        font: {
            fontSize: 11,
            fontFamily: "Arial",
            fontWeight: "bold"
        },
        backgroundColor: "#808080",
        textAlign: Titanium.UI.TEXT_ALIGNMENT_CENTER,
        verticalAlign: Titanium.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        title: L("full_stroke_width_title"),
        id: "btnStrokeWidth"
    });
    $.__views.images_btn_view.add($.__views.btnStrokeWidth);
    OnBtnStrokeWidth_Click ? $.__views.btnStrokeWidth.addEventListener("click", OnBtnStrokeWidth_Click) : __defers["$.__views.btnStrokeWidth!click!OnBtnStrokeWidth_Click"] = true;
    $.__views.paint_view = (require("ti.paint").createPaintView || Ti.UI.createPaintView)({
        backgroundColor: "#ffffff",
        top: 167,
        strokeAlpha: 255,
        strokeColor: "#000",
        strokeWidth: 10,
        eraseMode: false,
        id: "paint_view"
    });
    $.__views.paint_view_container.add($.__views.paint_view);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.init = function(on_btn_done_event_handler) {
        try {
            $.widgetAppButtonDone.init("/images/done_normal.png", "/images/done_pressed.png", "/images/done_disabled.png", L("generic_done_btn_title"), on_btn_done_event_handler);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_done_button = function() {
        return $.widgetAppButtonDone.get_button();
    };
    $.get_current_image = function(need_transparent_background) {
        var oldBackgroundColor = $.paint_view.getBackgroundColor();
        need_transparent_background && $.paint_view.setBackgroundColor("transparent");
        var ret_image = $.paint_view.toImage();
        need_transparent_background && $.paint_view.setBackgroundColor(oldBackgroundColor);
        return ret_image.media;
    };
    __defers["$.__views.btnStrokeColorRed!click!OnBtnStrokeColorRed_Click"] && $.__views.btnStrokeColorRed.addEventListener("click", OnBtnStrokeColorRed_Click);
    __defers["$.__views.btnStrokeColorBlue!click!OnBtnStrokeColorBlue_Click"] && $.__views.btnStrokeColorBlue.addEventListener("click", OnBtnStrokeColorBlue_Click);
    __defers["$.__views.btnStrokeColorBlack!click!OnBtnStrokeColorBlack_Click"] && $.__views.btnStrokeColorBlack.addEventListener("click", OnBtnStrokeColorBlack_Click);
    __defers["$.__views.btnStrokeColorEraser!click!OnBtnStrokeColorEraser_Click"] && $.__views.btnStrokeColorEraser.addEventListener("click", OnBtnStrokeColorEraser_Click);
    __defers["$.__views.btnStrokeTransparency!click!OnBtnStrokeTransparency_Click"] && $.__views.btnStrokeTransparency.addEventListener("click", OnBtnStrokeTransparency_Click);
    __defers["$.__views.btnStrokeWidth!click!OnBtnStrokeWidth_Click"] && $.__views.btnStrokeWidth.addEventListener("click", OnBtnStrokeWidth_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;