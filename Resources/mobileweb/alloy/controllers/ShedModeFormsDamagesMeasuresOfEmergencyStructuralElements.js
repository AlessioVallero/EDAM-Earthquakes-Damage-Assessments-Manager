function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesMeasuresOfEmergencyStructuralElementsDetails", {
                structural_elements_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesMeasuresOfEmergencyStructuralElements";
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
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_measures_of_emergency_structural_elements_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow && $.addTopLevelView($.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow);
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElements = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesMeasuresOfEmergencyStructuralElements"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow.add($.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElements);
    var __alloyId33 = [];
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam = Ti.UI.createLabel({
        text: L("generic_loss_of_support_of_the_beam_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowLossOfSupportOfTheBeam);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar = Ti.UI.createLabel({
        text: L("generic_shear_failure_of_the_support_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowShearFailureOfTheSupportPillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam = Ti.UI.createLabel({
        text: L("generic_collapse_of_transverse_beam_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTransverseBeam);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar = Ti.UI.createLabel({
        text: L("generic_rotation_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowRotationOfThePillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak = Ti.UI.createLabel({
        text: L("generic_connection_break_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowConnectionBreak);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug = Ti.UI.createLabel({
        text: L("generic_crisis_of_the_concrete_cover_of_the_plug_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles = Ti.UI.createLabel({
        text: L("generic_collapse_of_the_roof_tiles_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfTheRoofTiles);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage = Ti.UI.createLabel({
        text: L("generic_permament_rotations_of_the_beam_in_coverage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowPermamentRotationsOfTheBeamInCoverage);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork = Ti.UI.createLabel({
        text: L("generic_crisis_of_the_fork_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCrisisOfTheFork);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate"
    });
    __alloyId33.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate);
    $.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate = Ti.UI.createLabel({
        text: L("generic_collapse_of_a_cover_plate_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate.add($.__views.lblShedModeFormsMeasuresOfEmergencyStructuralElementsRowCollapseOfACoverPlate);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: 500,
        width: Ti.UI.FILL,
        data: __alloyId33,
        id: "tableViewShedModeFormsMeasuresOfEmergencyStructuralElements"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyStructuralElements.add($.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements);
    OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click ? $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements.addEventListener("click", OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click) : __defers["$.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements!click!OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.shedModeDamagesMeasuresOfEmergencyStructuralElementsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements!click!OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click"] && $.__views.tableViewShedModeFormsMeasuresOfEmergencyStructuralElements.addEventListener("click", OnTableViewShedModeFormsMeasuresOfEmergencyStructuralElements_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;