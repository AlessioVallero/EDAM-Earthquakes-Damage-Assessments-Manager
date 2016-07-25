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
            $.navigationWindowLifelinesElectricPowerDelivery.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOverheadAndBuriedTransmissionLines_Change() {
        try {
            current_electric_power_delivery = Alloy.Globals.replaceCharAt(0, current_electric_power_delivery, $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:electric_power_delivery_changed", {
                value: current_electric_power_delivery
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSubstationAndSwitchyards_Change() {
        try {
            current_electric_power_delivery = Alloy.Globals.replaceCharAt(1, current_electric_power_delivery, $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.get_value());
            Ti.App.fireEvent("baea_mode_lifelines:electric_power_delivery_changed", {
                value: current_electric_power_delivery
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLifelinesElectricPowerDeliveryView";
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
    $.__views.baeaModeLifelinesElectricPowerDeliveryWindow = Ti.UI.createWindow({
        title: L("baea_mode_lifelines_electric_power_delivery_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLifelinesElectricPowerDeliveryWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.baeaModeLifelinesElectricPowerDeliveryWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewLifelinesElectricPowerDelivery = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLifelinesElectricPowerDelivery"
    });
    $.__views.baeaModeLifelinesElectricPowerDeliveryWindow.add($.__views.scrollViewLifelinesElectricPowerDelivery);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines"
    });
    $.__views.scrollViewLifelinesElectricPowerDelivery.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines);
    $.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards"
    });
    $.__views.scrollViewLifelinesElectricPowerDelivery.add($.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards);
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.setParent($.__views.viewAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards);
    $.__views.navigationWindowLifelinesElectricPowerDelivery = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.baeaModeLifelinesElectricPowerDeliveryWindow,
        id: "navigationWindowLifelinesElectricPowerDelivery"
    });
    $.__views.navigationWindowLifelinesElectricPowerDelivery && $.addTopLevelView($.__views.navigationWindowLifelinesElectricPowerDelivery);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_electric_power_delivery = args.electric_power_delivery;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.init(L("generic_overhead_and_buried_transmission_lines_text_msg"), current_electric_power_delivery.charAt(0), OnOverheadAndBuriedTransmissionLines_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliveryOverheadAndBuriedTransmissionLines.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.init(L("generic_substation_and_switchyards_text_msg"), current_electric_power_delivery.charAt(1), OnSubstationAndSwitchyards_Change);
        $.widgetAppCheckBoxBAEAModeFormsLifelinesElectricPowerDeliverySubstationAndSwitchyards.enabled(view_enabled);
        $.navigationWindowLifelinesElectricPowerDelivery.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;