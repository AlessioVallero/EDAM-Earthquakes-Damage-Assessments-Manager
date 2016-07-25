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
    function PickerButtonClick(event) {
        if ("done" == event.source.id) {
            var selectedRow = $.picker.getSelectedRow(0);
            $.trigger("change", {
                source: $,
                type: "change",
                value: selectedRow.title,
                id: selectedRow.id
            });
        }
        $.trigger("done", {
            source: $,
            type: "done"
        });
        if (Alloy.isTablet) $.popover.hide({
            animated: true
        }); else {
            $.pickerview.animate({
                bottom: -Ti.Platform.displayCaps.platformHeight,
                duration: 500
            });
            $.parentView.remove($.pickerview);
        }
    }
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
    var __defers = {};
    if (true && Alloy.isTablet) {
        $.__views.popover = Ti.UI.iPad.createPopover({
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            id: "popover"
        });
        $.__views.popover && $.addTopLevelView($.__views.popover);
        $.__views.__alloyId1 = Ti.UI.createView({
            id: "__alloyId1"
        });
        $.__views.cancel = Ti.UI.createButton({
            top: 5,
            left: 5,
            width: Ti.UI.SIZE,
            height: 35,
            id: "cancel"
        });
        $.__views.__alloyId1.add($.__views.cancel);
        PickerButtonClick ? $.__views.cancel.addEventListener("click", PickerButtonClick) : __defers["$.__views.cancel!click!PickerButtonClick"] = true;
        $.__views.done = Ti.UI.createButton({
            top: 5,
            right: 5,
            width: Ti.UI.SIZE,
            height: 35,
            systemButton: Ti.UI.iPhone.SystemButton.DONE,
            id: "done"
        });
        $.__views.__alloyId1.add($.__views.done);
        PickerButtonClick ? $.__views.done.addEventListener("click", PickerButtonClick) : __defers["$.__views.done!click!PickerButtonClick"] = true;
        $.__views.pickerPopoverWrapper = Ti.UI.createView({
            top: 45,
            left: 0,
            width: Ti.UI.FILL,
            height: 215,
            id: "pickerPopoverWrapper"
        });
        $.__views.__alloyId1.add($.__views.pickerPopoverWrapper);
        $.__views.picker = Ti.UI.createPicker({
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 215,
            selectionIndicator: true,
            type: Ti.UI.PICKER_TYPE_PLAIN,
            id: "picker"
        });
        $.__views.pickerPopoverWrapper.add($.__views.picker);
        $.__views.popover.contentView = $.__views.__alloyId1;
    }
    if (true && !Alloy.isTablet) {
        $.__views.pickerview = Ti.UI.createView({
            right: 0,
            bottom: 0,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            layout: "vertical",
            backgroundColor: "#D1D1D1",
            id: "pickerview"
        });
        $.__views.pickerview && $.addTopLevelView($.__views.pickerview);
        $.__views.toolbar = Ti.UI.createView({
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 45,
            barColor: "#26688b",
            id: "toolbar"
        });
        $.__views.pickerview.add($.__views.toolbar);
        $.__views.cancel = Ti.UI.createButton({
            top: 5,
            left: 5,
            width: Ti.UI.SIZE,
            height: 35,
            id: "cancel"
        });
        $.__views.toolbar.add($.__views.cancel);
        PickerButtonClick ? $.__views.cancel.addEventListener("click", PickerButtonClick) : __defers["$.__views.cancel!click!PickerButtonClick"] = true;
        $.__views.done = Ti.UI.createButton({
            top: 5,
            right: 5,
            width: Ti.UI.SIZE,
            height: 35,
            systemButton: Ti.UI.iPhone.SystemButton.DONE,
            id: "done"
        });
        $.__views.toolbar.add($.__views.done);
        PickerButtonClick ? $.__views.done.addEventListener("click", PickerButtonClick) : __defers["$.__views.done!click!PickerButtonClick"] = true;
        $.__views.picker = Ti.UI.createPicker({
            top: 0,
            left: 0,
            width: Ti.UI.FILL,
            height: 215,
            selectionIndicator: true,
            type: Ti.UI.PICKER_TYPE_PLAIN,
            id: "picker"
        });
        $.__views.pickerview.add($.__views.picker);
    }
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
    true && Alloy.isTablet && __defers["$.__views.cancel!click!PickerButtonClick"] && $.__views.cancel.addEventListener("click", PickerButtonClick);
    true && Alloy.isTablet && __defers["$.__views.done!click!PickerButtonClick"] && $.__views.done.addEventListener("click", PickerButtonClick);
    true && !Alloy.isTablet && __defers["$.__views.cancel!click!PickerButtonClick"] && $.__views.cancel.addEventListener("click", PickerButtonClick);
    true && !Alloy.isTablet && __defers["$.__views.done!click!PickerButtonClick"] && $.__views.done.addEventListener("click", PickerButtonClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;