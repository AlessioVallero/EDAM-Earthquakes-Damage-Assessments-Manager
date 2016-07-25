function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewShedModeFormsDamagesType_Click(e) {
        try {
            0 == e.index ? Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesTypeStructuralElements", {
                is_synchronized: current_is_synchronized
            }) : Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesTypeInfillElements", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click(e) {
        try {
            0 == e.index ? Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesMeasuresOfEmergencyStructuralElements", {
                is_synchronized: current_is_synchronized
            }) : 1 == e.index ? Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesMeasuresOfEmergencyInfillElements", {
                is_synchronized: current_is_synchronized
            }) : Alloy.Globals.createAndOpenControllerExt("ShedModeFormsDamagesMeasuresOfEmergencyDamagedOrDeficientVerticalStructureElements", {
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnBtnSave_Click() {
        Ti.App.fireEvent("form:save_from_section");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "ShedModeFormsDamagesView";
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
    $.__views.shedModeDamagesWindow = Ti.UI.createWindow({
        title: L("shed_mode_damages_view_title"),
        backgroundColor: "#ffffcc",
        id: "shedModeDamagesWindow"
    });
    $.__views.shedModeDamagesWindow && $.addTopLevelView($.__views.shedModeDamagesWindow);
    $.__views.scrollViewDamages = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewDamages"
    });
    $.__views.shedModeDamagesWindow.add($.__views.scrollViewDamages);
    $.__views.lblShedModeFormsDamagesType = Ti.UI.createLabel({
        text: L("generic_type_text_msg"),
        top: 0,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblShedModeFormsDamagesType"
    });
    $.__views.scrollViewDamages.add($.__views.lblShedModeFormsDamagesType);
    var __alloyId72 = [];
    $.__views.tableViewShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements"
    });
    __alloyId72.push($.__views.tableViewShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements);
    $.__views.lblShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements = Ti.UI.createLabel({
        text: L("generic_loss_of_support_and_damages_to_the_connections_between_the_structural_elements_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements"
    });
    $.__views.tableViewShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements.add($.__views.lblShedModeFormsDamagesTypeRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements);
    $.__views.tableViewShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill"
    });
    __alloyId72.push($.__views.tableViewShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill);
    $.__views.lblShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill = Ti.UI.createLabel({
        text: L("generic_collapse_of_elements_of_the_infill_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill"
    });
    $.__views.tableViewShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill.add($.__views.lblShedModeFormsDamagesTypeRowCollapseOfElementsOfTheInfill);
    $.__views.tableViewShedModeFormsDamagesType = Ti.UI.createTableView({
        top: 30,
        backgroundColor: "#ffffff",
        height: 100,
        width: Ti.UI.FILL,
        data: __alloyId72,
        id: "tableViewShedModeFormsDamagesType"
    });
    $.__views.scrollViewDamages.add($.__views.tableViewShedModeFormsDamagesType);
    OnTableViewShedModeFormsDamagesType_Click ? $.__views.tableViewShedModeFormsDamagesType.addEventListener("click", OnTableViewShedModeFormsDamagesType_Click) : __defers["$.__views.tableViewShedModeFormsDamagesType!click!OnTableViewShedModeFormsDamagesType_Click"] = true;
    $.__views.lblShedModeFormsDamagesMeasuresOfEmergency = Ti.UI.createLabel({
        text: L("generic_measures_of_emergency_text_msg"),
        top: 150,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblShedModeFormsDamagesMeasuresOfEmergency"
    });
    $.__views.scrollViewDamages.add($.__views.lblShedModeFormsDamagesMeasuresOfEmergency);
    var __alloyId73 = [];
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements"
    });
    __alloyId73.push($.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements);
    $.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements = Ti.UI.createLabel({
        text: L("generic_loss_of_support_and_damages_to_the_connections_between_the_structural_elements_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements"
    });
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements.add($.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowLossOfSupportAndDamagesToTheConnectionsBetweenTheStructuralElements);
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill"
    });
    __alloyId73.push($.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill);
    $.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill = Ti.UI.createLabel({
        text: L("generic_collapse_of_elements_of_the_infill_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill"
    });
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill.add($.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowCollapseOfElementsOfTheInfill);
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements"
    });
    __alloyId73.push($.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements);
    $.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements = Ti.UI.createLabel({
        text: L("generic_damaged_or_deficient_vertical_structure_elements_text_msg"),
        height: 50,
        color: "#000",
        id: "lblShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements"
    });
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements.add($.__views.lblShedModeFormsDamagesMeasuresOfEmergencyRowDamagedOrDeficientVerticalStructureElements);
    $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency = Ti.UI.createTableView({
        top: 180,
        backgroundColor: "#ffffff",
        height: 150,
        width: Ti.UI.FILL,
        data: __alloyId73,
        id: "tableViewShedModeFormsDamagesMeasuresOfEmergency"
    });
    $.__views.scrollViewDamages.add($.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency);
    OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click ? $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency.addEventListener("click", OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click) : __defers["$.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency!click!OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 340,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewDamages.add($.__views.viewAppButtonSave);
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
        $.widgetAppButtonSave.init("/images/save_normal.png", "/images/save_pressed.png", "/images/save_disabled.png", L("generic_save_btn_title"), OnBtnSave_Click);
        $.viewAppButtonSave.visible = view_enabled;
        $.shedModeDamagesWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewShedModeFormsDamagesType!click!OnTableViewShedModeFormsDamagesType_Click"] && $.__views.tableViewShedModeFormsDamagesType.addEventListener("click", OnTableViewShedModeFormsDamagesType_Click);
    __defers["$.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency!click!OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click"] && $.__views.tableViewShedModeFormsDamagesMeasuresOfEmergency.addEventListener("click", OnTableViewShedModeFormsDamagesMeasuresOfEmergency_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;