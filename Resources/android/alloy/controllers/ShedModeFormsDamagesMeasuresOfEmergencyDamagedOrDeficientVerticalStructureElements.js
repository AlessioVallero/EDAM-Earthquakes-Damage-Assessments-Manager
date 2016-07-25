function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnConnectionBetweenThePierAndIndustrialFloor_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(193, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConsolidationOfTheFoundationByLowPressureCementMixtures_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(194, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(195, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnConfinementAtTheBaseOfThePillars_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(196, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnLocalStrengtheningWithMetalNecktie_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(197, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnContainmentAndStrengtheningOfTheBasicOfThePier_Change() {
        try {
            var newMeasuresOfEmergencyValue = Alloy.Globals.replaceCharAt(198, Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"], $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.get_value());
            Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"] = newMeasuresOfEmergencyValue;
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesMeasuresOfEmergencyDamagedOrDeficientVerticalStructureElements";
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
    $.__views.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_measures_of_emergency_damaged_or_deficient_vertical_structure_elements_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow && $.addTopLevelView($.__views.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow);
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow.add($.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures = Ti.UI.createView({
        top: 70,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting = Ti.UI.createView({
        top: 170,
        height: 80,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars = Ti.UI.createView({
        top: 270,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie = Ti.UI.createView({
        top: 340,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie);
    $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier = Ti.UI.createView({
        top: 410,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElements.add($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier);
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier",
        __parentSymbol: $.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier
    });
    $.__views.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.setParent($.__views.viewAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var measuresOfEmergency = Alloy.Globals.ShedModeDamages["MEASURES_OF_EMERGENCY"];
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.init(L("generic_connection_between_the_pier_and_industrial_floor_text_msg"), measuresOfEmergency.charAt(193), OnConnectionBetweenThePierAndIndustrialFloor_Change, "/images/Help/connection_between_the_pier_and_industrial_floor.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConnectionBetweenThePierAndIndustrialFloor.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.init(L("generic_consolidation_of_the_foundation_by_low_pressure_cement_mixtures_text_msg"), measuresOfEmergency.charAt(194), OnConsolidationOfTheFoundationByLowPressureCementMixtures_Change, "/images/Help/consolidation_of_the_foundation_by_low_pressure_cement_mixtures.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.set_label_height(80);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConsolidationOfTheFoundationByLowPressureCementMixtures.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.init(L("generic_restoring_the_filling_interspace_between_the_pier_and_glass_by_manual_casting_text_msg"), measuresOfEmergency.charAt(195), OnRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting_Change, "/images/Help/restoring_the_filling_interspace_between_the_pier_and_glass_by_manual_casting.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.set_label_height(80);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyRestoringTheFillingInterspaceBetweenThePierAndGlassByManualCasting.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.init(L("generic_confinement_at_the_base_of_the_pillars_text_msg"), measuresOfEmergency.charAt(196), OnConfinementAtTheBaseOfThePillars_Change, "/images/Help/confinement_at_the_base_of_the_pillars.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyConfinementAtTheBaseOfThePillars.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.init(L("generic_local_strengthening_with_metal_necktie_text_msg"), measuresOfEmergency.charAt(197), OnLocalStrengtheningWithMetalNecktie_Change, "/images/Help/local_strengthening_with_metal_necktie.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyLocalStrengtheningWithMetalNecktie.enabled(view_enabled);
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.init(L("generic_containment_and_strengthening_of_the_basic_of_the_pier_text_msg"), measuresOfEmergency.charAt(198), OnContainmentAndStrengtheningOfTheBasicOfThePier_Change, "/images/Help/containment_and_strengthening_of_the_basic_of_the_pier.png");
        $.widgetAppCheckBoxShedModeFormsDamagesMeasuresOfEmergencyContainmentAndStrengtheningOfTheBasicOfThePier.enabled(view_enabled);
        $.shedModeDamagesMeasuresOfEmergencyDamagesOrDeficientVerticalStructureElementsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;