function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnAlluviumSoilFill_Change() {
        try {
            current_material_type = Alloy.Globals.replaceCharAt(0, current_material_type, $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.get_value());
            Ti.App.fireEvent("baea_mode_landslide:material_type_changed", {
                value: current_material_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnSedimentaryRock_Change() {
        try {
            current_material_type = Alloy.Globals.replaceCharAt(1, current_material_type, $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.get_value());
            Ti.App.fireEvent("baea_mode_landslide:material_type_changed", {
                value: current_material_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnCrystallineRock_Change() {
        try {
            current_material_type = Alloy.Globals.replaceCharAt(2, current_material_type, $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.get_value());
            Ti.App.fireEvent("baea_mode_landslide:material_type_changed", {
                value: current_material_type
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "BAEAModeFormsLandslideMaterialTypeView";
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
    $.__views.baeaModeLandslideMaterialTypeWindow = Ti.UI.createWindow({
        title: L("baea_mode_landslide_material_type_title"),
        backgroundColor: "#ffffcc",
        id: "baeaModeLandslideMaterialTypeWindow"
    });
    $.__views.baeaModeLandslideMaterialTypeWindow && $.addTopLevelView($.__views.baeaModeLandslideMaterialTypeWindow);
    $.__views.scrollViewLandslideMaterialType = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewLandslideMaterialType"
    });
    $.__views.baeaModeLandslideMaterialTypeWindow.add($.__views.scrollViewLandslideMaterialType);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill = Ti.UI.createView({
        top: 0,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill"
    });
    $.__views.scrollViewLandslideMaterialType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock = Ti.UI.createView({
        top: 70,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock"
    });
    $.__views.scrollViewLandslideMaterialType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock);
    $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock = Ti.UI.createView({
        top: 140,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock"
    });
    $.__views.scrollViewLandslideMaterialType.add($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock);
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock",
        __parentSymbol: $.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock
    });
    $.__views.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.setParent($.__views.viewAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_material_type = args.material_type;
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.init(L("generic_alluvium_soil_fill_text_msg"), current_material_type.charAt(0), OnAlluviumSoilFill_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeAlluviumSoilFill.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.init(L("generic_sedimentary_rock_text_msg"), current_material_type.charAt(1), OnSedimentaryRock_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeSedimentaryRock.enabled(view_enabled);
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.init(L("generic_crystalline_rock_text_msg"), current_material_type.charAt(2), OnCrystallineRock_Change);
        $.widgetAppCheckBoxBAEAModeFormsLandslideMaterialTypeCrystallineRock.enabled(view_enabled);
        $.baeaModeLandslideMaterialTypeWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;