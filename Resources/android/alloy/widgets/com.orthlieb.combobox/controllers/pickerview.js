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
    new (require("alloy/widget"))("com.orthlieb.combobox");
    this.__widgetId = "com.orthlieb.combobox";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pickerview";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var choices = arguments[0].choices, id = arguments[0].id;
    $.title = arguments[0].title;
    $.parentField = arguments[0].parentField;
    $.parentView = arguments[0].parentView;
    $.cancel.setTitle(L("generic_cancel_btn_title"));
    $.done.setTitle(L("generic_done_btn_title"));
    var i, rows = [], count = -1, selected = -1;
    for (i in choices) {
        choices[i].id = i;
        rows.push(Ti.UI.createPickerRow(choices[i]));
        if (id) {
            count++;
            id === i && (selected = count);
        }
    }
    $.picker.add(rows);
    if (Alloy.isTablet) {
        $.popover.title = $.title;
        $.popover.width = .5 * Ti.Platform.displayCaps.platformHeight;
    } else $.pickerview.bottom = -Ti.Platform.displayCaps.platformHeight;
    -1 != selected && $.picker.setSelectedRow(0, selected, true);
    exports.open = function() {
        if (Alloy.isTablet) $.popover.show({
            animated: true,
            view: $.parentField
        }); else {
            $.parentView.add($.pickerview);
            $.pickerview.animate({
                bottom: 0,
                duration: 500
            });
        }
        $.picker.selectionIndicator = true;
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;