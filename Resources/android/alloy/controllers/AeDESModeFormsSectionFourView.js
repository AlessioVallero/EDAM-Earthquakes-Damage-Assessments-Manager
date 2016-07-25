function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function OnTableViewAeDESModeFormsSectionFourType_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionFourDamages", {
                type_id: e.index,
                father_title: e.row.children[0].text,
                is_synchronized: current_is_synchronized
            });
        } catch (exception) {
            Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
        }
    }
    function OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click(e) {
        try {
            Alloy.Globals.createAndOpenControllerExt("AeDESModeFormsSectionFourMeasuresOfEmergency", {
                measures_of_emergency_id: e.index,
                father_title: e.row.children[0].text,
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
    this.__controllerPath = "AeDESModeFormsSectionFourView";
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
    $.__views.aedesModeSectionFourWindow = Ti.UI.createWindow({
        title: L("aedes_mode_section_four_view_title"),
        backgroundColor: "#ffffcc",
        id: "aedesModeSectionFourWindow"
    });
    $.__views.aedesModeSectionFourWindow && $.addTopLevelView($.__views.aedesModeSectionFourWindow);
    $.__views.scrollViewSectionFour = Ti.UI.createScrollView({
        top: 10,
        scrollType: "vertical",
        id: "scrollViewSectionFour"
    });
    $.__views.aedesModeSectionFourWindow.add($.__views.scrollViewSectionFour);
    $.__views.lblAeDESModeFormsSectionFourType = Ti.UI.createLabel({
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
        id: "lblAeDESModeFormsSectionFourType"
    });
    $.__views.scrollViewSectionFour.add($.__views.lblAeDESModeFormsSectionFourType);
    var __alloyId20 = [];
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowVerticalStructures = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowVerticalStructures"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowVerticalStructures);
    $.__views.lblAeDESModeFormsSectionFourTypeRowVerticalStructures = Ti.UI.createLabel({
        text: L("generic_vertical_structures_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowVerticalStructures"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowVerticalStructures.add($.__views.lblAeDESModeFormsSectionFourTypeRowVerticalStructures);
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowAttics = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowAttics"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowAttics);
    $.__views.lblAeDESModeFormsSectionFourTypeRowAttics = Ti.UI.createLabel({
        text: L("generic_attics_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowAttics"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowAttics.add($.__views.lblAeDESModeFormsSectionFourTypeRowAttics);
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowStairs = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowStairs"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowStairs);
    $.__views.lblAeDESModeFormsSectionFourTypeRowStairs = Ti.UI.createLabel({
        text: L("generic_stairs_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowStairs"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowStairs.add($.__views.lblAeDESModeFormsSectionFourTypeRowStairs);
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowCoverage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowCoverage"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowCoverage);
    $.__views.lblAeDESModeFormsSectionFourTypeRowCoverage = Ti.UI.createLabel({
        text: L("generic_coverage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowCoverage"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowCoverage.add($.__views.lblAeDESModeFormsSectionFourTypeRowCoverage);
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowInfillPartitions = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowInfillPartitions"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowInfillPartitions);
    $.__views.lblAeDESModeFormsSectionFourTypeRowInfillPartitions = Ti.UI.createLabel({
        text: L("generic_infill_partitions_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowInfillPartitions"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowInfillPartitions.add($.__views.lblAeDESModeFormsSectionFourTypeRowInfillPartitions);
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowPreExistingDamage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourTypeRowPreExistingDamage"
    });
    __alloyId20.push($.__views.tableViewAeDESModeFormsSectionFourTypeRowPreExistingDamage);
    $.__views.lblAeDESModeFormsSectionFourTypeRowPreExistingDamage = Ti.UI.createLabel({
        text: L("generic_pre_existing_damage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourTypeRowPreExistingDamage"
    });
    $.__views.tableViewAeDESModeFormsSectionFourTypeRowPreExistingDamage.add($.__views.lblAeDESModeFormsSectionFourTypeRowPreExistingDamage);
    $.__views.tableViewAeDESModeFormsSectionFourType = Ti.UI.createTableView({
        top: 30,
        backgroundColor: "#ffffff",
        height: 300,
        width: Ti.UI.FILL,
        data: __alloyId20,
        id: "tableViewAeDESModeFormsSectionFourType"
    });
    $.__views.scrollViewSectionFour.add($.__views.tableViewAeDESModeFormsSectionFourType);
    OnTableViewAeDESModeFormsSectionFourType_Click ? $.__views.tableViewAeDESModeFormsSectionFourType.addEventListener("click", OnTableViewAeDESModeFormsSectionFourType_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionFourType!click!OnTableViewAeDESModeFormsSectionFourType_Click"] = true;
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergency = Ti.UI.createLabel({
        text: L("generic_measures_of_emergency_text_msg"),
        top: 350,
        width: 290,
        height: 18,
        font: {
            fontFamily: "Arial",
            fontWeight: "bold",
            fontSize: "12"
        },
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergency"
    });
    $.__views.scrollViewSectionFour.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergency);
    var __alloyId21 = [];
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures"
    });
    __alloyId21.push($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures = Ti.UI.createLabel({
        text: L("generic_vertical_structures_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures"
    });
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowVerticalStructures);
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics"
    });
    __alloyId21.push($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics = Ti.UI.createLabel({
        text: L("generic_attics_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics"
    });
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowAttics);
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs"
    });
    __alloyId21.push($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs = Ti.UI.createLabel({
        text: L("generic_stairs_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs"
    });
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowStairs);
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage"
    });
    __alloyId21.push($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage = Ti.UI.createLabel({
        text: L("generic_coverage_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage"
    });
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowCoverage);
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions = Ti.UI.createTableViewRow({
        hasChild: true,
        className: "section_row",
        color: "#000",
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions"
    });
    __alloyId21.push($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions);
    $.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions = Ti.UI.createLabel({
        text: L("generic_infill_partitions_text_msg"),
        height: 50,
        color: "#000",
        id: "lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions"
    });
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions.add($.__views.lblAeDESModeFormsSectionFourMeasuresOfEmergencyRowInfillPartitions);
    $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency = Ti.UI.createTableView({
        top: 380,
        backgroundColor: "#ffffff",
        height: 250,
        width: Ti.UI.FILL,
        data: __alloyId21,
        id: "tableViewAeDESModeFormsSectionFourMeasuresOfEmergency"
    });
    $.__views.scrollViewSectionFour.add($.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency);
    OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click ? $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency.addEventListener("click", OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click) : __defers["$.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency!click!OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click"] = true;
    $.__views.viewAppButtonSave = Ti.UI.createView({
        top: 640,
        width: 60,
        height: 80,
        id: "viewAppButtonSave"
    });
    $.__views.scrollViewSectionFour.add($.__views.viewAppButtonSave);
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
        $.aedesModeSectionFourWindow.open();
    } catch (exception) {
        Alloy.Globals.AlertUserAndLogAsync(L("generic_exception_msg") + exception.message);
    }
    __defers["$.__views.tableViewAeDESModeFormsSectionFourType!click!OnTableViewAeDESModeFormsSectionFourType_Click"] && $.__views.tableViewAeDESModeFormsSectionFourType.addEventListener("click", OnTableViewAeDESModeFormsSectionFourType_Click);
    __defers["$.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency!click!OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click"] && $.__views.tableViewAeDESModeFormsSectionFourMeasuresOfEmergency.addEventListener("click", OnTableViewAeDESModeFormsSectionFourMeasuresOfEmergency_Click);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;