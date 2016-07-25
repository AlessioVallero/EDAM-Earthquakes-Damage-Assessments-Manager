function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnBtnBack_Click() {
        try {
            $.navigationWindowDamagesMeasuresOfEmergencyInfillElements.close();
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesMeasuresOfEmergencyInfillElementsDetails", {
                infill_elements_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesMeasuresOfEmergencyInfillElements";
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
    var __defers = {};
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_measures_of_emergency_infill_elements_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesMeasuresOfEmergencyInfillElementsWindow"
    });
    $.__views.btn_ios_back = Ti.UI.createButton({
        title: L("generic_back_btn_title"),
        id: "btn_ios_back"
    });
    OnBtnBack_Click ? $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click) : __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] = true;
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsWindow.leftNavButton = $.__views.btn_ios_back;
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElements = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamagesMeasuresOfEmergencyInfillElements"
    });
    $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsWindow.add($.__views.scrollViewDamagesMeasuresOfEmergencyInfillElements);
    var __alloyId142 = [];
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector = Ti.UI.createLabel({
        text: L("generic_shear_failure_of_connector_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShearFailureOfConnector);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar = Ti.UI.createLabel({
        text: L("generic_chipped_or_disconnected_profiles_on_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowChippedOrDisconnectedProfilesOnThePillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak = Ti.UI.createLabel({
        text: L("generic_shelf_break_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowShelfBreak);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar = Ti.UI.createLabel({
        text: L("generic_collapse_due_to_rollover_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowCollapseDueToRolloverOfThePillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar = Ti.UI.createLabel({
        text: L("generic_plastic_hinge_on_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowPlasticHingeOnThePillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_roof_elements_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheRoofElements);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_pillar_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfThePillar);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels = Ti.UI.createLabel({
        text: L("generic_hammering_of_the_orthogonal_panels_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHammeringOfTheOrthogonalPanels);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift"
    });
    __alloyId142.push($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift);
    $.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift = Ti.UI.createLabel({
        text: L("generic_horizontal_pillar_beam_shift_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift"
    });
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift.add($.__views.lblShedModeFormsMeasuresOfEmergencyInfillElementsRowHorizontalPillarBeamShift);
    $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements = Ti.UI.createTableView({
        top: 10,
        backgroundColor: "#ffffff",
        height: 450,
        width: Ti.UI.FILL,
        data: __alloyId142,
        id: "tableViewShedModeFormsMeasuresOfEmergencyInfillElements"
    });
    $.__views.scrollViewDamagesMeasuresOfEmergencyInfillElements.add($.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements);
    OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click ? $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements.addEventListener("click", OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click) : __defers["$.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements!click!OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click"] = true;
    $.__views.navigationWindowDamagesMeasuresOfEmergencyInfillElements = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.shedModeDamagesMeasuresOfEmergencyInfillElementsWindow,
        id: "navigationWindowDamagesMeasuresOfEmergencyInfillElements"
    });
    $.__views.navigationWindowDamagesMeasuresOfEmergencyInfillElements && $.addTopLevelView($.__views.navigationWindowDamagesMeasuresOfEmergencyInfillElements);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var current_is_synchronized = args.is_synchronized;
    var view_enabled = true;
    "undefined" != typeof current_is_synchronized && (view_enabled = "0" == current_is_synchronized);
    try {
        $.navigationWindowDamagesMeasuresOfEmergencyInfillElements.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.btn_ios_back!click!OnBtnBack_Click"] && $.__views.btn_ios_back.addEventListener("click", OnBtnBack_Click);
    __defers["$.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements!click!OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click"] && $.__views.tableViewShedModeFormsMeasuresOfEmergencyInfillElements.addEventListener("click", OnTableViewShedModeFormsMeasuresOfEmergencyInfillElements_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;