function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnDemolitions_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(5 * current_measures_of_emergency, Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.get_value());
            Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnHoopsAndOrTies_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(5 * current_measures_of_emergency + 1, Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.get_value());
            Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRepair_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(5 * current_measures_of_emergency + 2, Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.get_value());
            Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnProps_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(5 * current_measures_of_emergency + 3, Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.get_value());
            Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnStepsProtection_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(5 * current_measures_of_emergency + 4, Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.get_value());
            Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionFourMeasuresOfEmergency";
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
    $.__views.aedesModeSectionFourMeasuresOfEmergencyWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_four_measures_of_emergency_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionFourMeasuresOfEmergencyWindow"
    });
    $.__views.aedesModeSectionFourMeasuresOfEmergencyWindow && $.addTopLevelView($.__views.aedesModeSectionFourMeasuresOfEmergencyWindow);
    $.__views.scrollViewSectionFourMeasuresOfEmergency = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionFourMeasuresOfEmergency"
    });
    $.__views.aedesModeSectionFourMeasuresOfEmergencyWindow.add($.__views.scrollViewSectionFourMeasuresOfEmergency);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyFatherTitle = Ti.UI.createLabel({
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyFatherTitle"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyFatherTitle);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions = Ti.UI.createView({
        top: 30,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies = Ti.UI.createView({
        top: 100,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair = Ti.UI.createView({
        top: 170,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps = Ti.UI.createView({
        top: 240,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection = Ti.UI.createView({
        top: 310,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection"
    });
    $.__views.scrollViewSectionFourMeasuresOfEmergency.add($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_measures_of_emergency = args.measures_of_emergency_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionFourMeasuresOfEmergencyFatherTitle.setText(current_father_title);
        var measuresOfEmergency = Alloy.Globals.AeDESModeSectionFour["MEASURES_OF_EMERGENCY"];
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.init(L("generic_demolitions_text_msg"), measuresOfEmergency.charAt(5 * current_measures_of_emergency), OnDemolitions_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyDemolitions.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.init(L("generic_hoops_and_or_ties_text_msg"), measuresOfEmergency.charAt(5 * current_measures_of_emergency + 1), OnHoopsAndOrTies_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyHoopsAndOrTies.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.init(L("generic_repair_text_msg"), measuresOfEmergency.charAt(5 * current_measures_of_emergency + 2), OnRepair_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyRepair.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.init(L("generic_props_text_msg"), measuresOfEmergency.charAt(5 * current_measures_of_emergency + 3), OnProps_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyProps.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.init(L("generic_steps_protection_text_msg"), measuresOfEmergency.charAt(5 * current_measures_of_emergency + 4), OnStepsProtection_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionFourMeasuresOfEmergencyStepsProtection.enabled(view_enabled);
        $.aedesModeSectionFourMeasuresOfEmergencyWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;