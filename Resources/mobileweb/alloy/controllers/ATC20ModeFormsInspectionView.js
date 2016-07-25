function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnDate_Change() {
        var current_date = $.datePickerDate.getValue();
        var current_time = $.timePickerTime.getValue();
        Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse(new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate(), current_time.getHours(), current_time.getMinutes(), current_time.getSeconds()));
    }
    function OnTime_Change() {
        var current_date = $.datePickerDate.getValue();
        var current_time = $.timePickerTime.getValue();
        Alloy.Globals.ATC20ModeInspection["DATE"] = Date.parse(new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate(), current_time.getHours(), current_time.getMinutes(), current_time.getSeconds()));
    }
    function OnAreasInspected_Change(e) {
        Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] = e.id;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ATC20ModeFormsInspectionView";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.atc20ModeFormsInspectionWindow = Ti.UI.createWindow({
        title: L("atc20_mode_form_inspection_view_title"),
        backgroundColor: "#ffffcc",
        id: "atc20ModeFormsInspectionWindow"
    });
    $.__views.atc20ModeFormsInspectionWindow && $.addTopLevelView($.__views.atc20ModeFormsInspectionWindow);
    $.__views.viewDate = Ti.UI.createView({
        top: 10,
        left: 0,
        right: 10,
        height: 100,
        id: "viewDate"
    });
    $.__views.atc20ModeFormsInspectionWindow.add($.__views.viewDate);
    $.__views.lblDate = Ti.UI.createLabel({
        text: L("generic_date_text_msg"),
        left: 0,
        width: 50,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblDate"
    });
    $.__views.viewDate.add($.__views.lblDate);
    $.__views.viewDisablerDate = Ti.UI.createView({
        left: 60,
        right: 10,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1,
        id: "viewDisablerDate"
    });
    $.__views.viewDate.add($.__views.viewDisablerDate);
    $.__views.datePickerDate = Ti.UI.createPicker({
        left: 60,
        right: 10,
        type: Titanium.UI.PICKER_TYPE_DATE,
        selectionIndicator: true,
        useSpinner: true,
        id: "datePickerDate"
    });
    $.__views.viewDate.add($.__views.datePickerDate);
    OnDate_Change ? $.__views.datePickerDate.addEventListener("change", OnDate_Change) : __defers["$.__views.datePickerDate!change!OnDate_Change"] = true;
    $.__views.viewTime = Ti.UI.createView({
        top: 120,
        left: 0,
        right: 10,
        height: 100,
        id: "viewTime"
    });
    $.__views.atc20ModeFormsInspectionWindow.add($.__views.viewTime);
    $.__views.lblTime = Ti.UI.createLabel({
        text: L("generic_time_text_msg"),
        left: 0,
        width: 50,
        height: 50,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        textAlign: "right",
        id: "lblTime"
    });
    $.__views.viewTime.add($.__views.lblTime);
    $.__views.viewDisablerTime = Ti.UI.createView({
        left: 60,
        right: 10,
        borderColor: "transparent",
        backgroundColor: "transparent",
        zIndex: 1,
        id: "viewDisablerTime"
    });
    $.__views.viewTime.add($.__views.viewDisablerTime);
    $.__views.timePickerTime = Ti.UI.createPicker({
        left: 60,
        right: 10,
        type: Titanium.UI.PICKER_TYPE_TIME,
        format24: false,
        selectionIndicator: true,
        useSpinner: true,
        id: "timePickerTime"
    });
    $.__views.viewTime.add($.__views.timePickerTime);
    OnTime_Change ? $.__views.timePickerTime.addEventListener("change", OnTime_Change) : __defers["$.__views.timePickerTime!change!OnTime_Change"] = true;
    $.__views.viewAreasInspectedWrapper = Ti.UI.createView({
        top: 230,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 10,
        id: "viewAreasInspectedWrapper"
    });
    $.__views.atc20ModeFormsInspectionWindow.add($.__views.viewAreasInspectedWrapper);
    $.__views.viewAreasInspected = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAreasInspected"
    });
    $.__views.viewAreasInspectedWrapper.add($.__views.viewAreasInspected);
    $.__views.widgetAppComboBoxATC20ModeInspectionAreasInspected = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxATC20ModeInspectionAreasInspected",
        __parentSymbol: $.__views.viewAreasInspected
    });
    $.__views.widgetAppComboBoxATC20ModeInspectionAreasInspected.setParent($.__views.viewAreasInspected);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var current_atc20_type = args.atc20_type;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        if ("0" == current_atc20_type) {
            $.viewAreasInspectedWrapper.remove($.viewAreasInspected);
            $.viewAreasInspected = null;
        } else {
            var areasInspectedParentView = null;
            areasInspectedParentView = $.viewAreasInspected;
            var areasInspectedValues = {
                0: {
                    title: L("generic_exterior_only_text_msg")
                },
                1: {
                    title: L("generic_exterior_and_interior_text_msg")
                }
            };
            $.widgetAppComboBoxATC20ModeInspectionAreasInspected.init(L("generic_areas_inspected_text_msg"), areasInspectedValues, OnAreasInspected_Change, null, areasInspectedParentView);
            $.widgetAppComboBoxATC20ModeInspectionAreasInspected.enabled(view_enabled);
            Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"] && $.widgetAppComboBoxATC20ModeInspectionAreasInspected.set_selected_index(Alloy.Globals.ATC20ModeInspection["AREAS_INSPECTED"]);
        }
        var saved_date;
        $.viewDisablerDate.setHeight($.datePickerDate.getHeight());
        $.viewDisablerDate.visible = !view_enabled;
        $.viewDisablerTime.setHeight($.timePickerTime.getHeight());
        $.viewDisablerTime.visible = !view_enabled;
        if (Alloy.Globals.ATC20ModeInspection["DATE"]) {
            var saved_date = new Date();
            saved_date.setTime(Alloy.Globals.ATC20ModeInspection["DATE"]);
            $.datePickerDate.setValue(saved_date);
            $.timePickerTime.setValue(saved_date);
        }
        $.atc20ModeFormsInspectionWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.datePickerDate!change!OnDate_Change"] && $.__views.datePickerDate.addEventListener("change", OnDate_Change);
    __defers["$.__views.timePickerTime!change!OnTime_Change"] && $.__views.timePickerTime.addEventListener("change", OnTime_Change);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;