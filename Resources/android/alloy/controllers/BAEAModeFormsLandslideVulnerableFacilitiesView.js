function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBuildings_Change() {
        try {
            current_vulnerable_facilities = Alloy.Globals.replaceCharAt(0, current_vulnerable_facilities, $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.get_value());
            Ti.App.fireEvent("baea_mode_landslide:vulnerable_facilities_changed", {
                value: current_vulnerable_facilities
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnUtilities_Change() {
        try {
            current_vulnerable_facilities = Alloy.Globals.replaceCharAt(1, current_vulnerable_facilities, $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.get_value());
            Ti.App.fireEvent("baea_mode_landslide:vulnerable_facilities_changed", {
                value: current_vulnerable_facilities
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRoads_Change() {
        try {
            current_vulnerable_facilities = Alloy.Globals.replaceCharAt(2, current_vulnerable_facilities, $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.get_value());
            Ti.App.fireEvent("baea_mode_landslide:vulnerable_facilities_changed", {
                value: current_vulnerable_facilities
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnNone_Change() {
        try {
            current_vulnerable_facilities = Alloy.Globals.replaceCharAt(3, current_vulnerable_facilities, $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.get_value());
            Ti.App.fireEvent("baea_mode_landslide:vulnerable_facilities_changed", {
                value: current_vulnerable_facilities
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnOther_Change() {
        try {
            current_vulnerable_facilities = Alloy.Globals.replaceCharAt(4, current_vulnerable_facilities, $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.get_value());
            Ti.App.fireEvent("baea_mode_landslide:vulnerable_facilities_changed", {
                value: current_vulnerable_facilities
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLandslideVulnerableFacilitiesView";
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
    $.__views.baeaModeLandslideVulnerableFacilitiesWindow = Ti.UI.createWindow({
        title: L("baea_mode_landslide_vulnerable_facilities_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLandslideVulnerableFacilitiesWindow"
    });
    $.__views.baeaModeLandslideVulnerableFacilitiesWindow && $.addTopLevelView($.__views.baeaModeLandslideVulnerableFacilitiesWindow);
    $.__views.scrollViewLandslideVulnerableFacilities = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLandslideVulnerableFacilities"
    });
    $.__views.baeaModeLandslideVulnerableFacilitiesWindow.add($.__views.scrollViewLandslideVulnerableFacilities);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings"
    });
    $.__views.scrollViewLandslideVulnerableFacilities.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities"
    });
    $.__views.scrollViewLandslideVulnerableFacilities.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads"
    });
    $.__views.scrollViewLandslideVulnerableFacilities.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone"
    });
    $.__views.scrollViewLandslideVulnerableFacilities.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther = Ti.UI.createView({
        top: 280,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther"
    });
    $.__views.scrollViewLandslideVulnerableFacilities.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_vulnerable_facilities = args.vulnerable_facilities;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.init(L("generic_buildings_text_msg"), current_vulnerable_facilities.charAt(0), OnBuildings_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesBuildings.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.init(L("generic_utilities_text_msg"), current_vulnerable_facilities.charAt(1), OnUtilities_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesUtilities.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.init(L("generic_roads_text_msg"), current_vulnerable_facilities.charAt(2), OnRoads_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesRoads.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.init(L("generic_none_text_msg"), current_vulnerable_facilities.charAt(3), OnNone_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesNone.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.init(L("generic_other_text_msg"), current_vulnerable_facilities.charAt(4), OnOther_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideVulnerableFacilitiesOther.enabled(view_enabled);
        $.baeaModeLandslideVulnerableFacilitiesWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;