function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnPrimaryGirders_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] = e.id;
    }
    function OnThicknessOfTheTiles_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] = e.id;
    }
    function OnTypicalLights_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] = e.id;
    }
    function OnCoverage_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["COVERAGE"] = e.id;
    }
    function OnInclinationOfTheRoof_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] = e.id;
    }
    function OnInfillElements_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] = e.id;
    }
    function OnVerticalWalls_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] = e.id;
    }
    function OnShelving_Change(e) {
        Alloy.Globals.ShedModeInfrastructure["SHELVING"] = e.id;
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsInfrastructureView";
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
    $.__views.shedModeInfrastructureWindow = Ti.UI.createWindow({
        title: L("shed_mode_infrastructure_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeInfrastructureWindow"
    });
    $.__views.shedModeInfrastructureWindow && $.addTopLevelView($.__views.shedModeInfrastructureWindow);
    $.__views.scrollViewInfrastructure = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewInfrastructure"
    });
    $.__views.shedModeInfrastructureWindow.add($.__views.scrollViewInfrastructure);
    $.__views.viewPrimaryGirders = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewPrimaryGirders"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewPrimaryGirders);
    $.__views.widgetAppComboBoxShedModeInfrastructurePrimaryGirders = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructurePrimaryGirders",
        __parentSymbol: $.__views.viewPrimaryGirders
    });
    $.__views.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.setParent($.__views.viewPrimaryGirders);
    $.__views.viewThicknessOfTheTiles = Ti.UI.createView({
        top: 70,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewThicknessOfTheTiles"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewThicknessOfTheTiles);
    $.__views.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles",
        __parentSymbol: $.__views.viewThicknessOfTheTiles
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.setParent($.__views.viewThicknessOfTheTiles);
    $.__views.viewTypicalLights = Ti.UI.createView({
        top: 140,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewTypicalLights"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewTypicalLights);
    $.__views.widgetAppComboBoxShedModeInfrastructureTypicalLights = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureTypicalLights",
        __parentSymbol: $.__views.viewTypicalLights
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureTypicalLights.setParent($.__views.viewTypicalLights);
    $.__views.viewCoverage = Ti.UI.createView({
        top: 210,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewCoverage"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewCoverage);
    $.__views.widgetAppComboBoxShedModeInfrastructureCoverage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureCoverage",
        __parentSymbol: $.__views.viewCoverage
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureCoverage.setParent($.__views.viewCoverage);
    $.__views.viewInclinationOfTheRoof = Ti.UI.createView({
        top: 280,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewInclinationOfTheRoof"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewInclinationOfTheRoof);
    $.__views.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof",
        __parentSymbol: $.__views.viewInclinationOfTheRoof
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.setParent($.__views.viewInclinationOfTheRoof);
    $.__views.viewInfillElements = Ti.UI.createView({
        top: 350,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewInfillElements"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewInfillElements);
    $.__views.widgetAppComboBoxShedModeInfrastructureInfillElements = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureInfillElements",
        __parentSymbol: $.__views.viewInfillElements
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureInfillElements.setParent($.__views.viewInfillElements);
    $.__views.viewVerticalWalls = Ti.UI.createView({
        top: 420,
        height: 50,
        width: Ti.UI.FILL,
        bottom: 250,
        id: "viewVerticalWalls"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewVerticalWalls);
    $.__views.widgetAppComboBoxShedModeInfrastructureVerticalWalls = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureVerticalWalls",
        __parentSymbol: $.__views.viewVerticalWalls
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureVerticalWalls.setParent($.__views.viewVerticalWalls);
    $.__views.viewShelving = Ti.UI.createView({
        top: 490,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewShelving"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewShelving);
    $.__views.widgetAppComboBoxShedModeInfrastructureShelving = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxShedModeInfrastructureShelving",
        __parentSymbol: $.__views.viewShelving
    });
    $.__views.widgetAppComboBoxShedModeInfrastructureShelving.setParent($.__views.viewShelving);
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 560,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewInfrastructure.add($.__views.viewAppButtonSave);
    $.__views.widgetAppButtonSave = Alloy.createWidget("com.diseg.AppButton", "widget", {
        id: "widgetAppButtonSave",
        __parentSymbol: $.__views.viewAppButtonSave
    });
    $.__views.widgetAppButtonSave.setParent($.__views.viewAppButtonSave);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var primaryGirdersParentView = null;
        var thicknessOfTheTilesParentView = null;
        var typicalLightsParentView = null;
        var coverageParentView = null;
        var inclinationOfTheRoofParentView = null;
        var infillElementsParentView = null;
        var verticalWallsParentView = null;
        var shelvingParentView = null;
        primaryGirdersParentView = $.viewPrimaryGirders;
        thicknessOfTheTilesParentView = $.viewThicknessOfTheTiles;
        typicalLightsParentView = $.viewTypicalLights;
        coverageParentView = $.viewCoverage;
        inclinationOfTheRoofParentView = $.viewInclinationOfTheRoof;
        infillElementsParentView = $.viewInfillElements;
        verticalWallsParentView = $.viewVerticalWalls;
        shelvingParentView = $.viewShelving;
        var primaryGirdersValues = {
            0: {
                title: L("generic_inverted_t_text_msg")
            },
            1: {
                title: "L"
            },
            2: {
                title: L("generic_parallel_borders_text_msg")
            },
            3: {
                title: L("generic_other_text_msg")
            }
        };
        $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.init(L("generic_primary_girders_text_msg"), primaryGirdersValues, OnPrimaryGirders_Change, null, primaryGirdersParentView);
        $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"] && $.widgetAppComboBoxShedModeInfrastructurePrimaryGirders.set_selected_index(Alloy.Globals.ShedModeInfrastructure["PRIMARY_GIRDERS"]);
        var thicknessOfTheTilesValues = {
            0: {
                title: "<=5cm"
            },
            1: {
                title: "6cm"
            },
            2: {
                title: "7cm"
            },
            3: {
                title: "8cm"
            },
            4: {
                title: "9cm"
            },
            5: {
                title: ">=10cm"
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.init(L("generic_thickness_of_the_tiles_text_msg"), thicknessOfTheTilesValues, OnThicknessOfTheTiles_Change, null, thicknessOfTheTilesParentView);
        $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"] && $.widgetAppComboBoxShedModeInfrastructureThicknessOfTheTiles.set_selected_index(Alloy.Globals.ShedModeInfrastructure["THICKNESS_OF_THE_TILES"]);
        var typicalLightsValues = {
            0: {
                title: "<=10cm"
            },
            1: {
                title: "11cm"
            },
            2: {
                title: "12cm"
            },
            3: {
                title: "13cm"
            },
            4: {
                title: "14cm"
            },
            5: {
                title: ">=15cm"
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureTypicalLights.init(L("generic_typical_lights_text_msg"), typicalLightsValues, OnTypicalLights_Change, null, typicalLightsParentView);
        $.widgetAppComboBoxShedModeInfrastructureTypicalLights.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"] && $.widgetAppComboBoxShedModeInfrastructureTypicalLights.set_selected_index(Alloy.Globals.ShedModeInfrastructure["TYPICAL_LIGHTS"]);
        var coverageValues = {
            0: {
                title: L("generic_ribbed_dual_slope_text_msg")
            },
            1: {
                title: L("generic_reinforced_concrete_slope_text_msg")
            },
            2: {
                title: L("generic_special_elements_skylight_text_msg")
            },
            3: {
                title: L("generic_special_elements_shed_configuration_text_msg")
            },
            4: {
                title: L("generic_ribbed_flat_roof_text_msg")
            },
            5: {
                title: L("generic_shed_beams_knee_text_msg")
            },
            6: {
                title: L("generic_shed_inclined_beams_text_msg")
            }
        };
        var coverageHelps = [ "/images/Help/ribbed_dual_slope_coverage.png", "/images/Help/reinforced_concrete_dual_slope_coverage.png", "/images/Help/special_elements_skylight_coverage.png", "/images/Help/special_elements_shed_configuration_coverage.png", "/images/Help/ribbed_flat_roof_coverage.png", "/images/Help/shed_beam_knee_coverage.png", "/images/Help/shed_inclined_beams_coverage.png" ];
        $.widgetAppComboBoxShedModeInfrastructureCoverage.init(L("generic_coverage_text_msg"), coverageValues, OnCoverage_Change, coverageHelps, coverageParentView);
        $.widgetAppComboBoxShedModeInfrastructureCoverage.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["COVERAGE"] && $.widgetAppComboBoxShedModeInfrastructureCoverage.set_selected_index(Alloy.Globals.ShedModeInfrastructure["COVERAGE"]);
        var inclinationOfTheRoofValues = {
            0: {
                title: "<=10%"
            },
            1: {
                title: ">=15%"
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.init(L("generic_inclination_of_the_roof_text_msg"), inclinationOfTheRoofValues, OnInclinationOfTheRoof_Change, null, inclinationOfTheRoofParentView);
        $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"] && $.widgetAppComboBoxShedModeInfrastructureInclinationOfTheRoof.set_selected_index(Alloy.Globals.ShedModeInfrastructure["INCLINATION_OF_THE_ROOF"]);
        var infillElementsValues = {
            0: {
                title: L("generic_internal_of_pillar_text_msg")
            },
            1: {
                title: L("generic_external_of_pillar_text_msg")
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureInfillElements.init(L("generic_infill_elements_text_msg"), infillElementsValues, OnInfillElements_Change, null, infillElementsParentView);
        $.widgetAppComboBoxShedModeInfrastructureInfillElements.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"] && $.widgetAppComboBoxShedModeInfrastructureInfillElements.set_selected_index(Alloy.Globals.ShedModeInfrastructure["INFILL_ELEMENTS"]);
        var verticalWallsValues = {
            0: {
                title: L("generic_masonry_blocks_text_msg")
            },
            1: {
                title: L("generic_vertical_prefabricated_panels_text_msg")
            },
            2: {
                title: L("generic_horizontal_prefabricated_panels_text_msg")
            },
            3: {
                title: L("generic_mixed_text_msg")
            },
            4: {
                title: L("generic_other_text_msg")
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.init(L("generic_vertical_walls_text_msg"), verticalWallsValues, OnVerticalWalls_Change, null, verticalWallsParentView);
        $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"] && $.widgetAppComboBoxShedModeInfrastructureVerticalWalls.set_selected_index(Alloy.Globals.ShedModeInfrastructure["VERTICAL_WALLS"]);
        var shelvingValues = {
            0: {
                title: L("generic_indoor_sdi_text_msg")
            },
            1: {
                title: L("generic_sa_text_msg")
            },
            2: {
                title: L("generic_other_text_msg")
            }
        };
        $.widgetAppComboBoxShedModeInfrastructureShelving.init(L("generic_shelving_text_msg"), shelvingValues, OnShelving_Change, null, shelvingParentView);
        $.widgetAppComboBoxShedModeInfrastructureShelving.enabled(view_enabled);
        Alloy.Globals.ShedModeInfrastructure["SHELVING"] && $.widgetAppComboBoxShedModeInfrastructureShelving.set_selected_index(Alloy.Globals.ShedModeInfrastructure["SHELVING"]);
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.shedModeInfrastructureWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;