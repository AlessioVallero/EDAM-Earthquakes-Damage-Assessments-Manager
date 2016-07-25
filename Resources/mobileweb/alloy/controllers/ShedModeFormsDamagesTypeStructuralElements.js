function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewShedModeFormsDamagesTypeStructuralElements_Click(e) {
        try {
            var help_image = null;
            switch (e.index) {
              case 0:
                help_image = "/images/Help/loss_of_support_of_the_beam.png";
                break;

              case 1:
                help_image = "/images/Help/shear_failure_of_the_support_pillar.png";
                break;

              case 2:
                help_image = "/images/Help/collapse_of_the_transverse_beam.png";
                break;

              case 3:
                help_image = "/images/Help/rotation_of_the_pillar.png";
                break;

              case 4:
                help_image = "/images/Help/connection_break.png";
                break;

              case 5:
                help_image = "/images/Help/crisis_of_the_concrete_cover_of_the_plug.png";
                break;

              case 6:
                help_image = "/images/Help/collapse_of_the_roof_tiles.png";
                break;

              case 7:
                help_image = "/images/Help/permanent_rotations_of_the_beam_incoverage.png";
                break;

              case 8:
                help_image = "/images/Help/crisis_of_the_fork.png";
                break;

              case 9:
                help_image = "/images/Help/collapse_of_a_cover_plate.png";
            }
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesTypeDetails", {
                type_id: e.index,
                type_section: 0,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized,
                help_image: help_image
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesTypeStructuralElements";
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
    $.__views.shedModeDamagesTypeStructuralElementsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_type_structural_elements_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesTypeStructuralElementsWindow"
    });
    $.__views.shedModeDamagesTypeStructuralElementsWindow && $.addTopLevelView($.__views.shedModeDamagesTypeStructuralElementsWindow);
    $.__views.scrollViewDamagesTypeStructuralElements = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesTypeStructuralElements"
    });
    $.__views.shedModeDamagesTypeStructuralElementsWindow.add($.__views.scrollViewDamagesTypeStructuralElements);
    var __alloyId35 = [];
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam = Ti.UI.createLabel({
        text: L("generic_loss_of_support_of_the_beam_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowLossOfSupportOfTheBeam);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar = Ti.UI.createLabel({
        text: L("generic_shear_failure_of_the_support_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowShearFailureOfTheSupportPillar);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam = Ti.UI.createLabel({
        text: L("generic_collapse_of_transverse_beam_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheTransverseBeam);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar = Ti.UI.createLabel({
        text: L("generic_rotation_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowRotationOfThePillar);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak = Ti.UI.createLabel({
        text: L("generic_connection_break_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowConnectionBreak);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug = Ti.UI.createLabel({
        text: L("generic_crisis_of_the_concrete_cover_of_the_plug_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheConcreteCoverOfThePlug);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles = Ti.UI.createLabel({
        text: L("generic_collapse_of_the_roof_tiles_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfTheRoofTiles);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage = Ti.UI.createLabel({
        text: L("generic_permament_rotations_of_the_beam_in_coverage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowPermanentRotationsOfTheBeamInCoverage);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork = Ti.UI.createLabel({
        text: L("generic_crisis_of_the_fork_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCrisisOfTheFork);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate"
    });
    __alloyId35.push($.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate);
    $.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate = Ti.UI.createLabel({
        text: L("generic_collapse_of_a_cover_plate_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate"
    });
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate.add($.__views.lblShedModeFormsDamagesTypeStructuralElementsRowCollapseOfACoverPlate);
    $.__views.tableViewShedModeFormsDamagesTypeStructuralElements = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "#ffffff",
        height: 500,
        width: Ti.UI.FILL,
        data: __alloyId35,
        id: "tableViewShedModeFormsDamagesTypeStructuralElements"
    });
    $.__views.scrollViewDamagesTypeStructuralElements.add($.__views.tableViewShedModeFormsDamagesTypeStructuralElements);
    OnTableViewShedModeFormsDamagesTypeStructuralElements_Click ? $.__views.tableViewShedModeFormsDamagesTypeStructuralElements.addEventListener("click", OnTableViewShedModeFormsDamagesTypeStructuralElements_Click) : __defers["$.__views.tableViewShedModeFormsDamagesTypeStructuralElements!click!OnTableViewShedModeFormsDamagesTypeStructuralElements_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.shedModeDamagesTypeStructuralElementsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewShedModeFormsDamagesTypeStructuralElements!click!OnTableViewShedModeFormsDamagesTypeStructuralElements_Click"] && $.__views.tableViewShedModeFormsDamagesTypeStructuralElements.addEventListener("click", OnTableViewShedModeFormsDamagesTypeStructuralElements_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;