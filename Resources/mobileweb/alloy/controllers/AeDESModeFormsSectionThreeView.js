function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnCoverage_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["COVERAGE"] = e.id;
    }
    function OnPlanAndElevation_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] = e.id;
    }
    function OnInfillDisposal_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] = e.id;
    }
    function OnIsolatedColumns_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] = e.id;
    }
    function OnMixed_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["MIXED"] = e.id;
    }
    function OnReinforced_Change(e) {
        Alloy.Globals.AeDESModeSectionThree["REINFORCED"] = e.id;
    }
    function OnReinforcedConcreteFrames_Change() {
        Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.get_value();
    }
    function OnReinforcedConcreteWalls_Change() {
        Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.get_value();
    }
    function OnSteelFrames_Change() {
        Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"] = $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.get_value();
    }
    function OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionThreeMasonryStructures", {
                masonry_structure_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "AeDESModeFormsSectionThreeView";
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
    $.__views.aedesModeSectionThreeWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_three_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionThreeWindow"
    });
    $.__views.aedesModeSectionThreeWindow && $.addTopLevelView($.__views.aedesModeSectionThreeWindow);
    $.__views.scrollViewSectionThree = Ti.UI.createScrollView({
        top: 10,
        contentWidth: "100%",
        scrollType: "vertical",
        id: "scrollViewSectionThree"
    });
    $.__views.aedesModeSectionThreeWindow.add($.__views.scrollViewSectionThree);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreeCoverage = Ti.UI.createView({
        top: 0,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreeCoverage"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreeCoverage);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreeCoverage",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreeCoverage
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreeCoverage);
    $.__views.lblAeDESModeFormsSectionThreeRegularity = Ti.UI.createLabel({
        text: L("generic_regularity_text_msg"),
        top: 70,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeRegularity"
    });
    $.__views.scrollViewSectionThree.add($.__views.lblAeDESModeFormsSectionThreeRegularity);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation = Ti.UI.createView({
        top: 100,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal = Ti.UI.createView({
        top: 170,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns = Ti.UI.createView({
        top: 240,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreeMixed = Ti.UI.createView({
        top: 310,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreeMixed"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreeMixed);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeMixed = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreeMixed",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreeMixed
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreeMixed);
    $.__views.viewAppComboBoxAeDESModeFormsSectionThreeReinforced = Ti.UI.createView({
        top: 380,
        height: 50,
        width: Ti.UI.FILL,
        id: "viewAppComboBoxAeDESModeFormsSectionThreeReinforced"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppComboBoxAeDESModeFormsSectionThreeReinforced);
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced = Alloy.createWidget("com.diseg.AppComboBox", "widget", {
        id: "widgetAppComboBoxAeDESModeFormsSectionThreeReinforced",
        __parentSymbol: $.__views.viewAppComboBoxAeDESModeFormsSectionThreeReinforced
    });
    $.__views.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.setParent($.__views.viewAppComboBoxAeDESModeFormsSectionThreeReinforced);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames = Ti.UI.createView({
        top: 450,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls = Ti.UI.createView({
        top: 520,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls);
    $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeSteelFrames = Ti.UI.createView({
        top: 590,
        height: 50,
        width: 290,
        id: "viewAppCheckBoxAeDESModeFormsSectionThreeSteelFrames"
    });
    $.__views.scrollViewSectionThree.add($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeSteelFrames);
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames = Alloy.createWidget("com.diseg.AppCheckBox", "widget", {
        id: "widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames",
        __parentSymbol: $.__views.viewAppCheckBoxAeDESModeFormsSectionThreeSteelFrames
    });
    $.__views.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.setParent($.__views.viewAppCheckBoxAeDESModeFormsSectionThreeSteelFrames);
    $.__views.lblAeDESModeFormsSectionThreeVerticalMasonryStructures = Ti.UI.createLabel({
        text: L("generic_vertical_masonry_structures_text_msg"),
        top: 660,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeVerticalMasonryStructures"
    });
    $.__views.scrollViewSectionThree.add($.__views.lblAeDESModeFormsSectionThreeVerticalMasonryStructures);
    var __alloyId23 = [];
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified = Ti.UI.createLabel({
        text: L("generic_not_identified_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowNotIdentified);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains = Ti.UI.createLabel({
        text: L("generic_vaults_without_chains_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithoutChains);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains = Ti.UI.createLabel({
        text: L("generic_vaults_with_chains_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowVaultsWithChains);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics = Ti.UI.createLabel({
        text: L("generic_deformable_attics_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowDeformableAttics);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics = Ti.UI.createLabel({
        text: L("generic_semi_deformable_attics_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowSemiDeformableAttics);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics"
    });
    __alloyId23.push($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics);
    $.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics = Ti.UI.createLabel({
        text: L("generic_rigid_attics_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics"
    });
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics.add($.__views.lblAeDESModeFormsSectionThreeMasonryStructureRowRigidAttics);
    $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure = Ti.UI.createTableView({
        top: 690,
        backgroundColor: "#ffffff",
        height: 300,
        width: Ti.UI.FILL,
        data: __alloyId23,
        id: "tableViewAeDESModeFormsSectionThreeMasonryStructure"
    });
    $.__views.scrollViewSectionThree.add($.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure);
    OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click ? $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure.addEventListener("click", OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure!click!OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        var coverageParentView = null;
        var planAndElevationParentView = null;
        var infillDisposalParentView = null;
        var isolatedColumnsParentView = null;
        var mixedParentView = null;
        var reinforcedView = null;
        coverageParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeCoverage;
        planAndElevationParentView = $.viewAppComboBoxAeDESModeFormsSectionThreePlanAndElevation;
        infillDisposalParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeInfillDisposal;
        isolatedColumnsParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns;
        mixedParentView = $.viewAppComboBoxAeDESModeFormsSectionThreeMixed;
        reinforcedView = $.viewAppComboBoxAeDESModeFormsSectionThreeReinforced;
        var coverageValues = {
            0: {
                title: L("generic_coverage_pushing_heavy")
            },
            1: {
                title: L("generic_coverage_not_pushing_heavy")
            },
            2: {
                title: L("generic_coverage_pushing_light")
            },
            3: {
                title: L("generic_coverage_not_pushing_light")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.init(L("generic_coverage_text_msg"), coverageValues, OnCoverage_Change, null, coverageParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["COVERAGE"] && $.widgetAppComboBoxAeDESModeFormsSectionThreeCoverage.set_selected_index(Alloy.Globals.AeDESModeSectionThree["COVERAGE"]);
        var planAndElevationValues = {
            0: {
                title: L("generic_plan_and_elevation_not_regular")
            },
            1: {
                title: L("generic_plan_and_elevation_regular")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.init(L("generic_plan_and_elevation_text_msg"), planAndElevationValues, OnPlanAndElevation_Change, null, planAndElevationParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"] && $.widgetAppComboBoxAeDESModeFormsSectionThreePlanAndElevation.set_selected_index(Alloy.Globals.AeDESModeSectionThree["PLAN_AND_ELEVATION"]);
        var infillDisposalValues = {
            0: {
                title: L("generic_infill_disposal_not_regular")
            },
            1: {
                title: L("generic_infill_disposal_regular")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.init(L("generic_infill_disposal_text_msg"), infillDisposalValues, OnInfillDisposal_Change, null, infillDisposalParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"] && $.widgetAppComboBoxAeDESModeFormsSectionThreeInfillDisposal.set_selected_index(Alloy.Globals.AeDESModeSectionThree["INFILL_DISPOSAL"]);
        var isolatedColumnsValues = {
            0: {
                title: L("generic_yes_msg")
            },
            1: {
                title: L("generic_no_msg")
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.init(L("generic_isolated_columns_text_msg"), isolatedColumnsValues, OnIsolatedColumns_Change, null, isolatedColumnsParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"] && $.widgetAppComboBoxAeDESModeFormsSectionThreeIsolatedColumns.set_selected_index(Alloy.Globals.AeDESModeSectionThree["ISOLATED_COLUMNS"]);
        var mixedValues = {
            0: {
                title: L("generic_no_msg")
            },
            1: {
                title: "G1"
            },
            2: {
                title: "G2"
            },
            3: {
                title: "G3"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.init(L("generic_mixed_text_msg"), mixedValues, OnMixed_Change, null, mixedParentView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["MIXED"] && $.widgetAppComboBoxAeDESModeFormsSectionThreeMixed.set_selected_index(Alloy.Globals.AeDESModeSectionThree["MIXED"]);
        var reinforcedValues = {
            0: {
                title: L("generic_no_msg")
            },
            1: {
                title: "H1"
            },
            2: {
                title: "H2"
            },
            3: {
                title: "H3"
            }
        };
        $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.init(L("generic_reinforced_text_msg"), reinforcedValues, OnReinforced_Change, null, reinforcedView);
        $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.enabled(view_enabled);
        Alloy.Globals.AeDESModeSectionThree["REINFORCED"] && $.widgetAppComboBoxAeDESModeFormsSectionThreeReinforced.set_selected_index(Alloy.Globals.AeDESModeSectionThree["REINFORCED"]);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.init(L("generic_reinforced_concrete_frames_text_msg"), Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_FRAMES"], OnReinforcedConcreteFrames_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteFrames.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.init(L("generic_reinforced_concrete_walls_text_msg"), Alloy.Globals.AeDESModeSectionThree["REINFORCED_CONCRETE_WALLS"], OnReinforcedConcreteWalls_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeReinforcedConcreteWalls.enabled(view_enabled);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.init(L("generic_steel_frames_text_msg"), Alloy.Globals.AeDESModeSectionThree["STEEL_FRAMES"], OnSteelFrames_Change);
        $.widgetAppCheckBoxAeDESModeFormsSectionThreeSteelFrames.enabled(view_enabled);
        $.aedesModeSectionThreeWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure!click!OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click"] && $.__views.tableViewAeDESModeFormsSectionThreeMasonryStructure.addEventListener("click", OnTableViewAeDESModeFormsSectionThreeMasonryStructure_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;