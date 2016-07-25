function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppCheckBox/" + s : s.substring(0, index) + "/com.diseg.AppCheckBox/" + s.substring(index + 1);
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
    function OnBtnHelp_Click() {
        try {
            help && Alloy.createController("ViewHelpView", {
                image: help,
                title: $.lblAppCheckBox.getText()
            }).getView().open();
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    new (require("alloy/widget"))("com.diseg.AppCheckBox");
    this.__widgetId = "com.diseg.AppCheckBox";
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
    $.__views.lblAppCheckBox = Ti.UI.createLabel({
        left: 0,
        width: 165,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblAppCheckBox"
    });
    $.__views.lblAppCheckBox && $.addTopLevelView($.__views.lblAppCheckBox);
    $.__views.btnAppCheckBoxHelp = Ti.UI.createButton({
        left: 167,
        width: 32,
        title: "",
        height: 32,
        backgroundImage: "/images/help_normal.png",
        backgroundSelectedImage: "/images/help_pressed.png",
        backgroundDisabledImage: "/images/help_disabled.png",
        id: "btnAppCheckBoxHelp"
    });
    $.__views.btnAppCheckBoxHelp && $.addTopLevelView($.__views.btnAppCheckBoxHelp);
    OnBtnHelp_Click ? $.__views.btnAppCheckBoxHelp.addEventListener("click", OnBtnHelp_Click) : __defers["$.__views.btnAppCheckBoxHelp!click!OnBtnHelp_Click"] = true;
    $.__views.cbAppCheckBox = Ti.UI.createButton({
        left: 207,
        width: 30,
        title: "",
        height: 30,
        borderColor: "#666",
        borderWidth: 2,
        borderRadius: 3,
        backgroundColor: "#aaa",
        backgroundImage: "none",
        color: "#fff",
        font: {
            fontSize: 22,
            fontWeight: "bold"
        },
        value: "0",
        id: "cbAppCheckBox"
    });
    $.__views.cbAppCheckBox && $.addTopLevelView($.__views.cbAppCheckBox);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var help = null;
    $.init = function(lbl_text, cb_value, on_checkbox_click, elem_help) {
        try {
            $.lblAppCheckBox.setText(lbl_text);
            "1" == cb_value ? $.cbAppCheckBox.on() : $.cbAppCheckBox.off();
            on_checkbox_click && $.cbAppCheckBox.addEventListener("click", on_checkbox_click);
            if (elem_help) help = elem_help; else {
                $.btnAppCheckBoxHelp.visible = false;
                $.cbAppCheckBox.setLeft($.btnAppCheckBoxHelp.getLeft());
            }
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_value = function() {
        var ret_value = false;
        try {
            ret_value = $.cbAppCheckBox.value;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
        return ret_value;
    };
    $.set_value = function(new_value) {
        try {
            "1" == new_value ? $.cbAppCheckBox.off() : $.cbAppCheckBox.on();
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_height = function(new_height) {
        try {
            $.lblAppCheckBox.setHeight(new_height);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.cbAppCheckBox.on = function() {
        this.backgroundColor = "#007690";
        this.title = "✓";
        this.value = "1";
    };
    $.cbAppCheckBox.off = function() {
        this.backgroundColor = "#aaa";
        this.title = "";
        this.value = "0";
    };
    $.cbAppCheckBox.addEventListener("click", function(e) {
        "0" == e.source.value ? e.source.on() : e.source.off();
    });
    $.enabled = function(enabled) {
        try {
            $.cbAppCheckBox.enabled = enabled;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    __defers["$.__views.btnAppCheckBoxHelp!click!OnBtnHelp_Click"] && $.__views.btnAppCheckBoxHelp.addEventListener("click", OnBtnHelp_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;