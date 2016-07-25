function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnDangerOfBuilding_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(5 * current_external_danger, Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"], $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.get_value());
            Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDangerOfAccessRoad_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(5 * current_external_danger + 1, Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"], $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.get_value());
            Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDangerOfInland_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(5 * current_external_danger + 2, Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"], $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.get_value());
            Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnDenialOfAccess_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(5 * current_external_danger + 3, Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"], $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.get_value());
            Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnStepsProtection_Change() {
        try {
            var newDamageTypeValue = Alloy.Globals.replaceCharAt(5 * current_external_danger + 4, Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"], $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.get_value());
            Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"] = newDamageTypeValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionSixExternalDangerPotentialCause";
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
    $.__views.aedesModeSectionSixPotentialCauseWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_six_potential_cause_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionSixPotentialCauseWindow"
    });
    $.__views.aedesModeSectionSixPotentialCauseWindow && $.addTopLevelView($.__views.aedesModeSectionSixPotentialCauseWindow);
    $.__views.scrollViewSectionSixPotentialCause = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionSixPotentialCause"
    });
    $.__views.aedesModeSectionSixPotentialCauseWindow.add($.__views.scrollViewSectionSixPotentialCause);
    $.__views.lblAeDESModeFormsSectionSixPotentialCause = Ti.UI.createLabel({
        text: L("generic_potential_cause_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionSixPotentialCause"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.lblAeDESModeFormsSectionSixPotentialCause);
    $.__views.lblAeDESModeFormsSectionSixPotentialCauseFatherTitle = Ti.UI.createLabel({
        top: 30,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionSixPotentialCauseFatherTitle"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.lblAeDESModeFormsSectionSixPotentialCauseFatherTitle);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding = Ti.UI.createView({
        top: 60,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad = Ti.UI.createView({
        top: 130,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland = Ti.UI.createView({
        top: 200,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess = Ti.UI.createView({
        top: 270,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection = Ti.UI.createView({
        top: 340,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection"
    });
    $.__views.scrollViewSectionSixPotentialCause.add($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_external_danger = args.external_danger_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.lblAeDESModeFormsSectionSixPotentialCauseFatherTitle.setText(current_father_title);
        var potentialCauseValue = Alloy.Globals.AeDESModeSectionSix["POTENTIAL_CAUSES"];
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.init(L("generic_danger_of_building_text_msg"), potentialCauseValue.charAt(5 * current_external_danger), OnDangerOfBuilding_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfBuilding.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.init(L("generic_danger_of_access_road_text_msg"), potentialCauseValue.charAt(5 * current_external_danger + 1), OnDangerOfAccessRoad_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfAccessRoad.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.init(L("generic_danger_of_inland_text_msg"), potentialCauseValue.charAt(5 * current_external_danger + 2), OnDangerOfInland_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseDangerOfInland.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.init(L("generic_measures_of_emergency_denial_of_access_text_msg"), potentialCauseValue.charAt(5 * current_external_danger + 3), OnDenialOfAccess_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyDenialOfAccess.set_label_height(80);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.init(L("generic_measures_of_emergency_steps_protection_text_msg"), potentialCauseValue.charAt(5 * current_external_danger + 4), OnStepsProtection_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionSixPotentialCauseMeasuresOfEmergencyStepsProtection.set_label_height(80);
        $.aedesModeSectionSixPotentialCauseWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;