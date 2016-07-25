function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.orthlieb.combobox/" + s : s.substring(0, index) + "/com.orthlieb.combobox/" + s.substring(index + 1);
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
    function CreatePicker() {
        $.picker = Ti.UI.createPicker({
            left: 0,
            top: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.FILL,
            backgroundColor: "#808080"
        });
        $._choices && _.keys($._choices).length || ($._choices = {
            dg: {
                title: $.field.hintText || "Choose..."
            }
        });
        var i, rows = [], count = -1, selected = -1;
        for (i in $.choices) {
            $.choices[i].id = i;
            rows.push(Ti.UI.createPickerRow($.choices[i]));
            count++;
            $.id === i && (selected = count);
        }
        $.picker.add(rows);
        -1 != selected && $.picker.setSelectedRow(0, selected, true);
        var timeout = null;
        var defaultBottomValue = $.parentView.getBottom();
        $.picker.addEventListener("touchstart", function() {
            $.parentView.setBottom(50 * (count + 1));
            null != timeout && clearTimeout(timeout);
            timeout = setTimeout(function() {
                $.parentView.setBottom(defaultBottomValue);
            }, 1e4);
        });
        $.picker.addEventListener("change", function() {
            var selectedRow = $.picker.getSelectedRow(0);
            $.id = selectedRow.id;
            $.trigger("change", {
                source: $,
                type: "change",
                value: selectedRow.title,
                id: selectedRow.id
            });
        });
        $.field.add($.picker);
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
    $.__views.viewDisabler = Ti.UI.createView({
        left: 0,
        top: 0,
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1,
        id: "viewDisabler"
    });
    $.__views.viewDisabler && $.addTopLevelView($.__views.viewDisabler);
    $.__views.field = Ti.UI.createView({
        id: "field"
    });
    $.__views.field && $.addTopLevelView($.__views.field);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var defaults = {
        editable: false,
        rightButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS
    };
    var properties = [ "choices", "id", "parentView" ];
    var args = _.defaults(arguments[0], defaults);
    _.extend($.field, _.omit(args, properties));
    exports.init = function(parentView) {
        $.parentView = parentView || Alloy.Globals.mainWindow;
    };
    exports.enabled = function(enabled_value) {
        $.viewDisabler.visible = !enabled_value;
    };
    exports.setRight = function(right_value) {
        $.picker.setRight(right_value);
        $.field.setRight(right_value);
    };
    Object.defineProperty($, "id", {
        get: function() {
            return $._id;
        },
        set: function(id) {
            $._id = id;
            if ($.picker) {
                var i, count = -1, selected = -1;
                for (i in $.choices) {
                    count++;
                    $._id === i && (selected = count);
                }
                -1 != selected && $.picker.setSelectedRow(0, selected, true);
            }
        }
    });
    Object.defineProperty($, "choices", {
        get: function() {
            return $._choices;
        },
        set: function(choices) {
            $._choices = choices;
            $.picker && $.field.remove($.picker);
            $.picker = null;
            CreatePicker();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;