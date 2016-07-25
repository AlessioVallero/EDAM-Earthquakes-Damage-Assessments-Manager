function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppButton/" + s : s.substring(0, index) + "/com.diseg.AppButton/" + s.substring(index + 1);
    return path;
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
    new (require("alloy/widget"))("com.diseg.AppButton");
    this.__widgetId = "com.diseg.AppButton";
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
    $.__views.btnAppButton = Ti.UI.createButton({
        top: 0,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        borderRadius: 4,
        height: 60,
        width: 60,
        id: "btnAppButton"
    });
    $.__views.btnAppButton && $.addTopLevelView($.__views.btnAppButton);
    $.__views.lblAppButton = Ti.UI.createLabel({
        top: 60,
        width: 60,
        height: 28,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "11"
        },
        color: "#000",
        textAlign: "center",
        id: "lblAppButton"
    });
    $.__views.lblAppButton && $.addTopLevelView($.__views.lblAppButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.init = function(btn_background_image_path, btn_background_pressed_image_path, btn_background_disabled_image_path, lbl_text, on_btn_click_function) {
        try {
            $.btnAppButton.setBackgroundImage(btn_background_image_path);
            $.btnAppButton.setBackgroundSelectedImage(btn_background_pressed_image_path);
            $.btnAppButton.setBackgroundDisabledImage(btn_background_disabled_image_path);
            $.lblAppButton.setText(lbl_text);
            $.btnAppButton.addEventListener("click", on_btn_click_function);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_height = function(label_height) {
        try {
            $.lblAppButton.height = label_height;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_text = function(label_text) {
        try {
            $.lblAppButton.setText(label_text);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_button = function() {
        return $.btnAppButton;
    };
    $.enabled = function(enabled) {
        try {
            $.btnAppButton.enabled = enabled;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;