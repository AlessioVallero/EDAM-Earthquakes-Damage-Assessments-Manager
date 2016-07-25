function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnConnectionOfHorizontalPanelsBySteelCables_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 130, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInclusionOfAntiDropCableForHorizontalPanels_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 131, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConnectingThePillarsOfCurtainPanel_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 132, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConnectionOfVerticalPanelsBySteelCables_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 133, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConnectionOfVerticalPanelsBySteelSquares_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 134, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInclusionOfAntiDropCableForVerticalPanels_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 135, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnInclusionOfTwoAntiDropCablesPanelCorner_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(7 * current_infill_elements_id + 136, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesMeasuresOfEmergencyInfillElementsDetails";
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
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow = Ti.UI.createWindow({
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow && $.addTopLevelView($.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow);
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.add($.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables = Ti.UI.createView({
        top: 210,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares = Ti.UI.createView({
        top: 280,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels = Ti.UI.createView({
        top: 350,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner = Ti.UI.createView({
        top: 420,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElementsDetails.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_infill_elements_id = args.infill_elements_id;
    var current_father_title = args.father_title;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.setTitle(current_father_title);
        var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"];
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.init(L("generic_connection_of_horizontal_panels_by_steel_cables_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 130), OnConnectionOfHorizontalPanelsBySteelCables_Change, "/images/Help/connection_of_horizontal_panels_by_steel_cables.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfHorizontalPanelsBySteelCables.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.init(L("generic_inclusion_of_anti_drop_cable_for_horizontal_panels_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 131), OnInclusionOfAntiDropCableForHorizontalPanels_Change, "/images/Help/inclusion_of_anti_drop_cable_for_horizontal_panels.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForHorizontalPanels.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.init(L("generic_connecting_the_pillars_of_curtain_panel_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 132), OnConnectingThePillarsOfCurtainPanel_Change, "/images/Help/connecting_the_pillars_of_curtain_panel.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectingThePillarsOfCurtainPanel.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.init(L("generic_connection_of_vertical_panels_by_steel_cables_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 133), OnConnectionOfVerticalPanelsBySteelCables_Change, "/images/Help/connection_of_vertical_panels_by_steel_cables.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelCables.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.init(L("generic_connection_of_vertical_panels_by_steel_squares_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 134), OnConnectionOfVerticalPanelsBySteelSquares_Change, "/images/Help/connection_of_vertical_panels_by_steel_squares.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionOfVerticalPanelsBySteelSquares.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.init(L("generic_inclusion_of_anti_drop_cable_for_vertical_panels_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 135), OnInclusionOfAntiDropCableForVerticalPanels_Change, "/images/Help/inclusion_of_anti_drop_cable_for_vertical_panels.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfAntiDropCableForVerticalPanels.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.init(L("generic_inclusion_of_two_anti_drop_cables_panel_corner_text_msg"), measuresOfEmergency.charAt(7 * current_infill_elements_id + 136), OnInclusionOfTwoAntiDropCablesPanelCorner_Change, "/images/Help/inclusion_of_two_anti_drop_cables_panel_corner.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyInclusionOfTwoAntiDropCablesPanelCorner.enabled(view_enabled);
        $.shedModeDamagesMeasuresOfEmergencyInfillElementsDetailsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;