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
            $.navigationWindowLifelinesOther.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnWaterWastewater_Change() {
        try {
            current_other = Alloy.Globals.replaceCharAt(0, current_other, $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:other_changed", {
                value: current_other
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnGasAndFuelLines_Change() {
        try {
            current_other = Alloy.Globals.replaceCharAt(1, current_other, $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:other_changed", {
                value: current_other
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTransportation_Change() {
        try {
            current_other = Alloy.Globals.replaceCharAt(2, current_other, $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:other_changed", {
                value: current_other
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change() {
        try {
            current_other = Alloy.Globals.replaceCharAt(3, current_other, $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:other_changed", {
                value: current_other
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLifelinesOtherView";
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
    $.__views.baeaModeLifelinesOtherWindow = Ti.UI.createWindow({
        title: L("baea_mode_lifelines_other_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLifelinesOtherWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeLifelinesOtherWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewLifelinesOther = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLifelinesOther"
    });
    $.__views.baeaModeLifelinesOtherWindow.add($.__views.scrollViewLifelinesOther);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater"
    });
    $.__views.scrollViewLifelinesOther.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines"
    });
    $.__views.scrollViewLifelinesOther.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherTransportation = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesOtherTransportation"
    });
    $.__views.scrollViewLifelinesOther.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherTransportation);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherTransportation
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherTransportation);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherOther = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesOtherOther"
    });
    $.__views.scrollViewLifelinesOther.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherOther);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherOther
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesOtherOther);
    $.__views.navigationWindowLifelinesOther = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeLifelinesOtherWindow,
        id: "navigationWindowLifelinesOther"
    });
    $.__views.navigationWindowLifelinesOther && $.addTopLevelView($.__views.navigationWindowLifelinesOther);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_other = args.other;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.init(L("generic_water_wastewater_text_msg"), current_other.charAt(0), OnWaterWastewater_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherWaterWastewater.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.init(L("generic_gas_and_fuel_lines_text_msg"), current_other.charAt(1), OnGasAndFuelLines_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherGasAndFuelLines.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.init(L("generic_transportation_text_msg"), current_other.charAt(2), OnTransportation_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherTransportation.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.init(L("generic_other_text_msg"), current_other.charAt(3), OnOther_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesOtherOther.enabled(view_enabled);
        $.navigationWindowLifelinesOther.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;