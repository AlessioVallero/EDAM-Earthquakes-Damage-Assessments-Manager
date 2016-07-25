function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnBack_Click() {
        try {
            $.navigationWindowLandslideAreaAffected.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnLessThanTen_Change() {
        try {
            current_area_affected = Alloy.Globals.replaceCharAt(0, current_area_affected, $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.get_value());
            Ti.App.fireEvent("baea_mode_landslide:area_affected_changed", {
                value: current_area_affected
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTenToHundred_Change() {
        try {
            current_area_affected = Alloy.Globals.replaceCharAt(1, current_area_affected, $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.get_value());
            Ti.App.fireEvent("baea_mode_landslide:area_affected_changed", {
                value: current_area_affected
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnHundredToThousand_Change() {
        try {
            current_area_affected = Alloy.Globals.replaceCharAt(2, current_area_affected, $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.get_value());
            Ti.App.fireEvent("baea_mode_landslide:area_affected_changed", {
                value: current_area_affected
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnThousandToTenThousand_Change() {
        try {
            current_area_affected = Alloy.Globals.replaceCharAt(3, current_area_affected, $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.get_value());
            Ti.App.fireEvent("baea_mode_landslide:area_affected_changed", {
                value: current_area_affected
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnGreaterThanTenThousand_Change() {
        try {
            current_area_affected = Alloy.Globals.replaceCharAt(4, current_area_affected, $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.get_value());
            Ti.App.fireEvent("baea_mode_landslide:area_affected_changed", {
                value: current_area_affected
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLandslideAreaAffectedView";
    this.args = arguments[0] || {};
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
    $.__views.baeaModeLandslideAreaAffectedWindow = Ti.UI.createWindow({
        title: L("baea_mode_landslide_area_affected_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLandslideAreaAffectedWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeLandslideAreaAffectedWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewLandslideAreaAffected = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLandslideAreaAffected"
    });
    $.__views.baeaModeLandslideAreaAffectedWindow.add($.__views.scrollViewLandslideAreaAffected);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen"
    });
    $.__views.scrollViewLandslideAreaAffected.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred"
    });
    $.__views.scrollViewLandslideAreaAffected.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand"
    });
    $.__views.scrollViewLandslideAreaAffected.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand"
    });
    $.__views.scrollViewLandslideAreaAffected.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand = Ti.UI.createView({
        top: 280,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand"
    });
    $.__views.scrollViewLandslideAreaAffected.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand);
    $.__views.navigationWindowLandslideAreaAffected = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeLandslideAreaAffectedWindow,
        id: "navigationWindowLandslideAreaAffected"
    });
    $.__views.navigationWindowLandslideAreaAffected && $.addTopLevelView($.__views.navigationWindowLandslideAreaAffected);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_area_affected = args.area_affected;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.init("<10", current_area_affected.charAt(0), OnLessThanTen_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedLessThanTen.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.init("10-100", current_area_affected.charAt(1), OnTenToHundred_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedTenToHundred.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.init("100-1000", current_area_affected.charAt(2), OnHundredToThousand_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedHundredToThousand.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.init("1000-10000", current_area_affected.charAt(3), OnThousandToTenThousand_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedThousandToTenThousand.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.init(">10000", current_area_affected.charAt(4), OnGreaterThanTenThousand_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideAreaAffectedGreaterThanTenThousand.enabled(view_enabled);
        $.navigationWindowLandslideAreaAffected.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;