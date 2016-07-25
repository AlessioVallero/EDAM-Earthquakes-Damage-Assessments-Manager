function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.combobox/" + s : s.substring(0, index) + "/com.orthlieb.combobox/" + s.substring(index + 1);
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
    function ComboBoxClick() {
        if (!$.debounce && $.choices) {
            $.debounce = true;
            var pickerView = new (require("alloy/widgets/com.orthlieb.combobox/controllers/pickerview"))({
                choices: $.choices,
                id: $.id,
                title: $.field.hintText,
                parentField: $.field,
                parentView: $.parentView
            });
            pickerView.on("change", function(e) {
                $.id = e.id;
                $.trigger("change", {
                    source: $,
                    type: "change",
                    value: e.value,
                    id: e.id
                });
            });
            pickerView.on("done", function() {
                $.debounce = false;
            });
            pickerView.open();
        }
    }
    new (require("alloy/widget"))("com.orthlieb.combobox");
    this.__widgetId = "com.orthlieb.combobox";
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
    $.__views.container = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.field = Ti.UI.createTextField({
        left: 0,
        center: {
            y: "50%"
        },
        width: Ti.UI.FILL,
        id: "field"
    });
    $.__views.container.add($.__views.field);
    ComboBoxClick ? $.__views.field.addEventListener("click", ComboBoxClick) : __defers["$.__views.field!click!ComboBoxClick"] = true;
    $.__views.dropButton = Ti.UI.createButton({
        right: 0,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        title: "▼",
        backgroundColor: "transparent",
        id: "dropButton"
    });
    $.__views.container.add($.__views.dropButton);
    ComboBoxClick ? $.__views.dropButton.addEventListener("click", ComboBoxClick) : __defers["$.__views.dropButton!click!ComboBoxClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var defaults = {
        editable: false,
        rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS
    };
    var dimensions = [ "left", "top", "right", "bottom", "center", "width", "height" ];
    var properties = [ "choices", "id", "parentView" ];
    var args = _.defaults(arguments[0], defaults);
    _.extend($.field, _.chain(args).omit(properties).omit(dimensions).value());
    _.extend($.container, _.pick(args, dimensions));
    _.extend($.dropButton, args.dropButton);
    $.field.rightButton = $.dropButton;
    exports.init = function(parentView) {
        $.parentView = parentView || Alloy.Globals.mainWindow;
    };
    exports.enabled = function(enabled_value) {
        $.field.touchEnabled = enabled_value;
        $.dropButton.touchEnabled = enabled_value;
    };
    exports.setRight = function(right_value) {
        $.container.setRight(right_value);
    };
    Object.defineProperty($, "id", {
        get: function() {
            return $._id;
        },
        set: function(id) {
            $._id = id;
            $.field.value = $._id && $._choices && $._choices[$._id] ? $._choices[$._id].title : "";
        }
    });
    Object.defineProperty($, "choices", {
        get: function() {
            return $._choices;
        },
        set: function(choices) {
            $._choices = choices;
            $.field.value = $._id && $._choices && $._choices[$._id] ? $._choices[$._id].title : "";
        }
    });
    __defers["$.__views.field!click!ComboBoxClick"] && $.__views.field.addEventListener("click", ComboBoxClick);
    __defers["$.__views.dropButton!click!ComboBoxClick"] && $.__views.dropButton.addEventListener("click", ComboBoxClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;