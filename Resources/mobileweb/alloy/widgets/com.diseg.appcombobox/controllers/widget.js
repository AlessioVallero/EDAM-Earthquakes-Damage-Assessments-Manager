function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.diseg.AppComboBox/" + s : s.substring(0, index) + "/com.diseg.AppComboBox/" + s.substring(index + 1);
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
    function OnBtnHelp_Click() {
        try {
            if (help && help.length > 0) {
                var current_selected_index = $.get_selected_index();
                -1 != current_selected_index && help.length > current_selected_index && Alloy.createController("ViewHelpView", {
                    image: help[current_selected_index],
                    title: rows[current_selected_index].title
                }).getView().open();
            }
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    }
    new (require("alloy/widget"))("com.diseg.AppComboBox");
    this.__widgetId = "com.diseg.AppComboBox";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.lblAppComboBox = Ti.UI.createLabel({
        left: 0,
        width: 80,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblAppComboBox"
    });
    $.__views.lblAppComboBox && $.addTopLevelView($.__views.lblAppComboBox);
    $.__views.widgetAppComboBox = Alloy.createWidget("com.orthlieb.combobox", "widget", {
        left: 90,
        right: 50,
        height: 50,
        width: Ti.UI.FILL,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        dropButton: {
            color: "black",
            selectedColor: "yellow",
            style: Ti.UI.iPhone.SystemButtonStyle.PLAIN
        },
        id: "widgetAppComboBox",
        __parentSymbol: __parentSymbol
    });
    $.__views.widgetAppComboBox && $.addTopLevelView($.__views.widgetAppComboBox);
    $.__views.btnAppComboBoxHelp = Ti.UI.createButton({
        right: 10,
        width: 32,
        title: "",
        height: 32,
        backgroundImage: "/images/help_normal.png",
        backgroundSelectedImage: "/images/help_pressed.png",
        backgroundDisabledImage: "/images/help_disabled.png",
        id: "btnAppComboBoxHelp"
    });
    $.__views.btnAppComboBoxHelp && $.addTopLevelView($.__views.btnAppComboBoxHelp);
    OnBtnHelp_Click ? $.__views.btnAppComboBoxHelp.addEventListener("click", OnBtnHelp_Click) : __defers["$.__views.btnAppComboBoxHelp!click!OnBtnHelp_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var rows = null;
    var help = null;
    $.init = function(lbl_text, array_rows, on_combobox_change, array_help, current_view) {
        try {
            $.lblAppComboBox.setText(lbl_text);
            rows = array_rows;
            $.widgetAppComboBox.init(current_view);
            $.widgetAppComboBox.choices = rows;
            on_combobox_change && $.widgetAppComboBox.on("change", on_combobox_change);
            if (array_help && array_help.length > 0) help = array_help; else {
                $.btnAppComboBoxHelp.visible = false;
                $.widgetAppComboBox.setRight(10);
            }
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.get_selected_index = function() {
        var ret_index = -1;
        try {
            ret_index = $.widgetAppComboBox.id;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
        return ret_index;
    };
    $.set_selected_index = function(selected_index) {
        try {
            $.widgetAppComboBox.id = selected_index;
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.set_label_height = function(new_height) {
        try {
            $.lblAppComboBox.setHeight(new_height);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    $.enabled = function(enabled) {
        try {
            $.widgetAppComboBox.enabled(enabled);
        } catch (exception) {
            alert(L("generic_exception_msg") + exception.message);
        }
    };
    __defers["$.__views.btnAppComboBoxHelp!click!OnBtnHelp_Click"] && $.__views.btnAppComboBoxHelp.addEventListener("click", OnBtnHelp_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;