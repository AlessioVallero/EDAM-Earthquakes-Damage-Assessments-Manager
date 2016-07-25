function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewShedModeFormsDamagesTypeInfillElements_Click(e) {
        try {
            var help_image = null;
            switch (e.index) {
              case 0:
                help_image = "/images/Help/shear_failure_of_connector.png";
                break;

              case 1:
                help_image = "/images/Help/disconnected_profiles_on_the_pillar.png";
                break;

              case 2:
                help_image = "/images/Help/shelf_break.png";
                break;

              case 3:
                help_image = "/images/Help/rollover_of_the_pillar.png";
                break;

              case 4:
                help_image = "/images/Help/plastic_hinge_on_the_pillar.png";
                break;

              case 5:
                help_image = "/images/Help/hammering_of_the_roof_elements.png";
            }
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesTypeDetails", {
                type_id: e.index,
                type_section: 1,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized,
                help_image: help_image
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesTypeInfillElements";
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
    $.__views.shedModeDamagesTypeInfillElementsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_type_infill_elements_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesTypeInfillElementsWindow"
    });
    $.__views.shedModeDamagesTypeInfillElementsWindow && $.addTopLevelView($.__views.shedModeDamagesTypeInfillElementsWindow);
    $.__views.scrollViewDamagesTypeInfillElements = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesTypeInfillElements"
    });
    $.__views.shedModeDamagesTypeInfillElementsWindow.add($.__views.scrollViewDamagesTypeInfillElements);
    var __alloyId34 = [];
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector = Ti.UI.createLabel({
        text: L("generic_shear_failure_of_connector_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowShearFailureOfConnector);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar = Ti.UI.createLabel({
        text: L("generic_chipped_or_disconnected_profiles_on_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowChippedOrDisconnectedProfilesOnThePillar);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShelfBreak = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowShelfBreak"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShelfBreak);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowShelfBreak = Ti.UI.createLabel({
        text: L("generic_shelf_break_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowShelfBreak"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowShelfBreak.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowShelfBreak);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar = Ti.UI.createLabel({
        text: L("generic_collapse_due_to_rollover_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowCollapseDueToRolloverOfThePillar);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar = Ti.UI.createLabel({
        text: L("generic_plastic_hinge_on_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowPlasticHingeOnThePillar);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_roof_elements_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheRoofElements);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfThePillar);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_orthogonal_panels_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowHammeringOfTheOrthogonalPanels);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift"
    });
    __alloyId34.push($.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift);
    $.__views.lblShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift = Ti.UI.createLabel({
        text: L("generic_horizontal_pillar_beam_shift_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift"
    });
    $.__views.tableViewShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift.add($.__views.lblShedModeFormsDamagesTypeInfillElementsRowHorizontalPillarBeamShift);
    $.__views.tableViewShedModeFormsDamagesTypeInfillElements = Ti.UI.createTableView({
        top: 0,
        backgroundColor: "#ffffff",
        height: 450,
        width: Ti.UI.FILL,
        data: __alloyId34,
        id: "tableViewShedModeFormsDamagesTypeInfillElements"
    });
    $.__views.scrollViewDamagesTypeInfillElements.add($.__views.tableViewShedModeFormsDamagesTypeInfillElements);
    OnTableViewShedModeFormsDamagesTypeInfillElements_Click ? $.__views.tableViewShedModeFormsDamagesTypeInfillElements.addEventListener("click", OnTableViewShedModeFormsDamagesTypeInfillElements_Click) : __defers["$.__views.tableViewShedModeFormsDamagesTypeInfillElements!click!OnTableViewShedModeFormsDamagesTypeInfillElements_Click"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.shedModeDamagesTypeInfillElementsWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewShedModeFormsDamagesTypeInfillElements!click!OnTableViewShedModeFormsDamagesTypeInfillElements_Click"] && $.__views.tableViewShedModeFormsDamagesTypeInfillElements.addEventListener("click", OnTableViewShedModeFormsDamagesTypeInfillElements_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;